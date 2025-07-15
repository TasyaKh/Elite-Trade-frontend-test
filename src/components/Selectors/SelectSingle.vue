<template>
  <div class="select-single" ref="root">
    <input
      type="text"
      v-model="search"
      class="search"
      placeholder="Поиск..."
      @focus="openDropdown"
      @input="onInput"
      autocomplete="off"
    />
    <div v-if="isDropdownOpen && filteredItems.length" class="dropdown">
      <div
        v-for="item in filteredItems"
        :key="String(item[props.keyProp] ?? '')"
        class="option"
        :class="{ selected: item[props.keyProp] === modelValue }"
        @mousedown.prevent="select(item[props.keyProp])"
      >
        {{ item[props.valueProp] }}
      </div>
      <div v-if="!filteredItems.length" class="no-results">Ничего не найдено</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

// Компонент props
const props = defineProps<{
  items: Record<string, string | number | null>[]
  keyProp: string
  valueProp: string
  modelValue: string | number | null
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
}>()

const search = ref('')
const isDropdownOpen = ref(false)

const filteredItems = computed(() => {
  if (!search.value) return props.items
  return props.items.filter((item) =>
    String(item[props.valueProp]).toLowerCase().includes(search.value.toLowerCase()),
  )
})

function openDropdown() {
  isDropdownOpen.value = true
}

function closeDropdown() {
  isDropdownOpen.value = false
  syncSearchWithModel()
}

function onInput(e: Event) {
  search.value = (e.target as HTMLInputElement).value
  if (!isDropdownOpen.value) openDropdown()
}

function select(val: string | number | null) {
  emit('update:modelValue', val)
  isDropdownOpen.value = false
}

function syncSearchWithModel() {
  const selected = props.items.find((item) => item[props.keyProp] === props.modelValue)
  search.value = selected ? String(selected[props.valueProp]) : ''
}

// При смене внешнего modelValue обновляем поиск
watch(() => props.modelValue, syncSearchWithModel, { immediate: true })

// Директива для клика вне компонента (в Vue 3 можно через useClickOutside или реализовать самостоятельно)
const root = ref(null)
onClickOutside(root, closeDropdown)
</script>

<style lang="scss" scoped>
@use 'sass:color';

.select-single {
  position: relative;
  width: 100%;
  max-width: 300px;
  user-select: none;
}

.search {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline-offset: 2px;
  transition: border-color 0.15s ease-in-out;
}

.search:focus {
  border-color: $color-brand;
  outline: none;
}

.dropdown {
  position: absolute;
  width: 100%;
  max-height: 240px;
  margin-top: 2px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: white;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
  overflow-y: auto;
  z-index: 10;
}

.option {
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.option.selected {
  background-color: $color-brand;
  color: white;
  font-weight: 600;
}

.option:hover {
  background-color: color.scale($color-brand, $lightness: 40%);
}

.no-results {
  padding: 8px 12px;
  color: #999;
  font-style: italic;
}
</style>
