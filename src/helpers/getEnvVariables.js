export const getEnvVariables = () => {
  const env = import.meta.env;
  return {
    REACT_APP_API_URL: env.VITE_API_URL
  };
};
