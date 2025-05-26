import dotenv from 'dotenv';

dotenv.config({
    path: ".env",
});

const corsEnv = process.env.DEV_ORIGINS;

const allowedOrigins = [
  corsEnv
];

console.log(corsEnv)

const corsOptions = {
  origin: function (origin, callback) {
    // Si el origen de la solicitud está en nuestra lista de orígenes permitidos
    // O si no hay origen (ej. para solicitudes de la misma máquina o Postman)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Permite la solicitud
    } else {
      callback(new Error('Not allowed by CORS')); // Deniega la solicitud
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
  credentials: true // Permite el envío de cookies o encabezados de autorización
};

export default corsOptions;
