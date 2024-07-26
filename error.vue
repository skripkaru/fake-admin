<script setup>
const router = useRouter()

useHead({
  title: 'Page not found'
})
</script>

<template>
  <div class="grid min-h-full place-items-center px-4 py-8">
    <div class="text-center">
      <p class="text-8xl font-medium mb-4">404</p>
      <h1 class="text-2xl lg:text-4xl mb-6">Page not found</h1>
      <p class="mb-8 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
      <el-button @click="router.push('/')">Go back home</el-button>
    </div>
  </div>
</template>

<style scoped>

</style>