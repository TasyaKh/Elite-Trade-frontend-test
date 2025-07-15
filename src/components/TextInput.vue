<template>
  <input
    ref="input"
    class="form-control"
    :placeholder="placeholder"
    :type="props.type || 'text'"
    v-if="props.type === TextInputType.PHONE"
  />
  <input
    v-else
    class="form-control"
    :placeholder="placeholder"
    v-model="localValue"
    @input="onInput"
  />
</template>

<script setup lang="ts">
import { TextInputType } from '@/utils/enums/TextInputType'
import IMask from 'imask'
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps<{
  modelValue?: string
  placeholder?: string
  type?: TextInputType
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const input = ref<HTMLInputElement | null>(null)
let mask: ReturnType<typeof IMask> | null = null

const localValue = ref(props.modelValue ?? '')

function applyPhoneMask() {
  if (!input.value) return

  mask = IMask(input.value, {
    mask: '+{7} (000) 000-00-00',
  })

  mask.on('accept', () => {
    emit('update:modelValue', mask!.unmaskedValue)
  })

  if (props.modelValue) {
    mask.unmaskedValue = props.modelValue
  }
}

function removeMaskAndReset() {
  mask?.destroy()
  mask = null
  if (input.value) {
    input.value.value = props.modelValue ?? ''
  }
}

function initMask() {
  if (props.type === TextInputType.PHONE) {
    applyPhoneMask()
  } else {
    removeMaskAndReset()
  }
}

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

watch(
  () => props.modelValue,
  (val) => {
    if (props.type !== TextInputType.PHONE) {
      localValue.value = val ?? ''
    }
  },
)

onMounted(() => {
  initMask()
})

watch(
  () => props.type,
  () => {
    initMask()
  },
)

watch(
  () => props.modelValue,
  (newVal) => {
    if (mask) {
      if (newVal !== mask.unmaskedValue) {
        mask.unmaskedValue = newVal || ''
      }
    } else if (input.value && input.value.value !== newVal) {
      input.value.value = newVal || ''
    }
  },
)

onBeforeUnmount(() => {
  mask?.destroy()
})
</script>

<style lang="scss" scoped>
.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline-offset: 2px;
  transition: border-color 0.15s ease-in-out;
  background: $color-bg;
}

.form-control:focus {
  border-color: $color-brand;
  box-shadow: none;
  outline: none;
}

.form-control::placeholder {
  opacity: 0.7;
}
</style>
