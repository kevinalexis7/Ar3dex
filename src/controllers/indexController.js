const { Op } = require("sequelize")
const db = require('../database/models')



const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index: (req,res) => {

        db.Product.findAll({
            where: {
                offer: true
            }
        })
        .then(products => {
            return res.render('index', {
                products,
                toThousand
        })
        

        })
        .catch(error => console.log(error))
        
    },
    cart: (req,res) => {
        return res.render('productCart')
    },
    admin : async(req,res) => {
        try {
            const products = await db.Product.findAll({
                include: ['category']
            });
            return res.render('dashboard', {
                products,
                
            });
        } catch (error) {
            console.error(error);
        }
    },
    searchAdmin : (req,res) => {

        const {keyword} = req.query;
        db.Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.substring]: `%${keyword}%` } },
                    {
                        '$category.name$': { [Op.substring]: `%${keyword}%` }
                    }
                ]
            },
            include: ['category']
        })
            .then(result => {
                return res.render('dashboard', {
                    products : result,
                    keyword
                })
            })
            .catch(error => console.log(error))
    }
}