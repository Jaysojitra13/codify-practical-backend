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

        const { agencyDetails, clientDetails } = req.body;

        let agency;
        const agencyNameExist = await acUtils.checkAgencyName(agencyDetails.name);

        if (agencyNameExist) {
            agency = agencyNameExist;
        } else {
            const agencyData = new agencyModel(agencyDetails);
            agency = await agencyData.save();
        }

        const clientObj = {
            name: clientDetails.name,
            agencyId: agency._id,
            email: clientDetails.email,
            totalBill: clientDetails.totalBill,
            phoneNumber: clientDetails.phoneNumber
        };

        const clientData = new clientModel(clientObj);
        const client = await clientData.save();

        return res.status(STANDARD.CREATED).json({
            message: "success",
            data: { agencyDetails: agency, clientDetails: client }
        });
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