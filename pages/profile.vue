<template>
  <div class="flex items-center rounded-lg bg-gray-800 p-4 text-white shadow-md">
    <img
      :src="userInfo?.photo"
      alt="User Photo"
      class="mr-4 size-24 rounded-full"
    >
    <div class="flex flex-col">
      <blockquote class="mb-2 text-lg italic">
        "{{ userInfo?.quote }}"
      </blockquote>
      <h2 class="text-xl font-bold">
        {{ userInfo?.username }}
      </h2>
      <button
        class="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        @click="logout"
      >
        登出
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">

interface UserInfo {
  username: string
  quote: string
  photo: string
}

const userInfo = ref<UserInfo>()

onBeforeMount(() => {
  getUserProfile()
})

const getUserProfile = async () => {
  try {
    const { data } = await useApi().verify.getUserInfo()
    userInfo.value = data
  } catch (e) {
    alert('請重新輸入驗證碼')
    navigateTo('/verification', { external: true })
  }
}

const logout = async () => {
  localStorage.removeItem('token')
  navigateTo('/verification')
}

</script>
