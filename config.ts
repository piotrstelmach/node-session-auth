import dotenv from "dotenv";
import RedisStore from "connect-redis";
import {createClient} from "redis";

dotenv.config();

type globalConfig = {
    REDIS_PORT: string | undefined,
    REDIS_HOST: string | undefined,
    MYSQL_ROOT_PASSWORD: string | undefined,
    MYSQL_DATABASE: string | undefined,
    MYSQL_USER: string | undefined,
    MYSQL_PASSWORD: string | undefined,
    REDIS_SECRET: string,
}

export const globalConfig: globalConfig = {
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    REDIS_SECRET: process.env.REDIS_SECRET ?? '',
}

export const redisClient = createClient({
    url: `redis://${globalConfig.REDIS_HOST}:${globalConfig.REDIS_PORT}`
})
