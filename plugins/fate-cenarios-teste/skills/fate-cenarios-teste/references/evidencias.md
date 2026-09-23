# Pastas de evidência e links na Task de Validação

Depois de preencher os Test Cases, a skill cria a estrutura de pastas onde o QA vai guardar as
evidências, gera o link de cada uma e monta a descrição da Task de Validação com esses links.

Como a parte anterior, isto **só acontece com autorização explícita** — é escrita, e sai do
Azure DevOps para o SharePoint.

## Onde as pastas moram

| | |
|---|---|
| Site | `fagron.sharepoint.com/sites/squadlastjedi` |
| Drive | `Documents` |
| Caminho | `QA 🧪/Evidencias de Teste 📷/<pasta do mês>` |
| Pasta do mês | o **nível de mês** da iteração da US |
| Pasta da US | `US-<id da US>` |
| Pasta do caso | `CT-<id do Test Case>`, dentro da pasta da US |

A pasta do mês é o **penúltimo** nível da iteração, não o da sprint. A US 239742, com iteração
`...\Versão Setembro-2026\Versão Setembro-2026 - S4`, vai para a pasta `Versão Setembro-2026`.
Se a pasta do mês não existir, **pare e pergunte** — não crie nível de mês por conta própria.

O mesmo caminho aparece sincronizado na máquina do usuário como
`OneDrive - Fagron\Squad The Last Jedi - QA 🧪\Evidencias de Teste 📷\<mês>`. Criar pela API é
melhor que criar na pasta local: a API confirma na hora e devolve o link, sem depender de
sincronização.

## Autenticação

O mesmo `az login` que atende o Azure DevOps serve aqui — só muda o recurso:

```
az account get-access-token --resource https://graph.microsoft.com
```

Nunca imprima o token, nem o passe em linha de comando: obtenha-o dentro do processo.

## Como criar

Para cada pasta, `POST /drives/{driveId}/items/{idPai}/children` com
`{ "name": "...", "folder": {}, "@microsoft.graph.conflictBehavior": "fail" }`.

**Seja idempotente:** liste os filhos antes e só crie o que faltar. Rodar duas vezes não pode
duplicar nem apagar nada.

Para o link, `POST /drives/{driveId}/items/{id}/createLink` com
`{ "type": "view", "scope": "organization" }`. Devolve `link.webUrl`, no formato
`https://fagron.sharepoint.com/:f:/s/squadlastjedi/Ig...`.

`view` e `organization` são a escolha conservadora: quem é da Fagron abre, ninguém de fora
abre, e ninguém altera o conteúdo pelo link. Se o time quiser outro escopo, é decisão deles.

## A descrição da Task de Validação

Formato real, extraído da Task 242949:

```
Cenário:

[Modulo] Funcionalidade: descrição do primeiro cenário
Evidência:
[CT-243420](https://fagron.sharepoint.com/:f:/s/squadlastjedi/Ig...)

[Modulo] Funcionalidade: descrição do segundo cenário
Evidência:
[CT-243416](https://fagron.sharepoint.com/:f:/s/squadlastjedi/Ig...)
```

Regras:

- `Cenário:` aparece **uma vez**, no topo, seguido de uma linha em branco.
- Para cada Test Case: o **título exato**, a linha `Evidência:`, e o link em markdown
  `[CT-<id>](<url>)`. Uma linha em branco entre blocos.
- O texto do link é sempre `CT-<id do Test Case>` — não o nome da pasta nem o título.
- A ordem segue a ordem dos Test Cases na suíte.
- Esta descrição substitui o template antigo, que tinha um bloco `Evidência:` único com
  placeholder no fim.

O campo é markdown: grave com `format: "Markdown"`.

## Limites

- Não crie a pasta do mês, nem pastas fora de `Evidencias de Teste 📷`.
- Não apague nem renomeie pasta nenhuma, nem mova conteúdo.
- Não toque em pasta de outra US.
- Se a US não tiver Task de Validação, **pergunte** antes de criar uma — criar work item é
  escrita nova e precisa de autorização própria.
- Se algum link falhar, diga quais pastas ficaram sem link em vez de entregar a descrição
  incompleta sem avisar.
