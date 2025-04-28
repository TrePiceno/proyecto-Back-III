import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import sessionRouter from './routes/session.router.js';
import config from './config/config.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';


const PORT = config.PORT;
const FIRMA_COOKIE = config.FIRMA_COOKIE;
const URL_MONGO = config.URL_MONGO;

console.log('FIRMA_COOKIE:', FIRMA_COOKIE);
console.log('URL_MONGO:', URL_MONGO);
console.log('PORT:', PORT);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(FIRMA_COOKIE));

//Configuramos passport
initializePassport();
app.use(passport.initialize());

app.use("/api/session", sessionRouter);

mongoose.connect(URL_MONGO).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});