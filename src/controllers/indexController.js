const {existsSync, readFileSync} = require('fs');
const { Op } = require("sequelize")
const db = require('../database/models')
const path = require('path');
const { leerJSON } = require('../data');



const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index: (req,res) => {

        const banners = db.Banner.findAll()
        const products = db.Product.findAll({
            where: {
                offer: true
            }
        })
        Promise.all([banners, products])
        .then(([banners,products]) => {
            return res.render('index', {
                bannerImages : banners.length ? banners : null,
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
            const banner = leerJSON("banner")

            const products = await db.Product.findAll({
                include: ['category']
            });
            return res.render('dashboard', {
                products,
                bannerImage : existsSync('public/images/banners/' + banner.file) ? banner.file : null,
                
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