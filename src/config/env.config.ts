interface EnvConfig {
  api: {
    url: string;
    imageUrl: string;
    timeout: number;
  };
  auth: {
    tokenKey: string;
    refreshTokenKey: string;
    userKey: string;
  };
}

const envConfig: EnvConfig = {
  api: {
    url: import.meta.env.VITE_API_URL ?? '',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 0),
    imageUrl: import.meta.env.VITE_IMAGE_URL ?? '',
  },
  auth: {
    tokenKey: import.meta.env.VITE_TOKEN_KEY ?? '',
    refreshTokenKey: import.meta.env.VITE_REFRESH_TOKEN_KEY ?? '',
    userKey: import.meta.env.VITE_USER_KEY ?? '',
  },
};

export default envConfig;
