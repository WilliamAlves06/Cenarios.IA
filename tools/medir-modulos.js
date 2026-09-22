// Mede os rotulos [Modulo] realmente usados nos Test Cases do board.
// Somente leitura. O token e obtido do Azure CLI e nunca e impresso.
const { execFileSync } = require('child_process');

const ORG = 'fagrontech';
const PROJ = 'Formula Certa VCL';
const ADO_RESOURCE = '499b84ac-1321-427f-aa17-267ca6975798';

const token = execFileSync(
  'az', ['account', 'get-access-token', '--resource', ADO_RESOURCE, '--query', 'accessToken', '-o', 'tsv'],
  { encoding: 'utf8', shell: true }
).trim();
if (!token) throw new Error('sem token do Azure CLI');

const H = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };
const base = `https://dev.azure.com/${ORG}/${encodeURIComponent(PROJ)}/_apis`;

(async () => {
  const wiql = {
    query: `SELECT [System.Id] FROM WorkItems
            WHERE [System.TeamProject] = '${PROJ}'
              AND [System.WorkItemType] = 'Test Case'
              AND [System.CreatedDate] >= '2025-01-01T00:00:00Z'
            ORDER BY [System.Id] DESC`,
  };
  const r = await fetch(`${base}/wit/wiql?api-version=7.1`, {
    method: 'POST', headers: H, body: JSON.stringify(wiql),
  });
  if (!r.ok) throw new Error('WIQL falhou: ' + r.status);
  const ids = (await r.json()).workItems.map(w => w.id);
  console.log('Test Cases criados a partir de 2025: ' + ids.length);

  const titulos = [];
  for (let i = 0; i < ids.length; i += 200) {
    const lote = ids.slice(i, i + 200);
    const u = `${base}/wit/workitems?ids=${lote.join(',')}&fields=System.Title&api-version=7.1`;
    const rr = await fetch(u, { headers: H });
    if (!rr.ok) throw new Error('lote falhou: ' + rr.status);
    for (const w of (await rr.json()).value) {
      const t = w.fields && w.fields['System.Title'];
      if (t) titulos.push(t);
    }
    process.stderr.write(`  lidos ${titulos.length}/${ids.length}\r`);
  }
  process.stderr.write('\n');

  const cont = new Map();
  let semRotulo = 0;
  for (const t of titulos) {
    const m = t.match(/^\s*\[([^\]]{1,60})\]/);
    if (!m) { semRotulo++; continue; }
    const k = m[1].trim();
    cont.set(k, (cont.get(k) || 0) + 1);
  }

  const ord = [...cont.entries()].sort((a, b) => b[1] - a[1]);
  console.log('Titulos lidos          : ' + titulos.length);
  console.log('Com rotulo [Modulo]    : ' + (titulos.length - semRotulo));
  console.log('Sem rotulo             : ' + semRotulo);
  console.log('Rotulos distintos      : ' + ord.length);
  console.log('\n== ROTULOS COM 3+ OCORRENCIAS ==');
  for (const [k, n] of ord) if (n >= 3) console.log(String(n).padStart(5) + '  ' + k);
  console.log('\n== CAUDA (1-2 ocorrencias, nao confiaveis) ==');
  console.log(ord.filter(([, n]) => n < 3).map(([k]) => k).join(' | '));
})().catch(e => { console.error('ERRO: ' + e.message); process.exit(1); });
