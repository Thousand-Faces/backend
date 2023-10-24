import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
const mongoose = require('mongoose');
const cors = require('cors');

const { createAgent } = require('@forestadmin/agent');
const { createMongooseDataSource } = require('@forestadmin/datasource-mongoose');

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;


// Create your Forest Admin agent
// This must be called BEFORE all other middleware on the app
createAgent({
  authSecret: process.env.FOREST_AUTH_SECRET,
  envSecret: process.env.FOREST_ENV_SECRET,
  isProduction: process.env.NODE_ENV === 'production',

})
  // Create your Mongoose datasource
  .addDataSource(createMongooseDataSource(mongoose.connection))
  // Replace "myExpressApp" by your Express application
  .mountOnExpress(app)
  .start();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
let allowedOrigins = [/\.forestadmin\.com$/, /localhost:\d{4}$/, process.env.FRONT_URL];
if (process.env.CORS_ORIGINS) {
  allowedOrigins = allowedOrigins.concat(process.env.CORS_ORIGINS.split(','));
}
const corsConfig = {
  origin: allowedOrigins,
  allowedHeaders: ['Forest-Context-Url', 'Authorization', 'X-Requested-With', 'Content-Type'],
  methods: 'GET, POST, PUT, DELETE',
  maxAge: 86400, // NOTICE: 1 day
  credentials: true,
};
app.use(cors(corsConfig));

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start your server or perform other actions
})
.catch((error: any) => {
  console.error('Error connecting to MongoDB:', error);
});

// Running the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});