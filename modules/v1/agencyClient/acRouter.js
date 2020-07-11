const express = require('express');
const acController = require('./acController');
const acMiddelware = require('./acMiddleware');
const {
  validationHandler,
} = require('../../../helper/validate');

const agencyRouter = express.Router();



agencyRouter.post('/create', acMiddelware.validateInput(), acController.create);

agencyRouter.get('/data', acController.agencyClientData);

const updateClientMiddleware = [
  acMiddelware.validateInput("updateClient"), 
  acMiddelware.checkAgencyExist,
  acMiddelware.checkClientExist, 
  acController.updateClient
];

agencyRouter.post('/update-client', updateClientMiddleware);

module.exports = agencyRouter;
