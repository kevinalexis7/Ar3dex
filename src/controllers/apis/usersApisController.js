const { getUserByEmail } = require("../../services/user")

const checkEmail = async (req,res) => {
    try {
        
        const user = await getUserByEmail(req.query.email)

        return res.status(200).json({
            ok : true,
            isRegisted : user ? true : false
        }) 
    } catch (error) {
        return res.status(error.status|| 500).json({
            ok: false,
            msg: error.message || 'Upss, rompiste todito, ;('
        })
    }
}

module.exports = {
    checkEmail
}