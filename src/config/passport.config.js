import passport from 'passport';
import jwt from 'passport-jwt';
import config from './config.js';

const PRIVATE_KEY = config.JWT_PRIVATE_KEY;

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies['tokenCookie'];
    }
    return token;
}


const initializePassport = () => {

    // Configuramos la estrategia de passport para JWT
    passport.use('current', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY,
    }, async (jwt_payload, done) => {
        try{
            return done(null, jwt_payload)
        }catch(error){
            done(error)
        }
    }))

}

export default initializePassport;