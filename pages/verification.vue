<template>
  <div class="flex h-screen flex-col items-center justify-center bg-gray-900 text-white">
    <OtpAuthenticator
      v-model="verificationCode"
      @completed="submitOtp"
    />
    <p
      v-show="isLoading"
      class="mt-4"
    >
      loading...
    </p>
  </div>
</template>
<script setup lang="ts">
const verificationCode = ref(['', '', '', ''])
const isLoading = ref(false)

const submitOtp = async () => {
  const code = verificationCode.value.join('')
  console.log(code)
  // verificationCode.value
  // const res = await useApi().verify.otpVerify(({ code }))
  try {
    isLoading.value = true
    await $fetch('/api/verify', {
      method: 'POST',
      body: { code }
    })
  } catch (e) {
    alert('驗證碼輸入錯誤')
  } finally {
    isLoading.value = false
  }
}
</script>
