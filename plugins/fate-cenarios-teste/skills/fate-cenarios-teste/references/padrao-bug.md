# Padrão do Bug

Percentuais medidos em **414 bugs** do projeto (2024+, com o par `Resultado atual` / `Resultado esperado`; os 22,2% gerados pelo Test Runner foram descartados por serem dump de execução, não texto de QA).

## Bug não é cenário de teste

Só 0,6% dos bugs da casa usam conector BDD. Se você escrever `DADO`, `QUANDO` ou `ENTÃO` dentro de um bug, o registro está errado.

## Portão — o defeito observado

Você precisa do **defeito observado por quem executou o teste**. A Regra de Negócio diz qual é o comportamento correto, mas o *Resultado atual* só sabe quem viu o erro acontecer.

Se o relato do defeito não vier, **peça** em vez de escrever o bug. Inventar sintoma é o pior resultado possível: gera bug falso e queima tempo de desenvolvimento.

## Formato obrigatório

```
[Modulo] Funcionalidade - Descrição objetiva do defeito
Pré-condições:
- <o que precisa existir no ambiente>;
Como reproduzir:
1- <primeiro passo>
2- <segundo passo>
Resultado atual: <o que o sistema faz hoje, conforme o relato de quem executou>
Resultado esperado: <o que o sistema deveria fazer, conforme a Regra de Negócio>
Trecho da regra de negócio:
<o trecho da RN que o defeito contraria, ou deixe em branco se não houver>
Evidência:
```

## Exemplo real da casa

```
[mobyPharma] Validador Ambiente - Porta 80 continua sendo gravada na FC0MG00 ao reativar o MobyPharma
Pré-condições:
- Possuir o MobyPharma disponível para reativação;
- Possuir acesso ao Validador Ambiente;
Como reproduzir:
1- Acessar Receitas > Pedidos > Validar Ambiente
2- Selecionar a opção Validar
3- Acessar MobyPharma: Reativar
4- Informar a senha do dia e clicar em Salvar
Resultado atual: Ao realizar a reativação do MobyPharma pelo Validador Ambiente, o sistema continua gravando o valor 80 no campo PORT da tabela FC0MG00.
Resultado esperado: Ao realizar a reativação do MobyPharma, o sistema deve gravar o valor 5672 no campo PORT da tabela FC0MG00, mantendo as demais informações inalteradas.
Trecho da regra de negócio:
Evidência:
```

## Título

**B1.** Começa com o módulo entre colchetes. *(91,0%)*

**B2.** Depois do módulo vem a funcionalidade, um hífen cercado de espaços, e a descrição do defeito. *(o separador aparece em 57,7% — não é unânime; é a forma escolhida por deixar o título legível na lista de bugs)*

**B3.** O título descreve **o defeito**, não a correção.

```
Certo:  [Receitas] Rótulos - Foco não vai para o botão Imprimir ao apertar ENTER
Errado: [Receitas] Rótulos - Corrigir o foco do botão Imprimir
```

**B4.** Mire em torno de 110 caracteres. Nunca passe de 190. *(mediana 108, p90 186)*

## Seções

**B5.** Escreva as seções **nesta ordem exata**, cada rótulo sozinho na sua linha:

| Seção | Adesão |
|---|---:|
| `Pré-condições:` | 95,9% |
| `Como reproduzir:` | 93,5% |
| `Resultado atual:` | 100% |
| `Resultado esperado:` | 100% |
| `Trecho da regra de negócio:` | 92,5% |
| `Evidência:` | 98,8% |

**B6.** Não crie seção fora dessa lista. Em particular, **não escreva "Breve descrição do problema"** — aparece em só 39,1% dos bugs e deixou de ser padrão.

**B7.** `Evidência:` é a **última linha e fica vazia**. Quem executou anexa print e vídeo depois. Não escreva nada abaixo dela.

**B8.** Não escreva `Severity`, `Prioridade` nem nenhum metadado. Quem preenche isso é o QA, no Azure. *(A base tem `3 - Medium` em 499 de 499 bugs — não há sinal ali.)*

## Pré-condições

**B9.** Cada item começa com hífen e termina com ponto e vírgula. De 1 a 5 itens. Prefira começar com "Possuir".

**B10.** Não invente caminho de banco, nome de arquivo nem versão de build. Se o relato citar um, repita exatamente o que foi escrito.

## Como reproduzir

**B11.** Passos numerados no formato `1- `, `2- `, um por linha. *(66,7%)*

**B12.** Cada passo é uma ação única e executável, na ordem em que acontece.

**B13.** De 2 a 8 passos. O último passo é o que expõe o defeito.

## O par atual / esperado

**B14.** `Resultado atual:` descreve o comportamento errado e vem do relato de quem executou. **Não amplie nem interprete** o que foi relatado.

**B15.** `Resultado esperado:` descreve o comportamento correto e vem da Regra de Negócio. Use "deve" — *"o sistema deve gravar..."*.

**B16.** Os dois são uma linha cada, começando na mesma linha do rótulo.

## Lista de conferência

- [ ] O título descreve o defeito, não a correção
- [ ] As seis seções estão presentes e na ordem
- [ ] Não existe `DADO`, `QUANDO` nem `ENTÃO` em lugar nenhum
- [ ] Não existe "Breve descrição do problema"
- [ ] `Resultado atual` reproduz o relato recebido, sem ampliar
- [ ] `Resultado esperado` usa "deve"
- [ ] `Evidência:` é a última linha e está vazia
- [ ] Nenhum metadado (Severity, Prioridade)
