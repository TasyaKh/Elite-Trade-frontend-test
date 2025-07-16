<template>
  <div class="select-single" ref="root">
    <input
      type="text"
      v-model="search"
      class="search"
      placeholder="Поиск..."
      @focus="isDropdownOpen = true"
      @input="onInput"
      autocomplete="off"
    />
    <div v-if="isDropdownOpen && filteredItems.length" class="dropdown">
      <div
        v-for="item in filteredItems"
        :key="String(item[keyProp])"
        class="option"
        :class="{ selected: item[keyProp] === model }"
        @mousedown.prevent="select(item[keyProp])"
      >
        {{ item[valueProp] }}
      </div>
    </div>
    <div v-else-if="isDropdownOpen" class="no-results">Ничего не найдено</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

type itemValue = string | number | null
const model = defineModel<itemValue>()

const props = defineProps<{
  items: Record<string, itemValue>[]
  keyProp: string
  valueProp: string
}>()

const search = ref('')
const isDropdownOpen = ref(false)

const filteredItems = computed(() =>
  search.value.trim()
    ? props.items.filter((item) =>
        String(item[props.valueProp]).toLowerCase().includes(search.value.toLowerCase()),
      )
    : props.items,
)

function onInput(e: Event) {
  search.value = (e.target as HTMLInputElement).value
  if (!isDropdownOpen.value) isDropdownOpen.value = true
}

function select(val: itemValue) {
  model.value = val
  isDropdownOpen.value = false
}

function syncSearchWithModel() {
  const selected = props.items.find((item) => item[props.keyProp] === model.value)
  search.value = selected ? String(selected[props.valueProp]) : ''
}

watch(() => model.value, syncSearchWithModel, { immediate: true })

const root = ref(null)
onClickOutside(root, () => {
  isDropdownOpen.value = false
  syncSearchWithModel()
})
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
  z-index: 1000;
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
}
</style>
