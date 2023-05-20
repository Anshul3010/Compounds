const { validationResult, checkSchema } = require("express-validator");

const compoundValidation = async (req,res,next) => {
    await checkSchema({
        name: {
            notEmpty: {
                errorMessage: 'Compound Must Have a Name'
            }
        },

        description: {
            notEmpty: {
                errorMessage: 'Compound Must Have a Description'
            }
        },
    },["body"]).run(req);
    rejectInvalid(req,res,next);

}


const rejectInvalid = (req,res,next) => {
    const err = validationResult(req).array();
    if(err && err.length) {
        return res.status(401).json({
            message: "Invalid request Body"
        })
    }
    return next(); 
}

module.exports = compoundValidation