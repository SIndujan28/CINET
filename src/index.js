/* eslint-disable no-console */
import express from 'express';
import middlewareConfig from './config/middlewares';
import './config/database';
import apiRoutes from './modules';

const app = express();

const PORT = process.env.PORT || 3000;

middlewareConfig(app);
app.get('/', (req, res) => {
  res.send('ola niggas watup');
});
apiRoutes(app);
app.listen(PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
        Death star deployed on port: ${PORT}
        ----------
        Running on ${process.env.NODE_ENV}
        ----------
        Waiting for the command sir!
         `);
  }
});
