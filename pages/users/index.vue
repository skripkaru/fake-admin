<script setup lang="ts">
import {useUserStore} from "~/store/user";

const router = useRouter()
const userStore = useUserStore()
const {fetchUsers, changePage} = userStore
const {pending, users, page, limit, total, debouncedSearchQuery, sortBy, order, filters} = storeToRefs(userStore)

const showFilters = ref<boolean>(false)
const sortOption = ref<string>('')
const selectedFilters = ref<{ role?: string }>({})

const sortOptions = [
  {value: 'firstName_asc', label: 'Name ↑'},
  {value: 'firstName_desc', label: 'Name ↓'},
  {value: 'email_asc', label: 'Email ↑'},
  {value: 'email_desc', label: 'Email ↓'},
]

const roles = ref([
  {label: 'Admin', value: 'admin'},
  {label: 'Moderator', value: 'moderator'},
  {label: 'User', value: 'user'},
])

const openFilters = () => showFilters.value = true

const closeFilters = () => showFilters.value = false

const applyFilters = () => {
  filters.value = [{key: 'role', value: selectedFilters.value.role || ''}]
  closeFilters()
}

const resetFilters = () => {
  selectedFilters.value.role = ''
  filters.value = [{key: 'role', value: ''}]
  closeFilters()
}

watch(sortOption, (newSortOption) => {
  const [field, direction] = newSortOption.split('_')
  sortBy.value = field
  order.value = direction
})

useAsyncData('users', fetchUsers, {
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
      <template #extra>
        <div class="flex items-center gap-2">
          <el-button @click="openFilters" link>
            <div class="i-ph:funnel-light w-6 h-6"></div>
          </el-button>
        </div>
      </template>
    </el-page-header>

    <div class="grid grid-cols-1 sm:grid-cols-[1fr_120px] gap-4 mb-4">
      <el-input v-model="debouncedSearchQuery" placeholder="Search"/>

      <el-select v-model="sortOption" placeholder="Sort By">
        <el-option v-for="option in sortOptions" :key="option.value" :label="option.label" :value="option.value"/>
      </el-select>
    </div>

    <el-empty v-if="!users" description="Users not found">
      <el-button @click="router.push('/')">Go to dashboard</el-button>
    </el-empty>
    <template v-else>
      <el-table :data="users" class="w-full mb-4">
        <el-table-column prop="id" label="Id" width="60"/>
        <el-table-column label="Image" width="80">
          <template #default="scope">
            <el-button @click="router.push(`/users/${scope.row.id}`)" link>
              <el-avatar :size="32" :src="scope.row.image"/>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="Name" width="320">
          <template #default="scope">
            <el-button @click="router.push(`/users/${scope.row.id}`)" type="primary" link>
              {{ scope.row.firstName }} {{ scope.row.lastName }} {{ scope.row.maidenName }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="Email" width="320"/>
        <el-table-column prop="phone" label="Phone" width="280"/>
        <el-table-column prop="ip" label="IP" width="280"/>
        <el-table-column label="Role" width="160">
          <template #default="scope">
            <el-tag
              :type="scope.row.role === 'admin' ? 'primary' : scope.row.role === 'moderator' ? 'success' : 'info'"
              size="small"
            >
              {{ scope.row.role }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="prev, pager, next"
        :current-page="page"
        :page-size="limit"
        :total="total"
        @current-change="changePage"
        hide-on-single-page
      />

      <el-drawer v-model="showFilters" title="Filters" class="!w-full !sm:w-1/2 !lg:w-1/3">
        <div class="grid gap-4">
          <div>
            <p class="mb-2">Roles</p>
            <el-radio-group v-model="selectedFilters.role" class="w-full flex flex-col !items-start">
              <el-radio
                v-for="role in roles"
                :key="role.value"
                :label="role.label"
                :value="role.value"
              />
            </el-radio-group>
          </div>
        </div>

        <template #footer>
          <div class="flex items-center justify-between gap-2">
            <el-button @click="resetFilters">Reset</el-button>
            <el-button type="primary" @click="applyFilters">Apply</el-button>
          </div>
        </template>
      </el-drawer>
    </template>
  </div>
</template>

<style scoped>

</style>