const agencyModel = require('../../../models/agencyClient/agencyModel');
const clientModel = require('../../../models/agencyClient/clientModel');
const acUtil = require('./acUtil');
const {
  STANDARD,
  ERROR404,
  ERROR400
} = require('../../../helper/constant');
const acUtils = require('./acUtil');

const acController = {};

acController.create = async (req, res) => {
    try {

        const { 
            type,
            name,
            state,
            address1,
            city,
            phoneNumber,
            address2,
            agencyId,
            email,
            totalBill
        } = req.body;

        let objToSave = {};

        if (type === 'agency') {
            objToSave = {
                name,
                state,
                address1,
                address2: address2 || '',
                city,
                phoneNumber
            };

            const agencyData = new agencyModel(objToSave);
            const result = await agencyData.save();
            return res.status(STANDARD.CREATED).json({
                message: "Agency created successfully!",
                data: result
              });
        }

        if (type === 'client') {
            objToSave = {
                name,
                agencyId,
                email,
                totalBill,
                phoneNumber
            };

            const checkAgency = await acUtil.checkAgencyExist(agencyId);

            const clientData = new clientModel(objToSave);
            const result = await clientData.save();
            return res.status(STANDARD.CREATED).json({
                message: "Client created successfully!",
                data: result
              });
        }
    } catch (err) {
        return res.status(ERROR404.CODE).json({
            message: err.message,
        });
    }
};


acController.agencyClientData = async (req, res) => {
    try {

        const result = await acUtils.getAgencyClientData();

        return res.status(STANDARD.SUCCESS).json({
            result
        });
    } catch (err) {
        return res.status(ERROR400.CODE).json({
            message: err.message,
        });
    }
};

acController.updateClient = async (req, res) => {
    try {
        const { _id, name, email, agencyId, totalBill, phoneNumber } = req.body;

        const objToUpdate = {
            name,
            email,
            agencyId,
            totalBill,
            phoneNumber
        };
        const result =  await acUtils.updateClient(_id , objToUpdate);

        return res.status(STANDARD.SUCCESS).json({
            result
        });
    } catch (err) {
        return res.status(ERROR400.CODE).json({
            message: err.message,
        });
    }
};
module.exports = acController;