# Como o cenário vira a grade do Test Plans

O Azure Test Plans guarda o cenário em duas colunas: *Step Action* e *Step Expected Result*. Escreva pensando nisso — é o que faz o cenário caber na ferramenta sem retrabalho.

| Linha do cenário | Vira |
|---|---|
| `[Modulo] Funcionalidade: ...` | o campo **Title**, não uma linha da grade |
| `Pré-requisitos:` mais todos os itens | **uma única** linha de ação, multilinha |
| `Contexto: ...` | uma linha de ação |
| `DADO ...` | uma linha de ação |
| `E ...` *(antes do QUANDO)* | uma linha de ação cada |
| `QUANDO ...` | uma linha de ação **mais** o `ENTÃO` seguinte na coluna da direita |
| `E deve ...` *(depois do ENTÃO)* | linha com ação vazia, texto só na coluna da direita |

A consequência prática: **`ENTÃO` nunca é uma linha de ação.** Ele é o resultado esperado do `QUANDO` que vem antes dele.

Escreva cada `QUANDO` de forma que exista um `ENTÃO` para parear com ele. Um `QUANDO` órfão vira uma linha de grade com resultado esperado vazio, e quem executa não sabe o que conferir.

## Quando o usuário pedir a grade pronta

Se o usuário pedir o cenário já no formato de duas colunas (para colar linha a linha), devolva assim, uma linha por passo, ação e resultado separados por barra vertical:

```
Pré-requisitos: ...|
Contexto: ...|
DADO que o usuário acesse ...|
E informe ...|
QUANDO clicar no botão Salvar|ENTÃO o sistema deve bloquear a inclusão e apresentar a mensagem de CPF duplicado
```

Esse é o mesmo formato que a ferramenta de escrita do MCP espera no campo de steps — mas **esta skill não escreve no Azure DevOps**. A grade é só para facilitar a colagem manual.
