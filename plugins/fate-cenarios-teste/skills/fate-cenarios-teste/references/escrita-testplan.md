# Escrever os cenários no Test Plans

Esta é a **única parte da skill que escreve no Azure DevOps**. Tudo aqui depende de
autorização explícita do usuário, pedida no momento, para aquela US. Autorização de uma US
não vale para a próxima.

## O fluxo, na ordem

1. O usuário manda o número da US.
2. Você entrega o plano de teste com os cenários, como sempre (ficha, cenários, Task de
   Validação, como testar, lacunas).
3. Você **pergunta** se pode escrever no Test Plans ou se os cenários precisam de ajuste.
4. Se precisar de ajuste, o usuário manda as correções e você refaz.
5. Você **pergunta de novo**, agora sobre a versão corrigida.
6. O usuário autoriza.
7. Você cria a suíte e escreve os Test Cases.
8. **Sempre confirme em qual plano a suíte entra** — o da iteração da US — antes de criar.

Nunca pule do passo 2 para o 7. Nunca escreva sem uma autorização que veio **depois** da
versão final dos cenários.

## Antes de escrever

**Descubra o plano certo.** A US tem um `System.IterationPath`. Liste os planos
(`testplan` com `list_plans`, `filterActivePlans: false`) e ache aquele cujo campo `iteration`
**bate exatamente** com o da US. Mostre o nome do plano ao usuário e confirme — não escolha
sozinho. Se não houver plano para a iteração, pare e pergunte; não crie plano por conta própria.

O projeto tem três níveis de plano, e só um deles é o destino:

| Nível | Exemplo | Iteração | Serve para |
|---|---|---|---|
| Master | `MasterPlan (Fórmula Certa)` | `...\Squad The Last Jedi` | acervo de regressão — **não** é destino de US |
| Release mensal | `Setembro/2026: Release 250` | `...\Versão Setembro-2026` | fechamento da release |
| **Sprint** | `Squad The Last Jedi_Stories_Versão Setembro-2026 - S4` | `...\Versão Setembro-2026\Versão Setembro-2026 - S4` | **é aqui que a suíte da US entra** |

A US 239742, com iteração `...\Versão Setembro-2026\Versão Setembro-2026 - S4`, teve sua suíte
criada no plano de sprint 244040. Esse é o padrão: **o plano cuja iteração é idêntica à da US**.

**O MasterPlan é a sua fonte de exemplos.** Quando precisar conferir o padrão de escrita —
como o QA nomeia funcionalidades, como redige um `ENTÃO`, quanto detalha um passo — leia
Test Cases de lá, que é onde está o acervo consolidado. Ler é sempre seguro; escrever nele,
nunca, a menos que o usuário peça explicitamente.

**Veja se a suíte já existe.** `testplan` com `list_suites`. Se já houver suíte para esta US,
não crie outra: pergunte se é para usar a existente.

**Se algum Test Case da suíte já estiver preenchido, leia-o antes** (`wit_work_item` com
`fields: ["Microsoft.VSTS.TCM.Steps"]`). Ele mostra o padrão de escrita em uso e vale mais que
qualquer regra geral desta página.

## Como criar

**A suíte** — `testplan_test_suite_write`, ação `create`:

- `planId`: o plano confirmado com o usuário.
- `parentSuiteId`: a suíte raiz do plano.
- `name`: `<id da US> : <título da US>`, exatamente. Exemplo observado:
  `239742 : [Pharmapele] - Permissão de usuário para configuração de balanças`.

### Campos do Test Case

| Campo | Valor |
|---|---|
| `System.AreaPath` | o mesmo Area Path da US |
| `System.IterationPath` | **o nível de MÊS** da iteração da US, não o da sprint |
| `Microsoft.VSTS.Common.Priority` | `2` |
| `System.State` | `Design` (padrão ao criar) |

A iteração é o ponto que mais se erra. A US 242103 está em
`...\Versão Setembro-2026\Versão Setembro-2026 - S4`, mas o Test Case vai em
`...\Versão Setembro-2026` — **corte o último nível**. Modelo real: Test Case 244247.

É a mesma regra da pasta de evidência: o Test Case e a evidência vivem no mês, porque
atravessam a release; só a **suíte** mora no plano da sprint. Não confunda os dois.

**Cada Test Case** — dois passos, nesta ordem:

1. `testplan_test_case_write`, ação `create`, com `project`, `title` e `testsWorkItemId`
   (o id da US, que cria o vínculo Tested By). **Não passe `steps` aqui** — o formato que
   essa ação aceita (`1. ação|resultado`) não expressa célula multilinha nem distingue passo
   de validação.
2. `wit_work_item_write`, ação `update`, gravando o XML dos passos em
   `/fields/Microsoft.VSTS.TCM.Steps` (ver abaixo).

Depois, `testplan_test_suite_write` com `add_test_cases` para pendurar os casos na suíte.

## O XML dos passos

Formato real, extraído do Test Case 244043 preenchido pelo QA:

```xml
<steps id="0" last="6"><step id="2" type="ActionStep"><parameterizedString isformatted="true">Pré-requisitos:
- Possuir acesso irrestrito à rotina de Usuários;
- Possuir usuários cadastrados antes da atualização da versão;</parameterizedString><parameterizedString isformatted="true" /><description /></step><step id="3" type="ActionStep"><parameterizedString isformatted="true">Contexto: O usuário administrador confere a situação da nova permissão.</parameterizedString><parameterizedString isformatted="true" /><description /></step><step id="4" type="ValidateStep"><parameterizedString isformatted="true">QUANDO exibir as permissões em Integração &amp;gt; Pesagem Monitorada &amp;gt; Especiais</parameterizedString><parameterizedString isformatted="true">ENTÃO o sistema deve apresentar a permissão Balanças: Configurações como autorizada</parameterizedString><description /></step></steps>
```

As regras que esse exemplo estabelece:

| Detalhe | Regra |
|---|---|
| Ids | começam em **2** e incrementam de 1. `last` no elemento raiz = o maior id usado. |
| Passo sem resultado esperado | `type="ActionStep"`, segundo `parameterizedString` vazio e auto-fechado |
| Passo com resultado esperado | `type="ValidateStep"`, segundo `parameterizedString` com o texto do `ENTÃO` |
| Célula multilinha | **quebra de linha literal** dentro do `parameterizedString`. É assim que o bloco de pré-requisitos fica numa célula só. |
| `>` no texto | escreva `&amp;gt;` — o conteúdo é HTML dentro de XML, então escapa duas vezes |
| `<` no texto | `&amp;lt;` |
| `&` no texto | `&amp;amp;` |
| Acentuação | normal, sem escapar |

Mapeamento do cenário para os passos:

- Bloco de pré-requisitos inteiro → **um** `ActionStep`, com as quebras de linha.
- `Contexto:` → um `ActionStep`.
- `DADO` → um `ActionStep`. Cada `E` antes do `QUANDO` → um `ActionStep`.
- `QUANDO` → um `ValidateStep`, com o `ENTÃO` correspondente no segundo `parameterizedString`.

O título do Test Case é o título do cenário, **sem** o bloco de passos.

## Validado em produção

O procedimento desta página foi executado de verdade em 2026-09-23, na suíte 244042: nove
Test Cases gravados, conferidos no board. O que a execução ensinou, e que não estava óbvio:

- **A gravação é `update`, não `create`.** O QA costuma criar os Test Cases com título e
  deixar os passos vazios. Nesse caso você só preenche `Microsoft.VSTS.TCM.Steps`. Criar
  Test Case novo é o caso menos comum — confirme antes de criar.
- **`update_batch` grava os vários de uma vez**, mas a resposta traz o work item inteiro de
  cada um e **estoura o contexto**. Não confie na resposta: grave e depois **confira com uma
  leitura compacta**, pedindo só `System.Rev` e `Microsoft.VSTS.TCM.Steps` e contando os
  passos. É mais barato e prova o resultado.
- **Escrever no campo não mexe em mais nada**: título, estado, responsável, prioridade e o
  vínculo `Tests` com a US continuam como estavam. Confirmado nos nove.
- O editor do Azure deixa um resíduo `<div><br></div>` no fim do último resultado esperado
  quando o passo é digitado à mão. **Não reproduza isso** — é sujeira do editor, não conteúdo.

## Teste antes do lote

Na primeira vez que escrever numa suíte — ou sempre que mudar algo no formato — **grave um
Test Case só** e peça ao usuário para conferir na tela antes de seguir com o resto. Dez casos
errados custam dez correções manuais; um errado custa uma.

## Limites

- Não altere Test Case que você não criou nesta sessão sem o usuário pedir explicitamente.
- Não apague nada. Não mexa em suíte, plano ou caso de outra US.
- Não crie plano de teste.
- Se a gravação falhar no meio do lote, **pare** e diga exatamente quais casos entraram e
  quais não — nunca deixe o usuário adivinhando o estado do board.
