import {defineStore} from 'pinia';
import type {User} from "~/interfaces/user";
import {useAuthService} from "~/services/auth";

export const useAuthStore = defineStore('auth', () => {
  const {userLogin} = useAuthService();

  const authenticated = ref<boolean>(false);
  const pending = ref<boolean>(true)
  const error = ref<any>(null)

  const authenticateUser = async ({username, password}: { username: string, password: string }) => {
    try {
      const token = useCookie<User | null>('token');
      token.value = await userLogin(username, password)
      authenticated.value = true
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  };

  const logUserOut = () => {
    const token = useCookie('token');
    authenticated.value = false;
    token.value = null;
  };

  return {
    authenticated,
    error,
    authenticateUser,
    logUserOut,
  };
});
