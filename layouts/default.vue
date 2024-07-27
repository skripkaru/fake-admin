<script setup lang="ts">
import {useAuthStore} from "~/store/auth";

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const {logUserOut} = authStore;
const {authenticated} = storeToRefs(authStore);

const logout = () => {
  logUserOut();
  router.push('/login');
};

const currentRoute = computed(() => route.path);

const isCollapse = ref<boolean>(false)

const toggleCollapse = () => isCollapse.value = !isCollapse.value

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
    <el-aside v-if="authenticated" :class="{'collapsed': isCollapse}" width="auto">
      <el-menu class="h-full" :collapse="isCollapse" :router="true" :collapse-transition="false" :default-active="currentRoute">
        <el-menu-item index="/" :route="{ path: '/'}">
          <div class="i-ph:grid-four-light h-6 w-6 shrink-0"></div>
          <template #title>Dashboard</template>
        </el-menu-item>
        <el-menu-item index="/users" :route="{ path: '/users'}">
          <div class="i-ph:user-light h-6 w-6 shrink-0"></div>
          <template #title>Users</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header v-if="authenticated" class="sticky top-0 z-10 w-full py-4 border-b border-gray-200 bg-white">
        <div class="h-full container mx-auto">
          <div class="w-full h-full flex items-center justify-between">
            <el-button @click="toggleCollapse" link>
              <div class="i-ph:queue-light h-6 w-6"></div>
            </el-button>
            <div class="flex items-center gap-3">
              <el-button link @click="logout">
                <div class="i-ph:sign-out-light h-6 w-6"></div>
              </el-button>
            </div>
          </div>
        </div>
      </el-header>
      <el-main>
        <nuxt-page></nuxt-page>
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
html,
body,
#__nuxt {
  height: 100%;
}

.el-menu-item {
  gap: 8px;
}
</style>