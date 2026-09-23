# Como o cenário vira a grade do Test Plans

O Azure Test Plans guarda o cenário em duas colunas: *Step Action* e *Step Expected Result*.

**A regra de ouro: a grade é o cenário BDD transcrito literalmente.** Não reescreva os passos
como ações imperativas, não remova os conectores, não tire os acentos. Cada linha do cenário
vira uma linha da grade, com o mesmo texto.

## O mapeamento

| Linha do cenário | Coluna | Observação |
|---|---|---|
| `[Modulo] Funcionalidade: ...` | campo **Title** | não é linha da grade |
| `Pré-requisitos:` e todos os itens | Step Action | **uma única célula, multilinha**, incluindo o rótulo e os itens com `- ` e `;` |
| `Contexto: O usuário ...` | Step Action | uma linha, com o rótulo `Contexto:` escrito |
| `DADO que o usuário ...` | Step Action | mantém a palavra `DADO` |
| `E ...` *(antes do QUANDO)* | Step Action | uma linha cada, mantendo o `E` |
| `QUANDO ...` | Step Action | mantém a palavra `QUANDO` |
| `ENTÃO o sistema deve ...` | **Step Expected Result** | na **mesma linha** do `QUANDO`, mantendo a palavra `ENTÃO` |
| `E deve ...` *(depois do ENTÃO)* | Step Expected Result | linha com ação vazia |

Só as linhas de `QUANDO` têm resultado esperado. Pré-requisitos, Contexto, `DADO` e os `E` de
preparação ficam com a coluna da direita **vazia**.

## Exemplo real — Test Case 244043

Step Action, linha 1 (uma célula só, com as quebras de linha):

```
Pré-requisitos:
- Possuir acesso irrestrito à rotina de Usuários;
- Possuir usuários cadastrados antes da atualização da versão;
- Possuir a versão com a nova permissão aplicada sobre a base existente;
```

Demais linhas:

| Step Action | Step Expected Result |
|---|---|
| `Contexto: O usuário administrador confere a situação da nova permissão nos usuários que já existiam antes da atualização.` | *(vazio)* |
| `DADO que o usuário acesse Arquivos > Usuários após a atualização da versão` | *(vazio)* |
| `E consulte um usuário cadastrado antes da atualização` | *(vazio)* |
| `QUANDO exibir as permissões em Integração > Pesagem Monitorada > Especiais` | `ENTÃO o sistema deve apresentar a permissão Balanças: Configurações como autorizada` |

## Como entregar

Colar o cenário inteiro de uma vez **não funciona**: cada quebra de linha vira uma linha nova
da grade, o que espatifa os pré-requisitos em várias linhas e joga o `ENTÃO` para a coluna
errada. Foi exatamente o que aconteceu no Test Case 244044 na primeira tentativa.

Por isso, entregue cada Test Case em **três partes separadas e rotuladas**, para o usuário
saber onde cada pedaço vai:

```
244044  [Integração Balança Eletrônica] Relação das Balanças: Ocultar o botão Configurações sem a permissão

  (1) PRIMEIRA CÉLULA de Step Action — cole tudo isto em UMA célula só:

Pré-requisitos:
- Possuir acesso irrestrito à rotina de Pesagem Monitorada;
- Possuir um usuário com a permissão Balanças: Configurações desabilitada;
- Possuir uma balança cadastrada no sistema;

  (2) DEMAIS CÉLULAS de Step Action — uma célula por linha:

Contexto: O usuário acessa a relação de balanças da Pesagem Monitorada sem a permissão de configuração.
DADO que o usuário acesse o sistema sem a permissão Balanças: Configurações
E acesse Integração > Pesagem monitorada
QUANDO clicar na opção Balanças

  (3) STEP EXPECTED RESULT — só na linha do QUANDO:

ENTÃO o sistema deve ocultar o botão Configurações na relação de balanças
```

Diga ao usuário, uma vez por entrega:

- na parte (1), as quebras de linha dentro da célula se fazem com **Shift+Enter**;
- a parte (3) vai na **coluna da direita**, clicando na célula ao lado do `QUANDO` — não é
  uma linha nova de ação.

Ou seja: **não invente um segundo formato**. O conteúdo é o cenário BDD; o que muda é só a
sinalização de onde cada pedaço entra.

Erros que já custaram retrabalho e não devem se repetir:

- Reescrever `DADO que o usuário acesse Arquivos > Usuários` como `Acessar Arquivos > Usuários`.
  A casa mantém o conector.
- Remover acentuação. A grade é preenchida com acento normal.
- Achatar os pré-requisitos numa linha só separada por ponto e vírgula. Eles são multilinha,
  com `- ` no começo de cada item e `;` no fim.
- Inventar resultado esperado para linhas de `DADO` e `E`. Elas ficam vazias.
- Deixar o `Contexto:` de fora da grade. Ele entra como linha de ação.

## Quando os Test Cases já existem no board

Situação comum: o QA já criou os Test Cases com título e deixou os passos vazios. Nesse caso:

1. Leia a suíte pelo MCP (`testplan` com `list_cases`) e pegue **ID e título reais**.
2. Use **os títulos que já estão lá**, sem reescrever — eles são a decisão do QA.
3. Entregue só os passos, cada bloco identificado pelo ID do Test Case.

Se algum Test Case da suíte já estiver preenchido, **leia-o antes de escrever os outros**: ele
mostra o padrão de escrita em uso naquela suíte, e vale mais que qualquer regra geral.

## O que isso não é

Esta grade é para **preenchimento manual**. Esta skill não escreve no Azure DevOps — não use as
ferramentas de escrita do MCP para preencher os passos sem pedir confirmação explícita.
