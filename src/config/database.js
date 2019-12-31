import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

try {
  mongoose.connect('', {});
} catch (e) {
  mongoose.createConnection();
}

mongoose.connection
  .once('open', () => { console.log('Mongo database running ....'); })
  .on('error', e => {
    throw e;
  });
