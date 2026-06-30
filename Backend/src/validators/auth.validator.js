import {body, validationResult} from "express-validator"

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    }

    const error = new Error(errors.array()[0].msg)
    error.statusCode = 422;
    return next(error);
}

export const registerValidation = [
    body("name").custom((value)=>{
        const nameRegex = /^[\p{L} .'-]+$/u;
        if(!nameRegex.test(value)){
            throw new Error("Please enter Valid Name");
        };
        return true;
    }).withMessage("Name must be string"),
    body("email").isEmail().withMessage("Please enter valid email address."),
    body("password").isStrongPassword().withMessage("Please Enter Valid password"),
    validate
]

export const loginValidation = [
    body("email").isEmail().withMessage("Please enter valid email address."),
    body("password").notEmpty().withMessage("Please Enter Valid Password"),
    validate
]
