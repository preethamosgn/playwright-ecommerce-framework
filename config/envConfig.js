const environments = {
  qa: {
    baseURL: "https://www.saucedemo.com/",
  },
  stage: {
    baseURL: "https://www.saucedemo.com/",
  },
  prod: {
    baseURL: "https://www.saucedemo.com/",
  },
};

const env = process.env.ENV || "qa";

if (!environments[env]) {
  throw new Error(`Invalid ENV value: ${env}. Use qa, stage, or prod.`);
}

export default environments[env];
