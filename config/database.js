const mongoose = require('mongoose');
const logger = require('../helper/logger');

mongoose.connect(process.env.DBURL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
    logger.info('Suucessfully connected to DB ... ');  
});

mongoose.set('debug', false);

mongoose.connection.on('error', (err) => {
  logger.error(err);
  logger.info('Could not connect database server....');
});
