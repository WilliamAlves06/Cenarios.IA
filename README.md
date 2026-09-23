# Cenarios.IA — marketplace de plugins de QA

Marketplace de plugins do Claude Code para o QA do Formula Certa VCL (Fagron Tech).

## Plugins

| Plugin | O que faz |
|---|---|
| `fate-cenarios-teste` | Le um work item do Azure DevOps pelo numero e escreve cenarios de teste em BDD no padrao da casa, a Task de Validacao e a estrategia de teste. Com autorizacao explicita, cria a suite e os Test Cases no Test Plans e as pastas de evidencia do time. |

## Instalacao

Adicione o marketplace uma vez:

```
claude plugin marketplace add https://github.com/WilliamAlves06/Cenarios.IA.git
```

Depois instale o plugin:

```
claude plugin install fate-cenarios-teste@fate-plugins-qa
```

Reabra a sessao. A skill passa a responder por `/fate-cenarios-teste <numero da US>`,
e tambem dispara em frases como "gere os cenarios da US 239742".

Para atualizar depois:

```
claude plugin marketplace update fate-plugins-qa
```

## Pre-requisitos

Para a leitura automatica do work item e preciso ter o plugin `fate-azure-devops`
funcionando (MCP do Azure DevOps da organizacao fagrontech), o que exige:

1. Node.js 20 LTS ou superior.
2. Azure CLI.
3. Sessao do Azure CLI com a conta corporativa:

```
az login --use-device-code --allow-no-subscriptions
```

Sem isso a skill continua funcionando, mas apenas a partir do conteudo da US
colado na conversa.

## Manutencao

As regras de escrita (formato do cenario, do bug, lista de modulos) estao
copiadas em `plugins/fate-cenarios-teste/skills/fate-cenarios-teste/references/`.

A fonte de verdade desses padroes e o repositorio interno de Test Plans
(`app/prompts/bdd.py`, `app/prompts/bug.py`, `data/modulos.json`). Ao alterar
qualquer uma dessas fontes, atualize as referencias aqui e suba a versao do
plugin em `plugins/fate-cenarios-teste/.claude-plugin/plugin.json` — senao o
plugin passa a ensinar uma regra que o sistema ja abandonou.
