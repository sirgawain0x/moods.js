import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const login = () => {
    const params = new URLSearchParams({
      scope: "write",
      api_key: "2dc08a0185c0fc463adfe83a923e5a4210a90a43",
      apiSecret: `${process.env.AUDIUS_API_SECRET}`,
      redirect_uri: `${window.location.origin}/callback`,
      origin: window.location.origin,
      state: "SuperDupperSecretState",
      response_mode: "query",
    });
    window.location.href = `https://audius.co/oauth/auth?${params.toString()}`;
  };

  const handleCallback = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    if (code) {
      const { data } = await axios.post(
        "https://discoveryprovider.audius.co/v1/users/access_token",
        {
          code,
          client_id: config.public.audiusClientId,
          client_secret: config.public.audiusClientSecret,
          grant_type: "authorization_code",
        }
      );
      return data.user;
    }
    return null;
  };

  const logout = () => {
    // Implement logout logic here
  };

  return {
    provide: {
      auth: {
        login,
        handleCallback,
        logout,
      },
    },
  };
});
