# Naming Spec

## Objetivo

Padronizar nomeações para manter previsibilidade, legibilidade, busca fácil e consistência entre apps, packages e libs.

## Regras base

- Código em **inglês**
- Mesmo tipo de coisa = mesmo padrão de nome
- Nome deve revelar intenção, não implementação
- Evitar abreviações fracas e nomes genéricos
- Explicitar formato/unidade quando isso importar

## Convenções por tipo

- `camelCase`: variáveis, funções, params, props
- `PascalCase`: componentes, tipos, interfaces, enums, classes
- `UPPER_SNAKE_CASE`: constantes globais e env vars
- `kebab-case`: arquivos, pastas, rotas, packages

## Funções

Usar **verbo + alvo**.

Exemplos:

- `getUserProfile`
- `createInvoice`
- `formatUnixToShortDate`
- `parseIsoToUnixSeconds`
- `normalizeAgentConfig`

Evitar:

- `handleStuff`
- `process`
- `doAction`

## Variáveis

Usar **substantivo claro**.

Exemplos:

- `user`
- `users`
- `selectedAgentId`
- `agentConfig`

Evitar:

- `data`
- `item`
- `value`
- `obj`

## Booleans

Sempre usar prefixo semântico:

- `is`
- `has`
- `can`
- `should`

Exemplos:

- `isConnected`
- `hasPendingChanges`
- `canRetry`
- `shouldPersistSession`

## Arrays e maps

- Arrays em **plural**: `agents`, `users`, `invoiceItems`
- Maps com chave explícita: `usersById`, `templatesByAgentId`

Evitar:

- `userArray`
- `agentMap` quando `agentsById` for mais claro

## IDs

Sempre com sufixo `Id`.

Exemplos:

- `userId`
- `agentId`
- `workspaceId`

## Prefixos padronizados

- `get`: leitura simples
- `find`: pode não encontrar
- `list`: retorna coleção
- `create`: criação
- `update`: atualização
- `delete`: remoção
- `parse`: converte input para estrutura
- `format`: converte estrutura para string
- `build`: compõe payload/config
- `validate`: valida
- `assert`: valida e falha
- `resolve`: decide valor final
- `normalize`: padroniza shape/valor
- `fetch`: I/O remoto

## Sufixos padronizados

Usar só quando agregarem semântica real:

- `Input`
- `Output`
- `Params`
- `Options`
- `Result`
- `Response`
- `Config`
- `State`
- `Payload`

Evitar:

- `Data`
- `Info`
- `Helper`
- `Utils`
- `Manager`

## Arquivos

Nome do arquivo deve refletir o principal export.

Exemplos:

- `agent-config-service.ts`
- `format-unix-to-short-date.ts`
- `use-auth-interceptor.ts`
- `customer-card.vue`

Evitar:

- `utils.ts`
- `helpers.ts`
- `misc.ts`

## Componentes e composables

- Componentes: substantivo de interface em `PascalCase`
- Arquivos Vue: `kebab-case`
- Composables: sempre `use...`

Exemplos:

- `CustomerCard`
- `AgentSettingsForm`
- `useAuthInterceptor`
- `useWhatsAppConnection`

## Types e enums

- Tipos/interfaces: substantivo singular
- Enums: nome singular, membros curtos e claros

Exemplos:

- `User`
- `AgentConfig`
- `CreateInvoiceInput`

```ts
enum ConnectionStatus {
   Idle,
   Connecting,
   Connected,
   Failed,
}
```

## Datas, tempo e unidades

Quando o formato importa, ele deve aparecer no nome.

Exemplos:

- `unixSeconds`
- `isoString`
- `hhmmString`
- `minutesOfDay`
- `timeZone`
- `priceInCents`
- `timeoutMs`

Funções:

- `formatUnixToShortDate`
- `formatIsoToLongDate`
- `parseHHmmToMinutesOfDay`
- `formatMinutesOfDayToHHmm`

## Backend e API

- Coleções em plural: `/agents`
- Item por parâmetro: `/agents/:agentId`
- Payloads com nome explícito:
   - `createAgentInput`
   - `updateAgentInput`
   - `agentResponse`
   - `agentsResponse`

## Proibições

Não usar:

- `data`
- `item`
- `obj`
- `thing`
- `stuff`
- `tempData`
- `finalData`
- `misc`
- `common`
- abreviações fracas como `cfg`, `resp`, `val`
