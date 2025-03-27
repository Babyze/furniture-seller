interface EnvConfig {
  api: {
    url: string;
    timeout: number;
  };
  auth: {
    tokenKey: string;
    refreshTokenKey: string;
  };
}

const envConfig: EnvConfig = {
  api: {
    url: import.meta.env.VITE_API_URL ?? '',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 0),
  },
  auth: {
    tokenKey: import.meta.env.VITE_TOKEN_KEY ?? '',
    refreshTokenKey: import.meta.env.VITE_REFRESH_TOKEN_KEY ?? '',
  },
};

export default envConfig;
