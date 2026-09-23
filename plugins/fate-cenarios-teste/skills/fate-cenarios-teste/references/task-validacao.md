# Task de Validação

É a task filha da User Story que agrupa os cenários validados e aponta onde estão as evidências.
Foi a task filha mais frequente das User Stories analisadas (55 ocorrências).

| Campo | Valor |
|---|---|
| Título | `Validação` — literal, sem variação |
| Activity | `Testing` |
| Vínculo | filha da User Story |

## Descrição

Um bloco por Test Case: o título, a linha `Evidência:` e o link da pasta.

```
Cenário:

[Modulo] Funcionalidade: descrição do primeiro cenário
Evidência:
[CT-244039](https://fagron.sharepoint.com/:f:/s/squadlastjedi/Ig...)

[Modulo] Funcionalidade: descrição do segundo cenário
Evidência:
[CT-244043](https://fagron.sharepoint.com/:f:/s/squadlastjedi/Ig...)
```

Enquanto as pastas não existirem, o lugar do link fica com o marcador
`Link com as evidencias do teste`, que é como o QA cria a task.

## Regras

**T1.** `Cenário:` aparece **uma vez**, no topo, seguido de linha em branco.

**T2.** Cada bloco tem três partes, nesta ordem: o **título exato** do Test Case, a linha
`Evidência:`, e o link. Uma linha em branco entre blocos.

**T3.** O texto do link é sempre `CT-<id do Test Case>` — não o nome da pasta, não o título.

**T4.** A ordem dos blocos segue a ordem dos Test Cases na suíte.

**T5.** Os títulos são copiados **exatamente** como estão nos Test Cases. Não reescreva, não
numere, não acrescente comentário.

**T6.** O campo é markdown: grave com `format: "Markdown"`.

**T7.** Quando a task já existir com os marcadores, **troque só os marcadores pelos links**.
Não reescreva a descrição inteira. O procedimento completo está em `references/evidencias.md`.

## Lista de conferência

- [ ] Título é exatamente `Validação`
- [ ] `Cenário:` aparece uma vez, no topo
- [ ] Cada bloco tem título, `Evidência:` e link
- [ ] Os títulos são idênticos aos dos Test Cases
- [ ] O texto de cada link é `CT-<id>`
- [ ] A ordem bate com a da suíte
