<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui'

const props = withDefaults(
   defineProps<{
      disabled?: boolean
      itemDescription?: string
      open?: boolean | null
      showTrigger?: boolean
      variant?: ButtonProps['variant']
   }>(),
   {
      disabled: false,
      itemDescription: '',
      open: null,
      showTrigger: true,
      variant: 'outline',
   },
)

const emit = defineEmits<{
   (e: 'delete'): void
   (e: 'update:open', value: boolean): void
}>()

const internalOpen = ref(false)

const modalOpen = computed({
   get() {
      return props.open === null ? internalOpen.value : props.open
   },
   set(value: boolean) {
      if (props.open === null) {
         internalOpen.value = value
      }

      emit('update:open', value)
   },
})

function onConfirm() {
   emit('delete')
   modalOpen.value = false
}
</script>

<template>
   <UModal
      v-model:open="modalOpen"
      title="Alerta"
      description="Você tem certeza que deseja excluir este item?">
      <UButton
         v-if="showTrigger"
         icon="i-lucide-trash"
         :disabled="disabled"
         size="md"
         :variant="variant"
         color="error"
         :ui="{ base: 'size-9' }" />

      <template #body>
         <span>{{ itemDescription }}</span>
      </template>

      <template #footer>
         <UButton
            label="Cancelar"
            variant="soft"
            color="neutral"
            @click="modalOpen = false" />

         <UButton
            label="Excluir"
            icon="i-lucide-trash"
            variant="outline"
            color="error"
            @click="onConfirm()" />
      </template>
   </UModal>
</template>
