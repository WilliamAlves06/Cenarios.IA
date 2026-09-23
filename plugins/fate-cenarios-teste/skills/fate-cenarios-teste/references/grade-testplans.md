# Como o cenário vira a grade do Test Plans

O Azure Test Plans guarda o cenário em duas colunas: *Step Action* e *Step Expected Result*.
Escreva pensando nisso — é o que faz o cenário caber na ferramenta sem retrabalho.

| Linha do cenário | Vira |
|---|---|
| `[Modulo] Funcionalidade: ...` | o campo **Title**, não uma linha da grade |
| `Pré-requisitos:` mais todos os itens | a **primeira** linha de ação, com resultado esperado vazio |
| `Contexto: ...` | não vai para a grade — é contexto de leitura |
| `DADO ...` | uma linha de ação |
| `E ...` *(antes do QUANDO)* | uma linha de ação cada |
| `QUANDO ...` | uma linha de ação **mais** o `ENTÃO` seguinte na coluna da direita |
| `E deve ...` *(depois do ENTÃO)* | linha com ação vazia, texto só na coluna da direita |

A consequência prática: **`ENTÃO` nunca é uma linha de ação.** Ele é o resultado esperado do
`QUANDO` que vem antes dele. Escreva cada `QUANDO` de forma que exista um `ENTÃO` para parear.

## Entregue sempre a grade pronta para colar

Além do cenário em BDD, entregue **um bloco por Test Case**, com as duas colunas separadas por
**TAB**. É esse formato que cola direto na grade, via Excel.

Regras do bloco:

- Uma linha por passo. **Nada de quebra de linha dentro de uma célula** — quebra de linha
  destrói a colagem em bloco.
- A primeira linha é a dos pré-requisitos: vai inteira na coluna da esquerda, com os itens
  separados por ponto e vírgula, e a coluna da direita vazia (basta terminar a linha com TAB).
- Toda linha de ação tem um resultado esperado. Ação sem resultado deixa quem executa sem
  saber o que conferir.
- **Sem acentuação nas células** quando o destino for colagem via Excel: a codificação do
  recorte varia e acento vira caractere quebrado. O cenário em BDD mantém os acentos.
- Cada bloco começa com o **ID e o título** do Test Case, para o usuário achar onde colar.

Exemplo de um bloco (o espaço entre as colunas é um TAB):

```
244044  [Integracao Balanca Eletronica] Relacao das Balancas: Ocultar o botao Configuracoes sem a permissao

Pre-requisitos: Possuir acesso irrestrito a rotina de Pesagem Monitorada; Possuir um usuario com a permissao Balancas: Configuracoes desabilitada
Acessar o sistema com o usuario sem a permissao Balancas: Configuracoes	Sistema deve permitir o acesso
Acessar Integracao > Pesagem monitorada	Sistema deve apresentar a tela de Pesagem Monitorada
Clicar na opcao Balancas	Sistema deve apresentar a relacao de balancas sem o botao Configuracoes
```

## Como o usuário cola

1. Abre o arquivo no Excel (ou cola o bloco num Excel em branco) — as colunas se separam sozinhas.
2. No Test Case, aba **Define**, clica na primeira célula de *Step Action*.
3. Copia as duas colunas no Excel e cola na grade: o Azure distribui uma coluna para cada lado.

Se forem muitos Test Cases, entregue **um arquivo** com todos os blocos separados, em vez de
despejar tudo na conversa. Um bloco por Test Case, com o ID no cabeçalho.

## Quando os Test Cases já existem no board

Situação comum: o QA já criou os Test Cases com título e deixou os passos vazios. Nesse caso:

1. Leia a suíte pelo MCP (`testplan` com `list_cases`) e pegue **ID e título reais**.
2. Use **os títulos que já estão lá**, sem reescrever — eles são a decisão do QA.
3. Entregue só os passos, cada bloco identificado pelo ID do Test Case.

## O que isso não é

Esta grade é para **colagem manual**. Esta skill não escreve no Azure DevOps — não use as
ferramentas de escrita do MCP para preencher os passos sem pedir confirmação explícita.
