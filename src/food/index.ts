import loadConfig, { Config } from "../config";

export const getFood = ((): string => {
    const config: Config = loadConfig();
    return config.FOOD[Math.floor(Math.random() * config.FOOD.length)].trim();
})

