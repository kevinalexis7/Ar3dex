const { check, body } = require("express-validator");
// const { leerJSON } = require("../src/data");
const User=require('../database/models/user')
module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min : 2
        }).withMessage('Mínimo dos caracteres').bail()
        .isAlpha('es-ES', {ignore:' '}).withMessage('Sólo caracteres alfabéticos').bail(),
    check('surname')
        .notEmpty().withMessage('El apellido es obligatorio').bail()
        .isLength({
            min : 2
        }).withMessage('Mínimo dos caracteres').bail()
        .isAlpha('es-ES', {ignore:' '}).withMessage('Sólo caracteres alfabéticos').bail(),
    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('el Email tiene un formato inválido'),
        // .custom(async (value, { req }) => {
        //     const existingUser = await User.findOne({ email: value.trim() });
        //     const currentUser = req.session.userLogin ? await User.findById(req.session.userLogin.id) : null;
      
        //     console.log(currentUser);
      
        //     return !existingUser || (currentUser && currentUser.email === value.trim());
        // }).withMessage('El email ya se encuentra registrado'),
    check('street')
        .isLength({
        max : 25
        }).withMessage('Máximo 25 caracteres'),
    check('city')
        .isLength({
        max : 20
        }).withMessage('Máximo 20 caracteres'),
    check('province')
        .isLength({
        max : 20
        }).withMessage('Máximo 20 caracteres'),
]