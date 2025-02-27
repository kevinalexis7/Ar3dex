const db = require("../../database/models");

const listBanner = async (req, res) => {
  try {
    const banners = await db.Banner.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    return res.status(200).json({
      ok: true,
      meta: {
        status: 200,
        total: banners.length,
        url: `${req.protocol}://${req.get("host")}/api/banners`,
      },
      data: banners,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "Upss, rompiste todito, ;(",
    });
  }
};

const addBanner = async (req, res) => {
  try {
    const newBanner = await db.Banner.create({
      name: req.body.name,
      file: req.files[0].filename,
      URL: req.body.URL,
    });

    return res.status(200).json({
      ok: true,
      meta: {
        status: 200,
        total: newBanner.length,
        url: `${req.protocol}://${req.get("host")}/api/banners`,
      },
      data: newBanner,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "No se pudo agregar banner",
    });
  }
};

const editBanner = async (req, res) => {
  try {
    const updatedBanner = await db.Banner.update(
      {
        name: req.body.name,
        file: req.files[0] ? req.files[0].filename : file,
        URL: req.body.URL,
      },
      {
        where: { id: req.body.id },
      }
    );

    return res.status(200).json({
      ok: true,
      meta: {
        status: 200,
        total: updatedBanner.length,
        url: `${req.protocol}://${req.get("host")}/api/banners`,
      },
      data: updatedBanner,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "No se pudo editar banner",
    });
  }
};

const deleteBanner = async (req, res) => {
  try {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", req.body.id);
    await db.Banner.destroy({
      where: { id : req.body.id },
    });
    return res.status(200).json({
      ok: true,
      meta: {
        status: 200,
        url: `${req.protocol}://${req.get("host")}/api/banners`,
      },
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      msg: error.message || "No se pudo eliminar banner",
    });
  }
};

module.exports = {
  listBanner,
  addBanner,
  editBanner,
  deleteBanner,
};

/* 
const lastBanner = leerJSON("banner") 
        const objetBanner = {
            file : req.files[0].filename
        }
        
        escribirJSON(objetBanner,"banner")
        
if(req.files){
    existsSync('public/images/banners/' + lastBanner.file) && unlinkSync('public/images/banners/' + lastBanner.file)
} 
 */
