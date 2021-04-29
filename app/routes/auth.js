const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
//import validation
const {registerValidation} = require('../configs/validation');
const {loginValidation} = require('../configs/validation');
//import model
const DataUser = require('../models/User');
//import hash
const bcrypt = require('bcrypt');


//REGISTER
router.post('/register', async (req, res) =>{

    //validation joi / validation form sebelum masuk db
    const {error} = registerValidation(req.body);
    
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })

    //if email exist
    const emailExist = await DataUser.findOne({email: req.body.email})

    if(emailExist) return res.status(400).json({
            status: res.statusCode,
            message: "email sudah digunakan"
        });

    //hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const dataUserPost = new DataUser({
            nama: req.body.nama,
            email: req.body.email,
            password: hashPassword
        })
    
        try {
            const dataUser = await dataUserPost.save();
            res.json(dataUser);
    
        } catch (error) {
         res.json([{mesagge: error}])   
        }
       
    } catch (error) {
         res.status(400).json({
            status: res.statusCode,
            message: "Gagal Membuat User baru"
        })
    }
})

//login 
router.post('/login', async (req, res) => {
   
   //validation form login
    const {error} = loginValidation(req.body);
    
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })

  
    //if email exist
    const user = await DataUser.findOne({email: req.body.email});
    if(!user) return res.status(400).json({
        status: res.statusCode,
        message: "email anda belum terdaftar"
    });

    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if(!validPwd) return res.status(400).json({
        status: res.statusCode,
        message: "password anda salah"
    });
    //jsonwebtoken 
    const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY)
    res.header('auth-token',token).json({
        token : token
    });

})




module.exports = router;