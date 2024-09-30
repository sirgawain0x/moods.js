export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $auth } = useNuxtApp();

  try {
    // Check if the user has a valid access token or session
    const user = await $auth.handleCallback();

    if (!user) {
      // Redirect to the Audius login page if not authenticated
      return to.path.includes("/callback")
        ? navigateTo("/")
        : navigateTo("/callback");
    }

    // Provide user data (make sure to type 'user' correctly)
    provide("user", user);
  } catch (error) {
    console.error("Authentication error:", error);
    return navigateTo("/error");
  }
});
