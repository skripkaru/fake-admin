<script setup lang="ts">
import {useUserService} from "~/services/users";

const {getUsers} = useUserService()
const router = useRouter()

const {data: users, pending} = useAsyncData('users', async () => {
  const response = await getUsers({limit: 10})

  return response.users
}, {
  lazy: true
})

useHead({
  title: 'Users'
})
</script>

<template>
  <div v-loading="pending" class="container mx-auto">
    <el-page-header @back="router.back()" class="mb-4">
      <template #content>
        <h1 class="text-base lg:text-lg">Users</h1>
      </template>
    </el-page-header>

    <el-empty v-if="!users" description="Users not found">
      <el-button @click="router.push('/')">Go to dashboard</el-button>
    </el-empty>
    <el-table v-else :data="users">
      <el-table-column prop="id" label="Id" width="60"/>
      <el-table-column label="Image" width="80">
        <template #default="scope">
          <nuxt-link :to="`/users/${scope.row.id}`">
            <el-avatar :size="32" :src="scope.row.image"/>
          </nuxt-link>
        </template>
      </el-table-column>
      <el-table-column label="Name" width="320">
        <template #default="scope">
          <nuxt-link :to="`/users/${scope.row.id}`">
            {{ scope.row.firstName }} {{ scope.row.lastName }} {{ scope.row.maidenName }}
          </nuxt-link>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="Email" width="320"/>
      <el-table-column prop="phone" label="Phone" width="320"/>
      <el-table-column prop="ip" label="Ip" width="240"/>
      <el-table-column prop="role" label="Role" width="160"/>
    </el-table>
  </div>
</template>

<style scoped>

</style>