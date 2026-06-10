# Monorepo Code Style

All apps in this monorepo are in early stage. Every code generation and edit must follow these rules.

## Priority order

1. Simple
2. Readable

## Rules

**Client-only**
All implementations and fixes are client-only across the entire monorepo. Do not introduce or rely on server-only changes unless explicitly requested.

## Agent tools (local)

### Ler Supabase `dekbot_logs` (autônomo)

- Use o wrapper `.agents/tools/dekbot-logs-read.sh` (ele carrega `apps/dekbot-server/.env` e chama o script Node).
- Sempre passe `--type` com um valor válido do `dekbotLogTypeEnum` (`trace|debug|info|warn|error|fatal`).

Comando:

```bash
./.agents/tools/dekbot-logs-read.sh --type debug
```

Notas:

- O output é **JSON** em stdout: `{ ok, type, limit, data }` ou `{ ok:false, error }`.
- Se houver falha de DNS/rede para `*.supabase.co` em ambiente restrito/sandbox, execute a tool **fora do sandbox** (permissão “all” no executor) para garantir resolução DNS.
- Não colar/registrar valores de `SUPABASE_SERVICE_ROLE_KEY` em chat/commits/logs.

**Minimum viable implementation**
Write only what is needed for the happy path. No fallbacks, no guards, no defensive patterns, no dead code.

**No error handling**
Do not add `try/catch` blocks unless explicitly requested.

**Async style**
Always use `async/await`. Never use `.then()` or `.catch()` chains.

**Flat control flow**
Keep control flow as flat as possible. Avoid nested `if` blocks and nested callbacks. Use early returns to reduce nesting. This applies to control flow only — nested data structures are fine.
