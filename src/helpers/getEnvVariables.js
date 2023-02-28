
export const getEnvVariables = () => {
  const { REACT_APP_API_URL } = process.env;
  return {
    REACT_APP_API_URL
  };
};
