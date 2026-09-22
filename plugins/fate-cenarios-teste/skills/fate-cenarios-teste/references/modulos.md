# Módulos válidos

Escolha **um** desta lista para o colchete do título. Copie caractere por caractere, inclusive a caixa das letras.

São os 56 módulos com três ou mais ocorrências no conjunto ouro de 1.293 cenários.

```
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
Clientes                         Logiprix
Fcerta                           Parâmetros
Etiquetas                        Perdas
Sintegra                         Resumo do Movimento
Certificado de Analise           SNGPC
Gestão de Estoques               Sobre
```

## Grafias que a casa escreve errado

Use sempre a forma da esquerda.

| Correto | Não escreva |
|---|---|
| `mobyPharma` | `MobyPharma`, `Mobypharma`, `mobypharma`, `Mobypahrma` |
| `Receitas` | `Receita` |
| `Livro de Psicotrópicos` | `Livro de Psicotrópico` |
| `Fórmula Padrão` | `Formula Padrão` |
| `Produtos` | `Produto` |
| `Formulas` | `Fórmulas` |
| `Controle de Entregas` | `Controle de entregas` |
| `Livro de Receituário` | `Livro de Receituários` |
| `NFE` | `NF-e` |
| `Fcerta` | `FCerta` |
| `Certificado de Analise` | `Certificado de Análise` |
| `Laboratorio` | `Laboratórios` |
| `SPED - Fiscal` | `SPED-Fiscal` |
| `Listagem de Inventário` | `Listagem de Inventario` |

`Mobypahrma` é erro de digitação de *mobyPharma* e aparece 8 vezes na base. Ficou fora da lista de propósito.

## Como escolher o módulo

Nesta ordem:

1. **Rótulo entre colchetes no título da própria US.** Se a US já traz `[Receitas]`, use `Receitas`.
2. **Area Path do work item.** O último segmento costuma nomear o módulo.
3. **Tela ou rotina citada na descrição.** "Saídas > Receitas > Clientes" indica `Receitas`.
4. **Pergunte ao usuário.** Melhor uma pergunta que um módulo inventado.

## Nunca

- **Nunca use nome de executável nem versão.** `FCReceitas.exe`, `FCReceitas.exe - 6.0.1140`, `Firebird 4.0` não são módulos. Quando a Regra de Negócio traz um campo "Módulo:", ele costuma registrar o executável — o módulo de verdade é `Receitas`.
- **Nunca invente sigla.**
- Se o módulo não estiver na lista e a US trouxer um rótulo próprio entre colchetes, use o rótulo da US e **avise o usuário** que ele não está no vocabulário conhecido.
