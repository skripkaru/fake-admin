<script setup lang="ts">

</script>

<template>
  <div class="h-full">
    <nuxt-loading-indicator color="#9ca3af" :throttle="0"/>
    <nuxt-layout>
      <nuxt-page/>
    </nuxt-layout>
  </div>
</template>

<style>
html,
body,
#__nuxt {
  height: 100%;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>