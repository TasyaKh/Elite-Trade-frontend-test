<template>
  <div>
    <div v-for="option in options" :key="option.value" class="form-check">
      <input
        class="form-check-input"
        type="radio"
        :name="name"
        :value="option.value"
        :checked="selectedValue === option.value"
        @change="onUpdate(option.value)"
      />
      <label class="form-check-label">
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  selectedValue: string | number
  options: { value: string | number; label: string }[]
  name?: string
}>()

const emit = defineEmits<{
  (e: 'update', value: string | number): void
}>()

function onUpdate(value: string | number) {
  emit('update', value)
}
</script>

<style scoped lang="scss">
.form-check-input:checked {
  background-color: $color-brand;
  border-color: $color-brand;
}
.form-check-input:focus {
  box-shadow: 0 0 0 0.2rem rgba($color-brand, 0.25);
  border-color: $color-brand;
}
.form-check-label {
  color: #222;
}
.form-check-input:checked ~ .form-check-label {
  color: $color-brand;
}
</style>
