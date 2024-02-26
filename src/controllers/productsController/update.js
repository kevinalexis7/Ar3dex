const { existsSync, unlinkSync } = require("fs");
const db = require('../../database/models');

module.exports = async (req, res) => {
    try {
        const mainImage = req.files.mainImage;
        const images = req.files.images;

        const {
            name,
            price,
            categoryId,
            description,
            offer,
            discount
        } = req.body;

        const { id } = req.params;

        const product = await db.Product.findByPk(id, {
            include: ['images']
        });

        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }

        if (images && images.length > 0) {
            for (const image of product.images) {
                existsSync("public/images/products/" + image.name) &&
                unlinkSync("public/images/products/" + image.name);
            }
            mainImage &&
                existsSync("public/images/products/" + mainImage.filename) &&
                unlinkSync("public/images/products/" + mainImage.filename);
            

            await db.Image.destroy({
                where: {
                    id_product: id
                }
            });

            const imagesDB = images.map(image => {
                return {
<<<<<<< HEAD
                    name: image.filename,
=======
                    name: image.name,
>>>>>>> 8723d93a3ae5753c4f954bcfd3d45b4da9f04094
                    id_product: product.id
                };
            });

            await db.Image.bulkCreate(imagesDB, {
                validate: true
            });
        }

        await db.Product.update(
            {
                name: name.trim(),
                price,
                description: description.trim(),
                offer: +offer,
                discount,
                mainImage: mainImage ? mainImage[0].filename : product.mainImage,
                categoryId
            },
            {
                where: {
                    id,
                }
            },
        );

        return res.redirect("/admin");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};
