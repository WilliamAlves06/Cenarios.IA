# Padrão do cenário de teste (BDD)

Os percentuais foram medidos em **1.293 Test Cases** do projeto Formula Certa VCL no Azure DevOps (conjunto ouro: BDD completo criado a partir de 2025). Eles estão aqui de propósito: a regra que você sabe ser majoritária é a que você obedece. Adesão acima de 70% é regra dura.

## Formato obrigatório

```
[Modulo] Funcionalidade: descrição específica do que é validado
Pré-requisitos:
- Possuir <condição que já precisa existir>;
- Possuir <outra condição>;
Contexto: O usuário <verbo no presente> <o que ele faz nesta validação>.
DADO que o usuário <situação inicial>
E <passo de preparação>
QUANDO <verbo direto da ação principal>
ENTÃO o sistema deve <resultado esperado e verificável>
```

## Exemplo real da casa — siga esta forma

```
[Receitas] Orçamentos: Bloquear inclusão quando o CPF já existir na base
Pré-requisitos:
- Possuir acesso irrestrito à rotina de Receitas;
- Possuir um cliente cadastrado com CPF válido;
Contexto: O usuário realiza a inclusão de um cliente com CPF já cadastrado.
DADO que o usuário acesse Saídas > Receitas > Clientes
E informe um CPF já existente na base
QUANDO clicar no botão Salvar
ENTÃO o sistema deve bloquear a inclusão e apresentar a mensagem de CPF duplicado
```

## Título

**C1.** A primeira linha é sempre `[Modulo] Funcionalidade: descrição específica`. São quatro partes: o módulo entre colchetes, o nome da funcionalidade (a tela ou rotina onde o teste roda), **dois-pontos**, e a descrição do que é validado. *(97,7%)*

O dois-pontos é obrigatório. Sem ele o título está errado, ainda que a frase faça sentido.

```
Certo:  [mobyPharma] Relação de Anexos: Atualizar apenas o pedido selecionado
Errado: [mobyPharma] Atualizar apenas o pedido selecionado
        (falta a funcionalidade e o dois-pontos)
Errado: [Receitas] Inclusão de receita controlada por prescritor COREN
        (tem funcionalidade mas falta o dois-pontos separando a descrição)
```

**C2.** O módulo vem da lista de `modulos.md`, copiado caractere por caractere, inclusive a caixa das letras. *(100% dos cenários abrem com o módulo entre colchetes)*

**C3.** Nunca use nome de executável nem versão como módulo. `FCReceitas.exe`, `FCReceitas.exe - 6.0.1140` e `Firebird 4.0` **não** são módulos — o módulo é `Receitas`. Este é o erro mais comum quando a Regra de Negócio traz um campo chamado "Módulo:", que na verdade registra o executável.

**C4.** Mire em torno de 90 caracteres. Nunca passe de 160. *(mediana da casa: 86 caracteres, 13 palavras)*

## Pré-requisitos

**C5.** O rótulo `Pré-requisitos:` fica **sozinho na linha**. Os itens vêm nas linhas de baixo, nunca na mesma linha do rótulo. *(95,4%)*

**C6.** Todo item começa com hífen e espaço. *(94,3%)*

**C7.** Todo item termina com ponto e vírgula. *(77,3%)*

**C8.** Comece o item com o verbo **"Possuir"**. *(73,5%)*

**C9.** Escreva de 2 a 6 itens. *(mediana 4)*

**C10.** Não liste caminho de banco de dados, nome de arquivo compactado, nem versão de build. Isso é dado de ambiente de quem executa, não pré-requisito de teste.

```
Certo:  - Possuir o argumento ORCAMENTOINTELIGENTE configurado como S;
Errado: - Estar com o banco: E:\Novas Formas Farmacêuticas - 38251
```

## Contexto

**C11.** Uma única linha, começando com **"O usuário"**, verbo no presente da terceira pessoa: *realiza, inclui, acessa, altera, efetua, atende, gera*. *(79,3%)*

```
Contexto: O usuário realiza a inclusão do orçamento para a forma farmacêutica 01 - Cápsula.
```

## Passos

**C12.** Abra sempre com `DADO`. Use **apenas um** `DADO` e encadeie o resto com `E`. *(100%)*

**C13.** `DADO que o usuário ...` é a abertura padrão. *(85,0%)*

**C14.** No `QUANDO`, **não repita "o usuário"** — vá direto ao verbo. Esta é a regra mais violada e a mais importante. *(98% da base escreve sem repetir)*

```
Certo:  QUANDO clicar no botão Salvar
Errado: QUANDO o usuário clicar no botão Salvar
```

**C15.** Feche com `ENTÃO o sistema deve ...`. O verbo **"deve"** é obrigatório. *(83,4%)*

**C16.** `DADO`, `E`, `QUANDO` e `ENTÃO` sempre em CAIXA ALTA no início da linha. *(93,9%)*

**C17.** Você pode encadear mais de um ciclo `QUANDO`/`ENTÃO` quando o fluxo tiver duas verificações. *(21,1% dos cenários fazem isso — é aceito, não é erro.)* Mas **nunca abra um novo `DADO` depois de já ter agido**. *(100%)*

**C18.** Escreva de 3 a 7 linhas de passo no total. *(mediana 5)*

**C19.** Não escreva nenhum comentário depois da última linha do cenário.

## Quando o pedido for de vários cenários

**C20.** Escreva exatamente a quantidade pedida, um cenário após o outro, cada um começando na sua própria linha de título.

**C21.** Separe um cenário do outro por **uma linha em branco**. Não numere os cenários, não escreva "Cenário 1", não use traços nem títulos de seção entre eles.

**C22.** Cada cenário cobre uma **verificação diferente**. Trocar só o dado de entrada não é cenário novo — é o mesmo cenário duas vezes, e isso é erro.

**C23.** Cada cenário é completo e independente: título, pré-requisitos, contexto e passos próprios. Nunca escreva "igual ao anterior" ou "idem".

**C24.** Quando a Regra de Negócio listar Critérios de Aceite, cada cenário cobre um critério, na ordem. Se pedirem mais cenários que critérios, os restantes cobrem exceções e casos de erro derivados da RN.

## Lista de conferência — passe antes de entregar

- [ ] A primeira linha tem o módulo entre colchetes, a funcionalidade, **dois-pontos** e a descrição
- [ ] O módulo está na lista de `modulos.md`, com a grafia exata
- [ ] O módulo não é nome de executável nem versão
- [ ] `Pré-requisitos:` está sozinho na linha
- [ ] Todo pré-requisito começa com hífen e termina com ponto e vírgula
- [ ] Tem de 2 a 6 pré-requisitos
- [ ] `Contexto:` é uma linha e começa com "O usuário"
- [ ] Existe exatamente um `DADO`, e ele é o primeiro passo
- [ ] Nenhum `QUANDO` repete "o usuário"
- [ ] Todo `ENTÃO` tem o verbo "deve"
- [ ] Conectores em CAIXA ALTA
- [ ] De 3 a 7 linhas de passo
- [ ] Nenhum asterisco, crase ou cerquilha em lugar nenhum
- [ ] Cada `QUANDO` tem um `ENTÃO` para parear com ele (ver `grade-testplans.md`)
- [ ] *(lote)* a quantidade bate com o pedido, e nenhum cenário repete a verificação de outro

Se algum item falhar, corrija e só então entregue.
