<script setup lang="ts">
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
   placeholder: {
      default: '',
      type: String,
   },
   rows: {
      default: 4,
      type: Number,
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

const textareaId = `${props.name}-${useId()}`

const { value } = useField<string | undefined>(props.name)

const normalizedValue = computed({
   get: () => {
      return value.value
   },
   set: (newValue) => {
      value.value = newValue === '' ? undefined : newValue
   },
})
</script>

<template>
   <UFormField
      :ui="formFieldUi"
      :help="help"
      :error="error.length ? error : undefined"
      class="col-span-12">
      <UTextarea
         :id="textareaId"
         v-model="normalizedValue"
         :rows="rows"
         :placeholder="placeholder"
         class="w-full"
         :disabled="disabled"
         :ui="ui">
         <label v-if="label.length" class="label" :for="textareaId">
            <div class="flex">
               <span>{{ label }}</span>
               <small v-if="optional" class="ml-1 pb-[0.5px]">(opcional)</small>
               <small v-else>*</small>
            </div>
         </label>
      </UTextarea>
   </UFormField>
</template>
