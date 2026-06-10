# Form Composables

Use esta skill quando o usuário pedir para criar, evoluir ou padronizar forms
resolvidos por composables `useHForm...`, especialmente quando o template nao deve
carregar os inputs nem a logica fina do formulário.

## Referencia inicial

O primeiro exemplo canônico e:

- `layers/schedly-consumer/app/composables/useHFormSchedlySummary.ts`

## Padrão atual

- O composable define o schema atual.
- O composable cria o `useForm` tipado.
- O composable usa `buildDocDefault(schema)` como `initialValues`.
- O composable expõe estados derivados simples, começando por `allowedSubmit`.
- O template ou caller consome apenas o retorno do composable.

## Create-only obrigatório

Quando o upsert não for permitido e o fluxo exigir create, aceite um options object
com flag literal:

```ts
useHFormSchedlySummary({ onlyCreateIsAllowed: true })
```

Assinatura preferida:

```ts
export function useHFormSchedlySummary(options?: { onlyCreateIsAllowed?: true }) {
```

Regra de submit:

```ts
const allowedSubmit = computed(() => {
   return isFormValid.value && (isFormDirty.value || options?.onlyCreateIsAllowed)
})
```

Use `onlyCreateIsAllowed` quando a origem do fluxo precisa declarar que criar e
obrigatório mesmo sem dirty state inicial. Para o fluxo normal de upsert, omita a
opção e preserve a exigência de `isFormDirty`.
