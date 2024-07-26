<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useAuthStore} from '~/store/auth';

const authStore = useAuthStore();
const {authenticateUser} = authStore;
const {authenticated} = storeToRefs(authStore);

const user = ref({
  username: 'emilys',
  password: 'emilyspass',
});
const router = useRouter();

const login = async () => {
  await authenticateUser(user.value);

  if (authenticated) {
    await router.push('/');
  }
};

useHead({
  title: 'Sign In',
})
</script>

<template>
  <div class="flex min-h-full flex-col justify-center container mx-auto">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 class="mb-8 text-2xl lg:text-4xl text-center">Sign in to your account</h1>
      <el-form label-position="top" label-width="auto">
        <el-form-item label="Username">
          <el-input
            v-model="user.username"
            type="text"
            placeholder="Enter your name"
          />
        </el-form-item>
        <el-form-item label="Password">
          <el-input
            v-model="user.password"
            type="password"
            placeholder="Enter your password"
          />
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" @click="login">Sign in</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>

</style>