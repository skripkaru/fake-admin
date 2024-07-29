import {defineStore} from 'pinia';
import type {User, UserParams} from "~/interfaces/user";
import {useUserService} from "~/services/user";
import {refDebounced} from "@vueuse/core";

export const useUserStore = defineStore('user', () => {
  const {getUsers, searchUsers, filterUsers} = useUserService()

  const pending = ref<boolean>(false)
  const error = ref<any>(null)
  const users = ref<User[]>([])
  const user = ref<User | null>(null)

  const page = ref<number>(1)
  const limit = ref<number>(20)
  const total = ref<number>(0)

  const sortBy = ref<string>('')
  const order = ref<string>('')

  const searchQuery = ref<string>('')
  const debouncedSearchQuery = refDebounced(searchQuery, 1000)

  const filters = ref<{ key: string; value: string }[]>([
    {key: 'role', value: '' as string},
  ])

  const fetchUsers = async () => {
    pending.value = true
    error.value = null
    try {
      let params: UserParams = {
        limit: limit.value,
        skip: (page.value - 1) * limit.value,
      }

      const filterParams = filters.value.reduce((params, filter) => {
        if (filter.value) {
          params.key = filter.key
          params.value = filter.value
        }
        return params
      }, {} as { key: string, value: string })

      let response

      if (sortBy.value && order.value) {
        params = {...params, sortBy: sortBy.value, order: order.value}
      }

      if (debouncedSearchQuery.value) {
        params = {...params, q: debouncedSearchQuery.value}
        response = await searchUsers(params)
      } else if (Object.keys(filterParams).length) {
        params = {...params, ...filterParams}
        response = await filterUsers(params)
      } else {
        response = await getUsers(params)
      }

      users.value = response.users
      total.value = response.total

      return response
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
      searchQuery.value = ''
    }
  }

  const changePage = (newPage: number) => {
    page.value = newPage
  }

  watch([page, sortBy, order, filters], fetchUsers)

  watch(debouncedSearchQuery, async (newDebouncedSearchQuery) => {
    if (newDebouncedSearchQuery !== '') {
      await fetchUsers()
    }
  })

  return {
    pending,
    users,
    user,
    page,
    limit,
    total,
    sortBy,
    order,
    searchQuery,
    filters,
    fetchUsers,
    changePage
  }
})