const { check, body } = require("express-validator");
const {compareSync} = require('bcryptjs');

const db = require('../database/models')

module.exports = [
    check("email")
        .notEmpty().withMessage('El email es obligatorio'),
    body("password")
        .notEmpty().withMessage("La contraseña es obligatoria").bail()
        .custom((value, {req}) => {
            return db.User.findOne({
                where : {
                    email : req.body.email
                }
            }).then(user => {
                if(!user || !compareSync(value,user.password)) {
                    return Promise.reject()
                }
            }).catch(error => {
                console.log(error)
                return Promise.reject("credenciales inválidas")
            })
            
        }).withMessage('Credenciales inválidas')

]