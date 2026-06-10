<script setup lang="ts">
import type { Time } from '@internationalized/date'

type InputUi = Record<string, any>

const props = defineProps({
   disabled: {
      type: Boolean,
   },
   error: {
      default: '',
      type: String,
   },
   help: {
      default: '',
      type: String,
   },
   icon: {
      default: '',
      type: String,
   },
   label: {
      default: '',
      type: String,
   },
   name: {
      required: true,
      type: String,
   },
   optional: {
      type: Boolean,
   },
   ui: {
      default: undefined,
      type: Object as PropType<InputUi>,
   },
})

const emit = defineEmits(['change'])

const inputId = `${props.name}-${useId()}`

const { value } = useField<Time | undefined>(props.name)

const normalizedValue = computed<Time | null>({
   get: () => {
      return value.value ?? null
   },
   set: (newValue) => {
      value.value = newValue ?? undefined
   },
})
</script>

<template>
   <UFormField
      :ui="ui"
      :help="help"
      :error="error.length ? error : undefined"
      class="onmobi:w-full col-span-12">
      <UInputTime
         :id="inputId"
         v-model="normalizedValue"
         :icon="props.icon"
         :hour-cycle="24"
         :disabled="disabled"
         class="input w-full min-w-36"
         :ui="{
            base: 'peer h-11 py-1.5',
            segment:
               'focus:bg-primary focus:text-inverted py-1.5 focus:font-semibold',
         }"
         @change="emit('change', normalizedValue)">
         <label v-if="label.length" class="label" :for="inputId">
            <div class="flex">
               <span>{{ label }}</span>
               <small v-if="optional" class="ml-1 pb-[0.5px]">(opcional)</small>
               <small v-else>*</small>
            </div>
         </label>
      </UInputTime>
   </UFormField>
</template>
