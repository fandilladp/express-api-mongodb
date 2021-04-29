const express = require('express');
const router = express.Router();
const DataMahasiswa = require('../models/DataMahasiswa');
const verifyToken = require('../configs/verifyToken');

//CREATE
router.post('/', verifyToken, async (req, res)=>{
    const dataMahasiswaPost = new DataMahasiswa({
        nama: req.body.nama,
        nim: req.body.nim
    })

    try {
        const dataMahasiswa = await dataMahasiswaPost.save();
        res.json(dataMahasiswa);

    } catch (error) {
     res.json([{mesagge: error}])   
    }

});

//READ
router.get('/',verifyToken, async (req, res)=>{
    try {
        const dataMahasiswa = await DataMahasiswa.find();
        res.json(dataMahasiswa);
    } catch (error) {
        res.json({message: error})
    }
})

//UPDATE
router.put('/:idmhs', verifyToken, async(req, res) =>{
    try {
        const dataMahasiswaUpdate = await DataMahasiswa.updateOne({_id: req.params.idmhs}, {
            nama: req.body.nama,
            nim: req.body.nim
        });
        res.json(dataMahasiswaUpdate)
    } catch (error) {
        res.json({message: error})
    }
})

//DELETE
router.delete('/:idmhs', verifyToken, async (req, res) =>{
    try {
        const dataMahasiwaDelete = await DataMahasiswa.deleteOne({_id: req.params.idmhs});
        res.json('succes')
    } catch (error) {
        res.json({message: error})
    }
})

//FindId
router.get('/:idmhs', async (req, res) =>{
    try {
        const dataMahasiwaId = await DataMahasiswa.findById({_id: req.params.idmhs});
        res.json(dataMahasiwaId)
    } catch (error) {
        res.json({message: error})
    }
})

module.exports = router;