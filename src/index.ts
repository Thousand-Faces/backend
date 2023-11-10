import "reflect-metadata";
import * as dotenv from "dotenv";
import { container } from "./inversify.config";
import { App } from "./app";
import { connect } from "mongoose";
const { createAgent } = require('@forestadmin/agent');
const { createMongooseDataSource } = require('@forestadmin/datasource-mongoose');
const mongoose = require('mongoose');
import 'reflect-metadata';
// initialize configuration
dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;
const application = container.get<App>(App);

// Create your Forest Admin agent
// This must be called BEFORE all other middleware on the app
createAgent({
  authSecret: process.env.FOREST_AUTH_SECRET,
  envSecret: process.env.FOREST_ENV_SECRET,
  isProduction: process.env.NODE_ENV === 'production',

})
  // Create your Mongoose datasource
  .addDataSource(createMongooseDataSource(mongoose.connection, { flattenMode: 'none' }))
  // Replace "myExpressApp" by your Express application
  .mountOnExpress(application.app)
  .start();

application.app.listen(PORT, async () => {
  try {
      const db = await connect(process.env.DB_URI || '', {
        keepAlive: true,
        keepAliveInitialDelay: 300000,
      })
      .then(() => {
        console.log('Connected to MongoDB');
        // Start your server or perform other actions
      })
      .catch((error: any) => {
        console.error('Error connecting to MongoDB:', error);
      });

      // await db.connection.db.dropDatabase();

  } catch (error) {
    console.error("Could not connect to mongoose!");
  }
});
