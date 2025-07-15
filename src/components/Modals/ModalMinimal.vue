<template>
  <div>
    <slot name="button" :toggle="open" />

    <div v-if="visible" class="modal-overlay" @click.self="close">
      <div class="modal fade" tabindex="-1" :class="{ show: animateIn }" style="display: block">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="modal-header">
                <h5 class="modal-title">{{ title }}</h5>
                <button type="button" class="btn-close" @click="close" />
              </div>
              <div class="pt-4">
                <slot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{
  title?: string
  isOpen: boolean
}>()
const emit = defineEmits(['update:isOpen'])

const visible = ref(false)
const animateIn = ref(false)

watch(
  () => props.isOpen,
  async (val) => {
    if (val) {
      visible.value = true
      await nextTick()
      requestAnimationFrame(() => {
        animateIn.value = true
      })
    } else {
      animateIn.value = false
      setTimeout(() => {
        visible.value = false
      }, 150)
    }
  },
  { immediate: true },
)

function open() {
  emit('update:isOpen', true)
}
function close() {
  emit('update:isOpen', false)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  z-index: 101;
}
.modal-content {
  max-height: 80vh;
  overflow: auto;
}
.modal-header {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;
}
</style>
