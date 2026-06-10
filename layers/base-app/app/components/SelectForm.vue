<script setup lang="ts">
import type { GetItemKeys } from '@nuxt/ui'

interface Item extends Partial<{ id: string; numberDay: number }> {
   name: string
}

const props = defineProps({
   disabled: {
      type: Boolean,
   },
   help: {
      default: '',
      type: String,
   },
   icon: {
      default: '',
      type: String,
   },
   items: {
      default: () => {
         return [] as Item[]
      },
      type: Array as PropType<Item[]>,
   },
   labelKey: {
      default: 'name',
      type: String as PropType<GetItemKeys<Item[]>>,
   },
   multiple: {
      type: Boolean,
   },
   name: {
      required: true,
      type: String,
   },
   placeholder: {
      default: '',
      type: String,
   },
   valueKey: {
      default: 'id',
      type: String as PropType<GetItemKeys<Item[]>>,
   },
})

const emit = defineEmits(['change'])

const { value } = useField<string | undefined>(props.name)
</script>

<template>
   <UFormField :help="help" class="col-span-12">
      <USelect
         v-model="value"
         class="w-full"
         :value-key="props.valueKey"
         :label-key="props.labelKey"
         :icon="props.icon"
         :placeholder="props.placeholder"
         :items="props.items"
         :multiple="props.multiple"
         :disabled="props.disabled || !props.items.length"
         @update:model-value="emit('change', value)" />
   </UFormField>
</template>
