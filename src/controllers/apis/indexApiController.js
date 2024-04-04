const {writeFileSync} = require('fs');


const changeBanner = async(req,res) => {
    try {
       
        if(!req.files.length){
            throw new Error('No hay imagen')
        }

        const objetBanner = {
            file : req.files[0].filename
        }


        writeFileSync('src/data/banner.json', JSON.stringify(objetBanner),'utf-8')
        

        return res.status(200).json({
            ok : true,
            msg : 'imagen modificada con éxito',
            file : req.files[0].filename
        })
    } catch (error) {
        return res.status(error.status|| 500).json({
            ok: false,
            msg: error.message || 'Upss, rompiste todito, ;('
        })
    }
}

module.exports = {
    changeBanner
}