import {useAuthStore} from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  const { authenticated } = storeToRefs(authStore);
  const token = useCookie('token');

  if (token.value) {
    authenticated.value = true;
  }

  // if token exists and url is /auth redirect to homepage
  if (token.value && to?.name === 'login') {
    return navigateTo('/');
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== 'login'  && to?.name !== 'register') {
    abortNavigation();
    return navigateTo('/login');
  }
})