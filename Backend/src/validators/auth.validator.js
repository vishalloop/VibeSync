import {body, validationResult} from "express-validator"

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    }

    const error = errors.array();
    error.statusCode = 404;
    return next(error);
}

export const registerValidation = [
    body("name").custom((value)=>{
        const nameRegex = /^[\p{L} .'-]+$/u;
        if(!nameRegex.test(value)){
            const error = "Please enter Valid Name";
            error.statusCode = 422;
            return next(error);
        };
        return true;
    }).withMessage("Name must be string"),
    body("email").isEmail().withMessage("Please enter valid email address."),
    body("password").isStrongPassword().withMessage("Please Enter Valid password"),
    validate
]

export const loginValidation = [
    body("email").isEmail().withMessage("Please enter valid email address."),
    body("password").isStrongPassword().withMessage("Please Enter Valid Email address"),
    validate
]
