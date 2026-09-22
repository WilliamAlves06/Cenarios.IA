// Gera o references/modulos.md da skill a partir de dados reais:
// - rotulos medidos nos Test Cases do board (2025+)
// - inventario de executaveis lido de C:\Fcerta
const fs = require('fs');

const exes = fs.readdirSync('C:\\Fcerta')
  .filter(f => /\.exe$/i.test(f))
  .map(f => f.replace(/\.exe$/i, ''))
  .filter(f => !/_old$|\.prod$|\.vshost$/i.test(f))
  .sort((a, b) => a.localeCompare(b, 'pt-BR'));

const colunas = (itens, larg = 34, cols = 3) => {
  const linhas = Math.ceil(itens.length / cols);
  const out = [];
  for (let i = 0; i < linhas; i++) {
    const linha = [];
    for (let c = 0; c < cols; c++) {
      const it = itens[i + c * linhas];
      if (it) linha.push(it.padEnd(larg));
    }
    out.push(linha.join('').trimEnd());
  }
  return out.join('\n');
};

const md = `# Módulos válidos

Escolha **um** para o colchete do título. Copie caractere por caractere, inclusive a caixa das letras.

## Lista canônica

Os 56 primeiros vêm do conjunto ouro de 1.293 cenários BDD. Os marcados com (+) foram
acrescentados em 2026-09-22, medidos em **1.940 Test Cases criados a partir de 2025**
(1.921 com rótulo, 117 rótulos distintos) — todos com 3 ou mais ocorrências.

\`\`\`
Receitas                         Moedas
mobyPharma                       Orçamentos Rejeitados
Caixa                            Backup
NFS-e                            Comissão de Vendedores
Livro de Psicotrópicos           Laboratorio
Fórmula Padrão                   SPED - Fiscal
Manutenção Fluxo de Caixa        FCDashboard
Produtos                         VCLSystemCheckout
Controle de Entregas             Atualização de Estoque de Entrada
Filiais                          Cotação
Notas                            Funcionários
Formulas                         Integração Balança Eletrônica
FBWizardMigra                    Nota Fiscal do Consumidor Eletrônica
Atualização de Estoque de Saída  Requisições
RedesSociaisService              Atualizar Estoque de Saída
FCServer                         Consistência de Caixa
Cartões de Crédito               FCResumoMovimento
Monitoramento de Pacientes       Ficha de Especificação Técnica
PCP                              InnoSetup
FCServerWizard                   Limpeza de Arquivo
Livro de Receituário             Listagem de Inventário
NFE                              Listagem de Pacientes
Clientes                         LogiPrix
Fcerta                           Parâmetros
Etiquetas                        Perdas
Sintegra                         Resumo do Movimento
Certificado de Analise           SNGPC
Gestão de Estoques               Sobre

(+) Convênio                     (+) Custo de Mercadoria Vendida
(+) Atualização de Estoque Mínimo (+) Fornecedores
(+) NF Devolução Compra          (+) Atualização de Curva ABC
(+) NF Devolução Venda           (+) Migrador Fcerta
(+) NF Convenio                  (+) NFC-e
(+) NF Perda (Descarte)          (+) Fluxo de Caixa
(+) Controle de vendas           (+) Transferência
\`\`\`

O \`(+)\` não faz parte do nome — é só a marca de quando entrou. Escreva \`Convênio\`, não \`(+) Convênio\`.

## Grafias que a casa escreve errado

Use sempre a forma da esquerda. As contagens são do levantamento de 2026-09-22.

| Correto | Não escreva |
|---|---|
| \`mobyPharma\` (68) | \`MobyPharma\` (41), \`Mobypharma\` (26), \`Mobypahrma\` (13), \`FCMobyPharma\` |
| \`Receitas\` (641) | \`Receita\` (4), \`FCReceitas\` |
| \`Livro de Receituário\` (51) | \`Livro de Receituários\` (7) |
| \`Parâmetros\` (37) | \`Parâmetro\` (26) |
| \`Notas\` (40) | \`notas\` (3) |
| \`Formulas\` (11) | \`Fórmulas\` (4) |
| \`Fcerta\` (16) | \`FCerta\` (7), \`FCERTA\` (3), \`FCserver\` |
| \`LogiPrix\` (12) | \`Logiprix\` (3) |
| \`Certificado de Analise\` | \`Certificado de Análise\` (4) |
| \`Laboratorio\` (5) | \`Laboratórios\` (8) |
| \`Fórmula Padrão\` (42) | \`Formula Padrão\` |
| \`Produtos\` (43) | \`Produto\`, \`Fcprodutos\` |
| \`NFE\` (12) | \`NF-e\`, \`Nota Fiscal Eletrônica\` |
| \`SPED - Fiscal\` (4) | \`SPED-Fiscal\` |
| \`Listagem de Inventário\` | \`Listagem de Inventario\` |
| \`Cartões de Crédito\` (22) | \`AdmCartao\` (3), \`FCAdmCartao\`, \`FCADM CARTAO\` |
| \`RedesSociaisService\` (21) | \`Redes Sociais\` (3), \`RedesSociais\` (4) |

\`Mobypahrma\` é erro de digitação de *mobyPharma* e aparece 13 vezes. Ficou fora da lista de propósito.

## Três conflitos que o time precisa decidir

Nestes casos a forma que o conjunto ouro registrou como certa **não** é a mais frequente
hoje. Mantive a forma do conjunto ouro, mas a divergência é real — vale levar ao time:

| Forma canônica (conjunto ouro) | Forma mais frequente hoje | Placar |
|---|---|---|
| \`Livro de Psicotrópicos\` | \`Livro de Psicotrópico\` | 22 x 29 |
| \`Controle de Entregas\` | \`Controle de entregas\` | 7 x 24 |
| \`Laboratorio\` | \`Laboratórios\` | 5 x 8 |

Enquanto não houver decisão, use a forma canônica e **não corrija** cenários antigos.

## Como escolher o módulo

Nesta ordem:

1. **Rótulo entre colchetes no título da própria US.** Cuidado: se for nome de cliente
   (\`[Pharmapele]\`, \`[Drogasil]\`) ou de projeto, **não é módulo** — siga para o passo 2.
2. **Area Path do work item.** O último segmento costuma nomear o módulo.
3. **Tela ou rotina citada na descrição.** "Saídas > Receitas > Clientes" indica \`Receitas\`.
4. **Campos ModuleFATE / SubmoduleFATE**, quando preenchidos. Confira contra esta lista:
   eles trazem nomes que nem sempre existem aqui.
5. **Test Cases já existentes da mesma área**, para copiar a grafia em uso.
6. **Pergunte ao usuário.** Melhor uma pergunta que um módulo inventado.

## Nunca

- **Nunca use nome de executável nem versão como módulo.** \`FCReceitas.exe\`,
  \`FCReceitas.exe - 6.0.1140\`, \`Firebird 4.0\` não são módulos. Quando a Regra de Negócio
  traz um campo "Módulo:", ele costuma registrar o executável — o módulo de verdade é \`Receitas\`.
- **Nunca invente sigla.**
- Se o módulo não estiver na lista e a US trouxer um rótulo próprio entre colchetes, use o
  rótulo da US e **avise o usuário** que ele não está no vocabulário conhecido.

## Apêndice — inventário de executáveis

Os ${exes.length} executáveis de uma instalação do Formula Certa, lidos em 2026-09-22.
Serve para **traduzir** o executável citado numa Regra de Negócio para o módulo de negócio —
nunca para virar rótulo de título.

Correspondências confirmadas em uso (o resto exige confirmação):

| Executável | Módulo |
|---|---|
| \`FCReceitas\` | Receitas |
| \`FCBalanca\` | Integração Balança Eletrônica (tela: Pesagem Monitorada) |
| \`FCPesoMedio\` | tela Peso Médio — sem módulo próprio na lista |
| \`FCConfEstoque\` | tela Conferência de Estoque — sem módulo próprio na lista |
| \`FCTransferencias\` | Transferência |
| \`FCUsuarios\` | tela Arquivos > Usuários — permissões entram como pré-requisito |
| \`FCCaixa\` | Caixa |
| \`FCProdutos\` | Produtos |
| \`FCClientes\` | Clientes |
| \`FCMobyPharma\` | mobyPharma |
| \`FCNFE\` / \`FCNFCE\` / \`FCNFSE\` | NFE / NFC-e / NFS-e |
| \`FC7LivroPsicotropico\` | Livro de Psicotrópicos |
| \`FC7LivroReceituario\` | Livro de Receituário |
| \`FC7OrcRejeitados\` | Orçamentos Rejeitados |
| \`FC4GestaoEst\` | Gestão de Estoques |
| \`FC4CVendedores\` | Comissão de Vendedores |
| \`FC4ListPacientes\` | Listagem de Pacientes |
| \`FC7Listinv\` | Listagem de Inventário |
| \`fcConsisteCaixa\` | Consistência de Caixa |
| \`fcFluxoCaixa\` | Fluxo de Caixa / Manutenção Fluxo de Caixa |

Inventário completo:

\`\`\`
${colunas(exes)}
\`\`\`

Um executável desta lista sem módulo correspondente **não** autoriza inventar um rótulo:
pergunte ao time qual módulo a casa usa para aquela tela.
`;

const destino = process.argv[2];
if (!destino) throw new Error('informe o caminho de destino');
fs.writeFileSync(destino, md, 'utf8');
console.log('gravado: ' + destino + ' (' + md.length + ' bytes, ' + exes.length + ' executáveis)');
