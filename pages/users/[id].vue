<script setup lang="ts">
import {useUserService} from "~/services/users";

const router = useRouter()
const route = useRoute()
const userId = route.params.id as string

const {getUserById} = useUserService()

const {data: user, pending} = useAsyncData('user', () => getUserById(userId), {
  lazy: true
})

useHead({
  title: () => user.value?.firstName as string,
})
</script>

<template>
  <div v-loading="pending" class="container mx-auto">
    <el-page-header @back="router.back()" class="mb-4">
      <template #content>
        <h1 class="text-base lg:text-lg">{{`${user?.firstName} ${user?.lastName} ${user?.maidenName}` || 'Unknown user'}}</h1>
      </template>
    </el-page-header>

    <el-empty v-if="!user" description="User not found">
      <el-button @click="router.push('/users')">Go to users</el-button>
    </el-empty>

    <el-descriptions v-else :column="1" border>
      <el-descriptions-item label="Name">{{user.firstName}} {{user.lastName}} {{user.maidenName}}</el-descriptions-item>
      <el-descriptions-item label="Gender">{{user.gender}}</el-descriptions-item>
      <el-descriptions-item label="Age">{{user.age}}</el-descriptions-item>
      <el-descriptions-item label="Phone">{{user.phone}}</el-descriptions-item>
      <el-descriptions-item label="Email">{{user.email}}</el-descriptions-item>
      <el-descriptions-item label="IP">{{user.ip}}</el-descriptions-item>
      <el-descriptions-item label="Company">
        {{user.company.name}}
      </el-descriptions-item>
      <el-descriptions-item label="Address">
        {{user.address.postalCode}}, {{user.address.country}}, {{user.address.city}}, {{user.address.state}}, {{user.address.address}}
      </el-descriptions-item>
      <el-descriptions-item label="Role">
        <el-tag size="small">{{user.role}}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped>

</style>