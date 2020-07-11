/* eslint-disable arrow-body-style */
const express = require('express');
const path = require('path');

const router = express.Router();

const v = `../modules/${path.basename(__filename, '.js')}`;

router.use('/agency-client', require(`${v}/agencyClient/acRouter`));


router.all('/*', (req, res) => res.status(404).json({
  error: 'URL NOT FOUND',
}));

module.exports = router;
