import mongoose from 'mongoose';
import dotenv from 'dotenv';

mongoose.Promise = global.Promise;
dotenv.config();
try {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (e) {
  mongoose.createConnection(process.env.MONGO_URL);
}

mongoose.connection
  .once('open', () => { console.log('Mongo database running ....'); })
  .on('error', e => {
    throw e;
  });
