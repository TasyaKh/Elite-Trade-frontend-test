<template>
  <div>
    <slot name="button" :toggle="open"> </slot>
    <div v-if="props.isOpen" class="modal-overlay" @click.self="close">
      <div class="modal fade show" tabindex="-1" style="display: block" v-if="props.isOpen">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="modal-header">
                <h5 class="modal-title">{{ title }}</h5>
                <button type="button" class="btn-close" @click="close"></button>
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
const props = defineProps<{
  title?: string
  isOpen: boolean
}>()
const emit = defineEmits(['update:isOpen'])

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
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  z-index: 1055;
}
</style>
