# fate-cenarios-teste

Plugin de QA do Formula Certa VCL (Fagron Tech).

Le um work item do Azure DevOps pelo numero e escreve, no padrao da casa:

- cenarios de teste em BDD;
- a Task de Validacao;
- o Bug, quando houver defeito observado;
- a estrategia de teste recomendada (massa de dados, ordem, riscos, evidencia).

Somente leitura: o plugin nunca cria nem altera work item no Azure DevOps.

## Uso

```
/fate-cenarios-teste <numero da US>
```

Tambem dispara sozinho em frases como "gere os cenarios da US 239742" ou
"o que precisa ser testado na 239742?".

## Pre-requisitos

Para a leitura automatica do work item e preciso ter o plugin `fate-azure-devops`
funcionando (MCP do Azure DevOps da organizacao fagrontech), o que exige:

1. Node.js 20 LTS ou superior.
2. Azure CLI.
3. Sessao do Azure CLI com conta `@fagrontech.com.br`:

```
az login --use-device-code --allow-no-subscriptions
```

Sem isso a skill continua funcionando, mas apenas a partir do conteudo da US
colado na conversa.

## Manutencao

As regras de escrita (formato do cenario, do bug, lista de modulos) estao
copiadas em `skills/fate-cenarios-teste/references/`.

A fonte de verdade desses padroes e o repositorio `FormulaCertaVCL-Test-Plans`
(`app/prompts/bdd.py`, `app/prompts/bug.py`, `data/modulos.json`). Ao alterar
qualquer uma dessas fontes, atualize as referencias aqui e suba a versao em
`.claude-plugin/plugin.json` — senao o plugin passa a ensinar uma regra que o
sistema ja abandonou.
