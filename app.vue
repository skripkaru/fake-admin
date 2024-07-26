<script setup lang="ts">

</script>

<template>
  <NuxtLoadingIndicator color="#9ca3af" :throttle="0"/>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>