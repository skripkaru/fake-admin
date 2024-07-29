<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  bodyAttrs: {
    class: ' font-sans text-gray-900',
  }
})
</script>

<template>
  <el-container class="h-full">
    <el-container>
      <el-main>
        <slot/>
      </el-main>
      <el-footer class="w-full py-4">
        <div class="h-full container mx-auto">
          <div class="h-full flex items-center justify-center">
            <span class="text-xs text-gray-500">2024-Present © Fake Admin</span>
          </div>
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<style>

</style>