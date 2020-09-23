export const API = "API";

export const getEnvParams = (name, env = process.env.NODE_ENV) => {
  env = "_" + env.toUpperCase();
  const paramName = "REACT_APP_" + name + env;
  return process.env[paramName];
};
