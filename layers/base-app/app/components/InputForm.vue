<script setup lang="ts">
import { vMaska } from 'maska/vue'

type InputUi = Record<string, any>

const props = defineProps({
   disabled: {
      type: Boolean,
   },
   error: {
      default: '',
      type: String,
   },
   formFieldUi: {
      default: undefined,
      type: Object as PropType<InputUi>,
   },
   help: {
      default: '',
      type: String,
   },
   immediateFocus: {
      type: Boolean,
   },
   label: {
      default: '',
      type: String,
   },
   leading: {
      default: '',
      type: String,
   },
   mask: {
      default: '',
      type: String,
   },
   maskReversed: {
      type: Boolean,
   },
   maskTokens: {
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
   placeholder: {
      default: '',
      type: String,
   },
   selectOnFocus: {
      type: Boolean,
   },
   trailing: {
      default: '',
      type: String,
   },
   type: {
      default: 'text',
      type: String,
   },
   ui: {
      default: undefined,
      type: Object as PropType<InputUi>,
   },
})

interface InputFormEl {
   inputRef?: {
      focus: () => void
      select: () => void
   }
}

const inputFormEl = useTemplateRef<InputFormEl>('inputFormEl')

const inputId = `${props.name}-${useId()}`

const { value } = useField<string | undefined>(props.name)

const normalizedValue = computed({
   get: () => {
      return value.value
   },
   set: (newValue) => {
      value.value = newValue === '' ? undefined : newValue
   },
})

const inputUi = computed(() => {
   return {
      ...(props.ui || {}),
      base: ['peer py-3 h-11', props.ui?.base],
   }
})

function getFocus() {
   nextTick(() => {
      inputFormEl.value?.inputRef?.focus()
   })
}

onMounted(() => {
   if (props.immediateFocus) {
      getFocus()
   }
})
</script>

<template>
   <UFormField
      :ui="formFieldUi"
      :help="help"
      :error="error.length ? error : undefined"
      class="col-span-12">
      <UInput
         :id="inputId"
         ref="inputFormEl"
         v-model="normalizedValue"
         v-maska
         :data-maska="mask"
         :data-maska-reversed="maskReversed"
         :data-maska-tokens="maskTokens"
         :type="type"
         :placeholder="placeholder"
         :disabled="disabled"
         class="w-full"
         :ui="inputUi"
         @focus="selectOnFocus && $event.target.select()">
         <label v-if="label.length" class="label" :for="inputId">
            <div class="flex">
               <span>{{ label }}</span>
               <small v-if="optional" class="ml-1 pb-[0.5px]">(opcional)</small>
               <small v-else>*</small>
            </div>
         </label>

         <template v-if="leading.length" #leading>
            <span class="text-muted text-sm">{{ leading }}</span>
         </template>

         <template v-if="trailing.length" #trailing>
            <span class="text-muted text-sm">{{ trailing }}</span>
         </template>
      </UInput>
   </UFormField>
</template>
