<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: 'success' | 'danger' | 'warning' | 'info' | 'primary' | 'secondary'
  color?: string
}>()

const badgeClass = computed(() => {
  const base = 'outline-badge  px-3 py-1 fw-semibold'
  const typeClass = {
    success: 'badge-outline-success',
    danger: 'badge-outline-danger',
    warning: 'badge-outline-warning',
    info: 'badge-outline-info',
    primary: 'badge-outline-primary',
    secondary: 'badge-outline-secondary',
  }[props.type]
  return [base, typeClass, props.color ? `bg-${props.color}` : ''].join(' ')
})
</script>

<style scoped lang="scss">
.outline-badge {
  display: inline-block;
  border-radius: 16px;
  letter-spacing: 0.02em;
  font-weight: 100;
  font-size: 0.75rem;
  padding: 0.35em 1.1em;
  transition:
    background 0.18s,
    color 0.18s;
  user-select: none;
}
.badge-outline-success {
  color: #157347;
  border: 1.5px solid #51cf66;
  background: rgba(81, 207, 102, 0.13);
}
.badge-outline-danger {
  color: #b02a37;
  border: 1.5px solid #ff6b6b;
  background: rgba(255, 107, 107, 0.13);
}
.badge-outline-warning {
  color: #b68900;
  border: 1.5px solid #ffd43b;
  background: rgba(255, 212, 59, 0.16);
}
.badge-outline-info {
  color: #0b7285;
  border: 1.5px solid #63e6be;
  background: rgba(99, 230, 190, 0.13);
}
.badge-outline-primary {
  color: #2342a4;
  border: 1.5px solid #4dabf7;
  background: rgba(77, 171, 247, 0.13);
}
.badge-outline-secondary {
  color: #495057;
  border: 1.5px solid #ced4da;
  background: rgba(206, 212, 218, 0.13);
}
</style>
