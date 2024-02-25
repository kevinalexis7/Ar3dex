const { existsSync, unlinkSync } = require("fs");
const db=require('../../database/models');

module.exports = (req, res) => {
    const mainImage = req.files.mainImage;
    const images = req.files.images;

    const {
    name,
    price ,
    categoryId, 
    description, 
    offer,
    discount
    } = req.body

    const {id} = req.params

    db.Product.findByPk(id,{
        include : ['images']
    }).then(()=>{
        if(images){
            existsSync("public/images/" + product.images) &&
            unlinkSync("public/images/" + product.images) 
        }

        db.Product.update(
            {
                name: name.trim(),
                price,
                description : description.trim(),
                offer,
                discount,
                mainImage : mainImage ? mainImage[0].filename : null,
                categoryId
            },
            {
                where :{
                    id,
                }
            },
        ).then((product)=>{
            if (images) {
                product.images.forEach((image) => {
                  existsSync("public/images/" + image.file) &&
                    unlinkSync("public/images/" + image.file);
                });

                db.Image.destroy({
                    where : {
                        id_product : id
                    }
                  }).then(() => {
                    const imagesDB = images.map(image => {
                        return {
                            file: image.filename,
                            id_product : product.id
                        }
                    }) 
    
                    db.Image.bulkCreate(imagesDB, {
                        validate : true
                    }).then(result => {
                        console.log(result);
                        return res.redirect("/admin");
                    })
                  })
            }else {
                // return res.send(id)
                return res.redirect("/admin");

            }       
        });
    }).catch(error => console.log(error));
    db.Category.findAll({
        order: [['name']]
    })
        .then(categories => {
          return res.render("products/product-add", {
            errors: errors.mapped(),
            old: req.body,
            categories,
        });
    })
    .catch(error => console.log(error))
}
