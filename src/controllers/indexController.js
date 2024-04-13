const {existsSync, readFileSync} = require('fs');
const { Op } = require("sequelize")
const db = require('../database/models')
const path = require('path');



const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index: async (req,res) => {

        const banners = await db.Banner.findAll()
        const customBanner = banners.map(banner => {
            return {
                id: banner.id,
                name : banner.name,
                image : existsSync('public/images/banners/' + banner.file) ? banner.file : [],
                URL : banner.URL,
            }
        })
        const products = db.Product.findAll({
            where: {
                offer: true
            }
        })
        Promise.all([customBanner, products])
        .then(([customBanner,products]) => {
            return res.render('index', {
                banner : customBanner,
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

            const banners = await db.Banner.findAll()
            const customBanner = banners.map(banner => {
                return {
                    id: banner.id,
                    name : banner.name,
                    image : existsSync('public/images/banners/' + banner.file) ? banner.file : null,
                    URL : banner.URL,
                }
            })
            
            const products = await db.Product.findAll({
                include: ['category']
            });
            return res.render('dashboard', {
                products,
                banner : customBanner,
            });
        } catch (error) {
            console.error(error);
        }
    },
    searchAdmin : (req,res) => {

        const banner = leerJSON("banner")
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
                    keyword,
                    bannerImage : existsSync('public/images/banners/' + banner.file) ? banner.file : null,
                })
            })
            .catch(error => console.log(error))
    }
}