---
name: post-client-app-task
description: Pós-task para mudanças em apps client (Nuxt). Use quando concluir tarefas em apps client para evitar imports hard coded e regenerar auto-imports rodando o script do workspace.
---

# Pós-task em client apps

## Instruções

- Não crie imports hard coded nos files.
- Ao finalizar a task em apps client, execute:

```bash
bash .scripts/post-client-app-task.sh
```
