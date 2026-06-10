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
   value: { default: '', type: String },
})

const inputId = `${props.value}-${useId()}`

const inputUi = computed(() => {
   return {
      ...(props.ui || {}),
      base: ['peer py-3 h-11', props.ui?.base],
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
         v-maska
         :value="value"
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
