<script setup lang="ts">
const props = defineProps({
   disabled: {
      default: false,
      type: Boolean,
   },
   disableOnFetching: {
      default: true,
      type: Boolean,
   },
   label: {
      default: undefined,
      type: String,
   },
   loading: {
      default: false,
      type: Boolean,
   },
   loadingLabel: {
      default: undefined,
      type: String,
   },
})

const globalStore = useGlobalStore()

const attrs = useAttrs()

const slots = useSlots()

const { isLoading: isLoadingIndicator } = useLoadingIndicator()

const isFetching = computed(() => {
   return globalStore.showLoading
})
const isLoading = computed(() => {
   return props.loading || isFetching.value || isLoadingIndicator.value
})
const isDisabled = computed(() => {
   return props.disabled || (props.disableOnFetching && isFetching.value)
})

const hasDefaultSlot = computed(() => {
   return !!slots.default
})
const hasLoadingSlot = computed(() => {
   return !!slots.loading
})
const leadingSlotProvided = computed(() => {
   return !!slots.leading
})
const trailingSlotProvided = computed(() => {
   return !!slots.trailing
})

const resolvedLabel = computed(() => {
   if (hasDefaultSlot.value) {
      return undefined
   }
   if (isLoading.value && props.loadingLabel) {
      return props.loadingLabel
   }
   return props.label
})
</script>

<template>
   <UButton
      v-bind="attrs"
      :label="resolvedLabel"
      :loading="isLoading"
      :disabled="isDisabled">
      <template v-if="hasDefaultSlot" #default>
         <slot v-if="!isLoading" />
         <slot v-else-if="hasLoadingSlot" name="loading" />
         <span v-else-if="props.loadingLabel ?? props.label">
            {{ props.loadingLabel ?? props.label }}
         </span>
      </template>

      <template v-if="leadingSlotProvided && !isLoading" #leading>
         <slot name="leading" :is-loading="isLoading" :is-fetching="isFetching" />
      </template>

      <template v-if="trailingSlotProvided && !isLoading" #trailing>
         <slot name="trailing" :is-loading="isLoading" :is-fetching="isFetching" />
      </template>
   </UButton>
</template>
