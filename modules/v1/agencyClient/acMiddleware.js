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
        const { type } = req.body;
        
        if (type) {
            const enumarr = ['agency', 'client'];
            if (enumarr.indexOf(type) >= 0) {
                let acValidators = {};
                const validators = acValidator.getValidator(req, type);
                acValidators = validators
        
                const error = _v.validate(req.body, acValidators);
                if (error) {
                    return res.status(ERROR422.CODE).json({
                        message: error
                    });
                }
                next();
            } else {
                return res.status(ERROR400.CODE).json({
                    message: "Value of the type must be 'agency' or 'client'"
                });
            }
        } else if (validationType) {
            let acValidators = {};
            const validators = acValidator.getValidator(req, validationType);
            acValidators = validators
    
            const error = _v.validate(req.body, acValidators);
            if (error) {
                return res.status(ERROR422.CODE).json({
                    message: error
                });
            }
            next();
        } else {
            return res.status(ERROR422.CODE).json({
                message: "Type is required"
            });
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