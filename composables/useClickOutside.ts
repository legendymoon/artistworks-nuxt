import { onMounted, onUnmounted, Ref } from 'vue'

export function useClickOutside(targetRef: Ref<HTMLElement | null>, callback: () => void) {
  function onClick(event: MouseEvent) {
    if (targetRef.value && !targetRef.value.contains(event.target as Node)) {
      callback()
    }
  }

  onMounted(() => document.addEventListener('click', onClick))
  onUnmounted(() => document.removeEventListener('click', onClick))
}