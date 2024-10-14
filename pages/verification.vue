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

  try {
    isLoading.value = true
    const { data } = await useApi().verify.otpVerify({
      code
    })
    const token = data.token as string
    localStorage.setItem('token', token)
    navigateTo('/profile')
  } catch (e) {
    alert('驗證碼輸入錯誤')
    navigateTo('/verification', { external: true })
  } finally {
    isLoading.value = false
  }
}
</script>
