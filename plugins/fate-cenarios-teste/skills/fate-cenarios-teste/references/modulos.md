# Módulos válidos

Escolha **um** para o colchete do título. Copie caractere por caractere, inclusive a caixa das letras.

## Lista canônica

Os 56 primeiros vêm do conjunto ouro de 1.293 cenários BDD. Os marcados com (+) foram
acrescentados em 2026-09-22, medidos em **1.940 Test Cases criados a partir de 2025**
(1.921 com rótulo, 117 rótulos distintos) — todos com 3 ou mais ocorrências.

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
```

O `(+)` não faz parte do nome — é só a marca de quando entrou. Escreva `Convênio`, não `(+) Convênio`.

Confirmados em uso pelo QA em 2026-09-23, na suíte 244042 da US 239742:

```
Usuários                         Conferência de Estoque
Peso Médio                       Transferências
```

`Transferências` (plural) e `Transferência` (singular) convivem. O plural é o observado na
suíte mais recente; o singular tem 10 ocorrências na medição de 2025+. Prefira o plural e
não corrija cenários antigos.

## Grafias que a casa escreve errado

Use sempre a forma da esquerda. As contagens são do levantamento de 2026-09-22.

| Correto | Não escreva |
|---|---|
| `mobyPharma` (68) | `MobyPharma` (41), `Mobypharma` (26), `Mobypahrma` (13), `FCMobyPharma` |
| `Receitas` (641) | `Receita` (4), `FCReceitas` |
| `Livro de Receituário` (51) | `Livro de Receituários` (7) |
| `Parâmetros` (37) | `Parâmetro` (26) |
| `Notas` (40) | `notas` (3) |
| `Formulas` (11) | `Fórmulas` (4) |
| `Fcerta` (16) | `FCerta` (7), `FCERTA` (3), `FCserver` |
| `LogiPrix` (12) | `Logiprix` (3) |
| `Certificado de Analise` | `Certificado de Análise` (4) |
| `Laboratorio` (5) | `Laboratórios` (8) |
| `Fórmula Padrão` (42) | `Formula Padrão` |
| `Produtos` (43) | `Produto`, `Fcprodutos` |
| `NFE` (12) | `NF-e`, `Nota Fiscal Eletrônica` |
| `SPED - Fiscal` (4) | `SPED-Fiscal` |
| `Listagem de Inventário` | `Listagem de Inventario` |
| `Cartões de Crédito` (22) | `AdmCartao` (3), `FCAdmCartao`, `FCADM CARTAO` |
| `RedesSociaisService` (21) | `Redes Sociais` (3), `RedesSociais` (4) |

`Mobypahrma` é erro de digitação de *mobyPharma* e aparece 13 vezes. Ficou fora da lista de propósito.

## Três conflitos que o time precisa decidir

Nestes casos a forma que o conjunto ouro registrou como certa **não** é a mais frequente
hoje. Mantive a forma do conjunto ouro, mas a divergência é real — vale levar ao time:

| Forma canônica (conjunto ouro) | Forma mais frequente hoje | Placar |
|---|---|---|
| `Livro de Psicotrópicos` | `Livro de Psicotrópico` | 22 x 29 |
| `Controle de Entregas` | `Controle de entregas` | 7 x 24 |
| `Laboratorio` | `Laboratórios` | 5 x 8 |

Enquanto não houver decisão, use a forma canônica e **não corrija** cenários antigos.

## Como escolher o módulo

**O módulo é a tela onde aquele cenário roda — não um guarda-chuva para a US inteira.**

Esta é a regra mais importante desta página, e a que mais se erra. Uma US que atravessa
quatro telas gera cenários com **quatro módulos diferentes**, um por tela. Não force todos
para o módulo da regra de negócio que originou a demanda.

Exemplo real (US 239742, uma permissão que afeta quatro telas):

```
Certo:  [Usuários] Perfil do Usuário: Apresentar a nova permissão de configuração das balanças
        [Integração Balança Eletrônica] Relação das Balanças: Ocultar o botão Configurações sem a permissão
        [Peso Médio] Relação das Balanças: Ocultar o botão Configurações sem a permissão
        [Conferência de Estoque] Altera Balança: Ocultar o botão Configurações sem a permissão
        [Transferências] Altera Balança: Ocultar o botão Configurações sem a permissão

Errado: [Integração Balança Eletrônica] Peso Médio: Ocultar o botão Configurações sem a permissão
        (empurrou a tela para o lugar da funcionalidade e repetiu o módulo da regra)
```

A **funcionalidade** (depois do módulo, antes dos dois-pontos) é a janela ou o comando
concreto daquela tela: `Relação das Balanças`, `Altera Balança`, `Perfil do Usuário`.
Não é o módulo repetido nem o nome da demanda.

Ordem de decisão do módulo, por cenário:

1. **A tela onde o passo `QUANDO` acontece.** É o critério principal.
2. **Test Cases já existentes da mesma tela**, para copiar a grafia em uso.
3. **Area Path do work item.** O último segmento costuma nomear o módulo.
4. **Campos ModuleFATE / SubmoduleFATE**, quando preenchidos. Confira contra esta lista:
   eles trazem nomes que nem sempre existem aqui.
5. **Pergunte ao usuário.** Melhor uma pergunta que um módulo inventado.

O **rótulo entre colchetes no título da US** não serve como módulo quando for nome de cliente
(`[Pharmapele]`, `[Drogasil]`) ou de projeto. Serve só quando nomeia mesmo um módulo.

## Nunca

- **Nunca use nome de executável nem versão como módulo.** `FCReceitas.exe`,
  `FCReceitas.exe - 6.0.1140`, `Firebird 4.0` não são módulos. Quando a Regra de Negócio
  traz um campo "Módulo:", ele costuma registrar o executável — o módulo de verdade é `Receitas`.
- **Nunca invente sigla.**
- Se o módulo não estiver na lista e a US trouxer um rótulo próprio entre colchetes, use o
  rótulo da US e **avise o usuário** que ele não está no vocabulário conhecido.

## Apêndice — inventário de executáveis

Os 194 executáveis de uma instalação do Formula Certa, lidos em 2026-09-22.
Serve para **traduzir** o executável citado numa Regra de Negócio para o módulo de negócio —
nunca para virar rótulo de título.

Correspondências confirmadas em uso (o resto exige confirmação):

| Executável | Módulo |
|---|---|
| `FCReceitas` | Receitas |
| `FCBalanca` | Integração Balança Eletrônica (tela: Pesagem Monitorada) |
| `FCPesoMedio` | tela Peso Médio — sem módulo próprio na lista |
| `FCConfEstoque` | tela Conferência de Estoque — sem módulo próprio na lista |
| `FCTransferencias` | Transferência |
| `FCUsuarios` | tela Arquivos > Usuários — permissões entram como pré-requisito |
| `FCCaixa` | Caixa |
| `FCProdutos` | Produtos |
| `FCClientes` | Clientes |
| `FCMobyPharma` | mobyPharma |
| `FCNFE` / `FCNFCE` / `FCNFSE` | NFE / NFC-e / NFS-e |
| `FC7LivroPsicotropico` | Livro de Psicotrópicos |
| `FC7LivroReceituario` | Livro de Receituário |
| `FC7OrcRejeitados` | Orçamentos Rejeitados |
| `FC4GestaoEst` | Gestão de Estoques |
| `FC4CVendedores` | Comissão de Vendedores |
| `FC4ListPacientes` | Listagem de Pacientes |
| `FC7Listinv` | Listagem de Inventário |
| `fcConsisteCaixa` | Consistência de Caixa |
| `fcFluxoCaixa` | Fluxo de Caixa / Manutenção Fluxo de Caixa |

Inventário completo:

```
7za                               FCBackupInCloudSync               FCPerdaPsico
ATB_218984                        FCBalanca                         FCPesoMedio
ATB_22581_mobyPharma              FCCaixa                           FCPFaltantes
ATB_233370                        FCCalculaEstoqueInicial           FCPrintServer
ATB_236372                        FCCertificados                    FCProdutos
ATB_29367                         FCClientes                        FCQuestionario
ATB_34571                         FCConfEstoque                     FCQuestionarioADM
ATB_NFe                           fcConsisteCaixa                   FCQuestionarioMIP
ATB_Permissoes_Moby               FCConsultaGP                      FCReceitas
ConsumidorVclCheckout             FCConsultaTP                      FCRedesSociaisService
FagrontechRemoto                  FCConsultaZN                      FCRenumeraClientes
fate-whatsapp Setup 1.0.11        FCContaCorrente                   FCRequisicao
FATEServices                      FCConvenios                       FCSATCFE
FaxConsole                        FCCotacao                         FCScripts
FBBackupRestore                   FCDashboard                       FCSEFPE
FBCreateDataBase                  FCDashboardService                FCServerWizard
FBExtractMetadata                 FCDefinicoes                      FCSharing
FBInfoSystem32                    FCDefinicoesEsp                   FCSharingServices
FBInfoSystem64                    FCDevolucao                       FCSintegra
FBInstall                         FCDief                            FCSintegraNFP
FBPrepareEnvironment              FCEFarmaceutica                   FCSintegraOS
FBReconcileDatabase               FCEntrega                         FCSngpc
FBWizardMigra                     fcerta                            FCSobre
FC_Estacao                        FCertaIntegraDBsrv                FCSped
FC_Registra_Dll                   FCertaRegistroData                FCSpedPisCofins
FC4CVendedores                    FCertaSyncService                 FCSPEDWeleda
FC4FichaConvenio                  FCEtiquetas                       FCSystaxSync
FC4FichaFabricante                FCFACODevolucoes                  FCTransferencias
FC4FichaFornecedor                FCFateServices                    FCUsuarios
FC4FichaMedico                    FcFeedback                        FCUtilDB
FC4GestaoEst                      FCFeriados                        FCVarejo
FC4ListAltPrecos                  FCFichaTecnica                    FCVersaoBanco13
FC4ListPacientes                  FCFiliais                         FCVersaoBanco14
FC4PCadastraveis                  FCFiscal                          FCZaniniUpdate
FC4PCurvaABC                      fcFluxoCaixa                      FCZaniniUpdateFull
FC4ProdControlados                fcformulas                        FCZaniniUpdateFullManager
FC4ProdsInativos                  FCFornecedores                    FormulaCertaDevices
FC4TabPrecosB                     FCFPadrao                         FormulaCertaUpdate
FC7AtuCurva                       FCFPopular                        FPANALISEPRECOS
FC7AtuEstMinimo                   fcfuncionarios                    FPCALCULOBASE
FC7CompMenMed                     FCGestaoPedidos                   FPCALCULOMAPA
FC7CtrVendas                      FCGestaoPedidosP                  FPCALCULOMARGEM
FC7CustMercVendidas               FCIntegracao                      FPDEMRES
FC7ListConvenios                  fcintegradb                       FPFluxoCaixa
FC7Listinv                        FCIntegradorProdutos              FPLaborat
FC7LivroPsicotropico              FCIntegraSoftBuilder              FPreco
FC7LivroReceituario               FCIntegraWebCard                  gbasmsb
FC7OrcRejeitados                  FCLaborat                         gbasmsb_gbas
FC7PreparaMes                     FCLimpaArq                        haspdinst
FC7Produtividade                  fcmedicos                         Identicacao_Terminal
FC7ResumoMovi                     FCMenuSped                        InstDllCaixa_CONV_0909
FC7ResumTransf                    FCMobyPharma                      InstDllCaixa_PAF_v6.0.10
FC7RetrosAnualMed                 FCMobyPharma-old                  InstDllCaixa_sem_conv_0909
FC7Visitacao                      FCMoedas                          MD5_and_SHA_Checksum_Utility
FCAdmCartao                       FCMonitoramento                   Novodll60
FCAtencaoF                        FCNews                            sx32Aplic
FCAtuAcumulado                    FCNFantasia                       SyncManager
FCAtualizaCatalogo                FCNFCE                            unins000
FCAtualizaNotas                   FCNFE                             ValidadorAmbienteMobyPharma
FCAtuEntrada                      FCNFSE                            ValidadorAmbienteNFe_NFCe40
FCAtuSaida                        FCNotas                           WebSNGPC
FCAutoAtendimento                 FCParametros                      WebSNGPC20
FCBackup                          FCPContas                         WinXML20
FCBackupInCloud                   FCPcp                             ZeraDataATB_9621
FCBackupInCloudService            FCPedidos
```

Um executável desta lista sem módulo correspondente **não** autoriza inventar um rótulo:
pergunte ao time qual módulo a casa usa para aquela tela.
