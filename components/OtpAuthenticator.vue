<template>
  <div class="flex flex-col items-center justify-center">
    <h2
      v-once
      class="mb-6 text-2xl"
    >
      Enter verification
    </h2>
    <div
      class="flex space-x-4"
      role="group"
      aria-labelledby="verification-label"
    >
      <input
        v-for="(digit, index) in modelValue"
        :key="index"
        :ref="el => inputRefs[index] = el as HTMLInputElement"
        :value="digit"
        maxlength="1"
        inputmode="numeric"
        pattern="[0-9]*"
        type="text"
        :autofocus="index === 0"
        :aria-label="`Digit ${index + 1}`"
        :class="[
          'h-20 w-14 rounded border bg-gray-800 text-center text-2xl focus:outline-none',
          isError ? 'border-red-500' : 'border-gray-700 focus:border-gray-500'
        ]"
        @paste="onPaste"
        @input="updateDigit(index, $event)"
        @keydown="onKeyDown($event)"
        @keydown.delete="onDelete(index)"
      >
    </div>
    <p
      v-if="isError"
      class="mt-2 text-red-500"
      role="alert"
    >
      Please enter all digits
    </p>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['completed'])

const ALLOWED_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']

type VerificationCode = string[]

const modelValue = defineModel<VerificationCode>({ default: () => [] })

const inputRefs = reactive<HTMLInputElement[]>([])

const isComplete = computed(() => modelValue.value.every(digit => digit !== ''))
const isError = computed(() => modelValue.value.some(digit => digit !== '') && !isComplete.value)

const updateDigit = (index: number, event: Event): void => {
  const target = event.target as HTMLInputElement
  const numericValue = target.value.replace(/[^0-9]/g, '')
  const newValue = [...modelValue.value]
  newValue[index] = numericValue
  modelValue.value = newValue

  if (index < modelValue.value.length - 1 && numericValue) {
    inputRefs[index + 1]?.focus()
  }
  if (index === modelValue.value.length - 1 && numericValue) {
    nextTick(() => {
      checkCompletion()
    })
  }
}

const checkCompletion = useDebounceFn((): void => {
  if (isComplete.value) {
    emit('completed')
  }
}, 1000)

const onKeyDown = (event: KeyboardEvent): void => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
    return
  }
  if (!/[0-9]/.test(event.key) && !ALLOWED_KEYS.includes(event.key)) {
    event.preventDefault()
  }
}

const onDelete = (index: number): void => {
  if (index > 0 && !modelValue.value[index]) {
    inputRefs[index - 1]?.focus()
  }
}

const onPaste = useThrottleFn(async () => {
  const clipboardText = await navigator.clipboard.readText()
  if (clipboardText) {
    const numericValue = clipboardText.replace(/[^0-9]/g, '').slice(0, modelValue.value.length)
    const newValue = [...numericValue.padEnd(modelValue.value.length, '')]
    newValue.forEach((value, index) => { modelValue.value[index] = value })
    nextTick(() => {
      checkCompletion()
    })

    const lastNonEmptyIndex = newValue.findLastIndex(digit => digit !== '')
    if (lastNonEmptyIndex !== -1) {
      inputRefs[lastNonEmptyIndex]?.focus()
    }
  }
}, 1000)

watch(() => modelValue.value, (newValue) => {
  if (newValue.length !== inputRefs.length) {
    inputRefs.length = newValue.length
  }
}, { immediate: true })

</script>
