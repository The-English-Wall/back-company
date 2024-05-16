import "dotenv/config"

import env from "env-var"

export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    NODE_ENV: env.get("NODE_ENV").required().asString(),
    // DB_URI: env.get("DB_URI").required().asString(),
    SECRET_JWD_SEED: env.get("SECRET_JWD_SEED").required().asString(),
    DB_USERNAME_COMPANY: env.get("DB_USERNAME_COMPANY").required().asString(),
    DB_HOST_COMPANY: env.get("DB_HOST_COMPANY").required().asString(),
    DB_PORT: env.get("DB_PORT").required().asString(),
    DB_PASSWORD_COMPANY: env.get("DB_PASSWORD_COMPANY").required().asString(),
    DB_NAME_COMPANY: env.get("DB_NAME_COMPANY").required().asString()
    // JWT_EXPIRE_IN: env.get("JWT_EXPIRE_IN").required().asString(),
}

