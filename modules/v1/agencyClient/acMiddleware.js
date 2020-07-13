const _v = require('../../../helper/validate');
const acValidator = require('./acValidator');
const agencyModel = require('../../../models/agencyClient/agencyModel');
const clientModel = require('../../../models/agencyClient/clientModel');

const acMiddelware = {};

const {
    ERROR400,
    ERROR422
  } = require('../../../helper/constant');


acMiddelware.validateInput = (validationType) => { 
    return function (req, res, next) {
        
        const body = req.body;
        const validators = acValidator.getValidator(req, validationType);

        if (validationType === 'create') {
            let message = '';
            let isError = false;
            for (let b in body) {
                const error = _v.validate(body[b], validators[b]);
                if (error) {
                    isError = true;
                    message = error;
                    break;
                }
            }
            if (isError) {
                return res.status(ERROR422.CODE).json({
                    message
                });
            }
            next();
        } else {
            const error = _v.validate(req.body, validators);
            if (error) {
                return res.status(ERROR422.CODE).json({
                    message: error
                });
            }
            next();
        }

    };
};

acMiddelware.checkAgencyExist = async (req, res, next) => {
    try {
        const { agencyId } = req.body;

        const agencyData = await agencyModel.findById(agencyId);

        if (agencyData) {
            next();
        } else {
            throw new Error('Agency not found.');
        }

    } catch (err) {
        return res.status(ERROR400.CODE).json({
            message: err.message,
        });
    }
};

acMiddelware.checkClientExist = async (req, res, next) => {
    try {
        const { _id } = req.body;

        const clientData = await clientModel.findById(_id);

        if (clientData) {
            next();
        } else {
            throw new Error('Client not found.');
        }

    } catch (err) {
        return res.status(ERROR400.CODE).json({
            message: err.message,
        });
    }
};

module.exports = acMiddelware;