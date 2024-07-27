import {defineStore} from 'pinia';
import type {User} from "~/interfaces/user";
import {useUserService} from "~/services/user";
import {useDebounce} from "@vueuse/core";

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
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const filters = ref<{ key: string; value: string }[]>([
    {key: 'role', value: '' as string},
    // {key: 'hair.color', value: '' as string},
  ])

  const fetchUsers = async () => {
    pending.value = true
    error.value = null
    try {
      // Инициализация параметров запроса
      const initParams = {
        limit: limit.value,
        skip: (page.value - 1) * limit.value,
        sortBy: sortBy.value,
        order: order.value,
      }

      // Формирование параметров фильтрации
      const filterParams = filters.value.reduce((params, filter) => {
        if (filter.value) {
          params.key = filter.key
          params.value = filter.value
        }
        return params
      }, {} as { key: string, value: string })

      // Формирование параметров запроса
      const params = {
        ...initParams,
        ...(debouncedSearchQuery.value ? { q: debouncedSearchQuery.value } : {}),
        ...filterParams,
      }

      // Выбор метода для вызова API
      const response = debouncedSearchQuery.value
        ? await searchUsers(params)
        : await (Object.keys(filterParams).length ? filterUsers(params) : getUsers(params))

      // Обновление состояния
      users.value = response.users
      total.value = response.total

      return response
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const changePage = (newPage: number) => {
    page.value = newPage
  }

  watch([page, sortBy, order, debouncedSearchQuery, filters], fetchUsers)

  return {
    pending,
    users,
    user,
    page,
    limit,
    total,
    sortBy,
    order,
    debouncedSearchQuery,
    filters,
    fetchUsers,
    changePage
  }
})