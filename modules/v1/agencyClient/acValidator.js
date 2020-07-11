const acValidator = {}

acValidator.getValidator = (req, type) => {
    const input = {
        agency: {
            type: ["notEmpty", "Type Field is required"],
            name: ["notEmpty", "Name Field is required"],
            state: ["notEmpty", "State Field is required"],
            address1: ["notEmpty", "Address1 Field is required"],
            city: ["notEmpty", "City Field is required"],
            phoneNumber: ["range", "Invalid Phone Number", [10]]
        },
        client: {
            type: ["notEmpty", "Type Field is required"],
            name: ["notEmpty", "Name Field is required"],
            agencyId: ["isMongoId", "agencyId should be mongodb Id"],
            email: ["isEmail", "Field is required"],
            totalBill: ["isNumber", "totalBill is required"],
            phoneNumber: ["range", "Invalid Phone Number", [10]]
        },
        updateClient: {
            _id: ["isMongoId", "_id should be mongodn Id"],
            name: ["notEmpty", "Name Field is required"],
            agencyId: ["isMongoId", "agencyId should be mongodb Id"],
            email: ["isEmail", "Field is required"],
            totalBill: ["isNumber", "totalBill is required"],
            phoneNumber: ["range", "Invalid Phone Number", [10]]
        },
    };

    return input[type];
};

module.exports = acValidator;