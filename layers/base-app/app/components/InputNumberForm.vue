<script setup lang="ts">
const props = defineProps({
   decrement: {
      default: true,
      type: [Boolean, Object],
   },
   disabled: {
      type: Boolean,
   },
   error: {
      default: '',
      type: String,
   },
   formatOptions: {
      default: undefined,
      type: Object as PropType<Intl.NumberFormatOptions>,
   },
   help: {
      default: '',
      type: String,
   },
   immediateFocus: {
      type: Boolean,
   },
   increment: {
      default: true,
      type: [Boolean, Object],
   },
   label: {
      default: '',
      type: String,
   },
   max: {
      default: undefined,
      type: Number,
   },
   min: {
      default: undefined,
      type: Number,
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
   step: {
      default: undefined,
      type: Number,
   },
})

interface InputNumberFormEl {
   inputRef?: {
      focus: () => void
      select: () => void
   }
}

const inputNumberFormEl = useTemplateRef<InputNumberFormEl>('inputNumberFormEl')
const inputId = `${props.name}-${useId()}`

const { value } = useField<number | null>(props.name)

const normalizedValue = computed<number | null>({
   get: () => {
      return typeof value.value === 'number' ? value.value : null
   },
   set: (newValue) => {
      value.value = typeof newValue === 'number' ? newValue : null
   },
})

function getFocus() {
   nextTick(() => {
      inputNumberFormEl.value?.inputRef?.focus()
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
      :hint="props.label.length && props.optional ? '(opcional)' : undefined"
      :required="props.label.length ? !props.optional : undefined"
      :help="props.help"
      :error="props.error.length ? props.error : undefined"
      class="col-span-12">
      <UInputNumber
         :id="inputId"
         ref="inputNumberFormEl"
         v-model="normalizedValue"
         :placeholder="props.placeholder"
         :disabled="props.disabled"
         :increment="props.increment"
         :decrement="props.decrement"
         :min="props.min"
         :max="props.max"
         :step="props.step"
         :format-options="props.formatOptions"
         class="w-full"
         :ui="{
            base: 'peer py-3 h-11',
         }"
         @focus="props.selectOnFocus && $event.target.select()" />
   </UFormField>
</template>
