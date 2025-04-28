import dotenv from "dotenv";

dotenv.config({
    path: ".env",
});

export default {
    PORT: process.env.PORT || 3000,
    URL_MONGO: process.env.URL_MONGO,
    FIRMA_COOKIE: process.env.FIRMA_COOKIE || "ClaveSecreta",
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY || "ClaveSecreta",
    JWT_EXPIRES_TIME_TOKEN: process.env.JWT_EXPIRES_TIME_TOKEN || "24hs",
};