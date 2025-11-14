import dotenv from "dotenv"

dotenv.config()

interface Config {
    port: number;
    mongouri: string;
    accesstokensecret: string;
    accesstokenexpiry: string;
}

if (!process.env.MONGO_URI) {
    throw new Error("Missing required env variable: MONGO_URI")
}

if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("Missing required env variable: ACCESS_TOKEN_SECRET")
}

if (!process.env.ACCESS_TOKEN_EXPIRY) {
    throw new Error("Missing required env vatrable : ACCESS_TOKEN_EXPIRY")
}


export const config: Config = {
    port: Number(process.env.PORT) || 8000,
    mongouri: process.env.MONGO_URI as string,
    accesstokensecret: process.env.ACCESS_TOKEN_SECRET as string,
    accesstokenexpiry: process.env.ACCESS_TOKEN_EXPIRY as string,
}