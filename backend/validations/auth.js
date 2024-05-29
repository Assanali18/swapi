import {body} from 'express-validator';

export const registerValidation = [
    body('username', 'Fill username field').isLength({min:3}),
    body('password', 'Len of password should be >=5').isLength({min:5}),
];