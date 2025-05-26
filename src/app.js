import express from 'express';
import cookieParser from 'cookie-parser';
import sessionRouter from './routes/session.router.js';
import userRouter from './routes/user.router.js';
import ProductRouter from './routes/product.router.js';
import config from './config/config.js';
import connectDB from './config/db.config.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import cors from 'cors'
import corsOptions from './config/cors.config.js';
import cartRouter from './routes/cart.router.js';

const app = express();
const connection = connectDB(config.URL_MONGO);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(config.FIRMA_COOKIE));

app.use(cors(corsOptions));

//Configuramos passport CLASE 06
initializePassport();
app.use(passport.initialize());

// Routers
app.use("/api/session", new sessionRouter().getRouter());
app.use("/api/user", new userRouter().getRouter());
app.use("/api/product", new ProductRouter().getRouter());
app.use("/api/cart", new cartRouter().getRouter());

app.listen(config.PORT, () => console.log(`Listening on PORT: ${config.PORT}`))