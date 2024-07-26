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

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  bodyAttrs: {
    class: ' font-sans text-gray-900',
  }
})


console.log('route', route)
console.log('router', router.getRoutes())

const isCollapse = ref<boolean>(false)
</script>

<template>
  <el-container class="h-full">
    <el-aside v-if="authenticated" :class="{'collapsed': isCollapse}">
      <el-menu class="h-full" :collapse="isCollapse" :router="true" :default-active="route.path">
        <el-menu-item index="/" :route="{ name: 'index'}">
          <div class="i-ph:grid-four-light h-6 w-6 shrink-0"></div>
          <template #title>Dashboard</template>
        </el-menu-item>
        <el-menu-item index="/users" :route="{ name: 'users'}">
          <div class="i-ph:user-light h-6 w-6 shrink-0"></div>
          <template #title>Users</template>
        </el-menu-item>
      </el-menu>


      <!--      <div class="flex flex-col items-start gap-8">-->
      <!--        <nuxt-link to="/" class="font-semibold text-lg sm:text-xl">-->
      <!--          Fake Admin-->
      <!--        </nuxt-link>-->
      <!--        <el-button v-if="authenticated" @click="router.push('/')" link>-->
      <!--          Dashboard-->
      <!--        </el-button>-->
      <!--        <el-button v-if="authenticated" @click="router.push('/users')" link>-->
      <!--          Users-->
      <!--        </el-button>-->
      <!--      </div>-->
    </el-aside>
    <el-container>
      <el-header v-if="authenticated" class="sticky top-0 z-10 w-full py-4 border-b border-gray-200 bg-white">
        <div class="h-full container mx-auto">
          <div class="w-full h-full flex items-center justify-between">
            <el-button @click="isCollapse = !isCollapse" link>
              <div class="i-ph:queue-light h-6 w-6"></div>
            </el-button>
            <div class="flex items-center gap-3">
              <el-button v-if="authenticated" link @click="logout">
                <div class="i-ph:sign-out-light h-6 w-6"></div>
              </el-button>
            </div>
          </div>
        </div>
      </el-header>
      <el-main class="!overflow-initial">
        <slot></slot>
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

.el-button + .el-button {
  margin-left: 0;
}

.el-aside {
  transition: var(--el-transition-all);
}

.el-aside.collapsed {
  width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2);
}

.el-menu-item {
  gap: 8px;
}
</style>