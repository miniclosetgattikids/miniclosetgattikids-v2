<script setup lang="ts">
defineProps({
   allowedSubmit: {
      type: Boolean,
   },
   isDeleting: {
      default: false,
      type: Boolean,
   },
   title: {
      default: '',
      type: String,
   },
})

const emit = defineEmits(['onCancel', 'onSubmit', 'onDelete', 'onEnter', 'onLeave'])

const showModal = ref(false)

const onCancel = () => {
   showModal.value = false
   emit('onCancel')
}

const onDelete = () => {
   emit('onDelete')
}

const onSubmit = () => {
   emit('onSubmit')
}

defineExpose({
   showModal,
})
</script>

<template>
   <UModal
      v-model:open="showModal"
      :title="title"
      description=" "
      @after:enter="emit('onEnter')"
      @after:leave="emit('onLeave')">
      <template #body>
         <slot />
      </template>

      <template #footer>
         <UButton
            label="Cancelar"
            variant="soft"
            color="neutral"
            @click="onCancel()" />

         <UButton
            v-if="isDeleting"
            label="Excluir"
            icon="i-lucide-trash"
            variant="outline"
            color="error"
            @click="onDelete()" />

         <BFetchingButton
            v-else
            label="Salvar"
            :disabled="!allowedSubmit"
            @click="onSubmit()" />
      </template>
   </UModal>
</template>
