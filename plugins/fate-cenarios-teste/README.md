# fate-cenarios-teste

Plugin de QA do Formula Certa VCL (Fagron Tech).

Le um work item do Azure DevOps pelo numero e escreve, no padrao da casa:

- cenarios de teste em BDD;
- a Task de Validacao;
- o Bug, quando houver defeito observado;
- a estrategia de teste recomendada (massa de dados, ordem, riscos, evidencia).

Com autorizacao explicita, tambem grava no board:

- cria a suite da US no plano de teste da iteracao e preenche os passos dos Test Cases;
- cria as pastas de evidencia (US-<id>/CT-<id>) na biblioteca do time e gera o link de cada uma;
- escreve a descricao da Task de Validacao com esses links.

Cada uma dessas tres escritas pede autorizacao propria, sempre depois de voce ver os cenarios
na versao final. Autorizacao de uma US nao vale para a proxima. Sem autorizacao, o plugin so
le e entrega texto.

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

Para criar as pastas de evidencia e gerar os links, e preciso ainda:

4. Acesso de escrita a biblioteca de documentos do site `squadlastjedi` no SharePoint —
   o mesmo acesso que voce usa para guardar evidencia hoje.

O token do Microsoft Graph sai do mesmo `az login`, sem configuracao extra. Se voce nao tiver
esse acesso, as demais funcoes continuam valendo; so a etapa de pastas nao roda.

## Manutencao

As regras de escrita (formato do cenario, do bug, lista de modulos) estao
copiadas em `skills/fate-cenarios-teste/references/`.

A fonte de verdade desses padroes e o repositorio `FormulaCertaVCL-Test-Plans`
(`app/prompts/bdd.py`, `app/prompts/bug.py`, `data/modulos.json`). Ao alterar
qualquer uma dessas fontes, atualize as referencias aqui e suba a versao em
`.claude-plugin/plugin.json` — senao o plugin passa a ensinar uma regra que o
sistema ja abandonou.

## Nao edite a copia instalada

Se voce quiser mudar alguma regra, mude **neste repositorio** e publique. Editar os arquivos
dentro de `~/.claude/plugins/marketplaces/fate-plugins-qa/` parece funcionar na hora, mas
**quebra a atualizacao automatica em silencio**: o `git pull` do marketplace falha porque a
copia local esta suja, e o plugin congela na versao do dia em que foi editado — sem nenhum
aviso.

Foi o que aconteceu em 2026-09-23: uma edicao direta no `task-validacao.md` instalado deixou
o plugin travado na 1.0.0 por dois dias, enquanto o repositorio ja estava na 2.4.1.

Para conferir se a sua copia esta travada:

```
git -C "%USERPROFILE%\.claude\plugins\marketplacesate-plugins-qa" status --short
```

Qualquer coisa listada ali e uma edicao local que precisa ser descartada com
`git checkout -- <arquivo>` para o auto-update voltar a funcionar.
