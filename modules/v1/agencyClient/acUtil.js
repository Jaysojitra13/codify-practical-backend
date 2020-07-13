const agencyModel = require('../../../models/agencyClient/agencyModel');

const {
    STANDARD,
    ERROR404
  } = require('../../../helper/constant');
const clientModel = require('../../../models/agencyClient/clientModel');

const acUtils = {};

acUtils.checkAgencyExist = async (agencyId) => {
    try {
        const agencyData = await agencyModel.findById(agencyId);
        if (agencyData) {
            return true;
        } else {
            throw new Error('Agency Not Found.')
        }
    } catch (err) {
        throw err;
    }
};

acUtils.getAgencyClientData = async () => {
    try {
        const result = await agencyModel.aggregate([
            {
                $lookup: {
                    from: 'clients',
                    localField: '_id',
                    foreignField: 'agencyId',
                    as: 'clientData'
                }
            },
            {
                $project: {
                    _id : 1,
                    name: 1,
                    address1: 1,
                    address2: 1,
                    city: 1,
                    state: 1,
                    phoneNumber: 1,
                    maxBillAmount: { $max: "$clientData.totalBill" },
                    clients : {
                        $filter: {
                            input: "$clientData",
                            as: "data",
                            cond: {
                                $eq: ["$$data.totalBill", {$max: "$clientData.totalBill"}]
                            }
                        }
                    }
                }
            },
            {
                $group : 
                {
                    _id: "$maxBillAmount",
                    data: { $push : { agencyId: "$_id", agencyName: "$name", clientName: "$clients.name" }}
                }  
            },
            {
                $sort: { _id : -1}
            },
            {
                $limit: 1
            }
        ]);

        return result.length ? { maxBillAmount: result[0]._id, data: result[0].data} : {};

    } catch (err) {
        throw err;
    }
};

acUtils.updateClient = async (clientId, data) => {
    try {
        const updatedClient = await clientModel.findOneAndUpdate({ _id: clientId }, { $set: data }, {new: true} );
        return updatedClient;
    } catch (err) {
        throw err;
    }
}

acUtils.checkAgencyName = async (agencyName) => {
    try {
        const agencyData = await agencyModel.find({ name: agencyName });
        if (agencyData) {
            return agencyData[0];
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
};

module.exports = acUtils;