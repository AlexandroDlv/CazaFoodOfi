import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

//esto crea un token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//pa logear al usuario
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message: "El usuario no existe"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message: "Credenciales invalidas"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//pa registrar al ususario
const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    try{
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message: "Este usuario ya existe"})
        }
        
        if(!validator.isEmail(email)){
            return res.json({success:false,message: "Ingrese un usuario válido"})
        }
        if(password.length<8){
            return res.json({success:false,message: "Ingrese una contraseña fuerte"})
        }

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({name, email, password: hashedPassword})
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser, registerUser}