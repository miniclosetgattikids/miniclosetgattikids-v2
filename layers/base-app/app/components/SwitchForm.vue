<script setup lang="ts">
import type { SwitchProps } from '@nuxt/ui'

const props = defineProps({
   color: {
      default: '',
      type: String as PropType<SwitchProps['color']>,
   },
   label: {
      default: '',
      type: String,
   },
   name: {
      required: true,
      type: String,
   },
   size: {
      default: 'md',
      type: String as PropType<'md' | 'xs' | 'sm' | 'lg' | 'xl'>,
   },
   ui: {
      default: undefined,
      type: Object as PropType<SwitchProps['ui']>,
   },
})

const emit = defineEmits(['change'])

const { value } = useField<boolean>(props.name)
</script>

<template>
   <USwitch
      v-model="value"
      :color="color"
      :label="label"
      :size="size"
      :ui="ui"
      @change="emit('change', value)" />
</template>
