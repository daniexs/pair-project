const {Disease, Patient, Profile, User, PatientDisease} = require('../models')
const bcryptjs = require('bcryptjs')
class UserController {
    static register(req,res){
        res.render('register-form')
    }
    static registerPost(req,res){
        const {email, password, role} = req.body
        User.create({email,password,role})
        .then(()=>{
            res.redirect('/login')
        })
        .catch(err=>{res.send(err)})
    }
    static login(req,res){
        res.render('login')
    }
    static loginPost(req,res){
        const {email, password}= req.body
        User.findOne({
            where: email
        })
        .then((user)=>{
            if(user){
                const validPassword = bcryptjs.compareSync(password, user.password)
                if(validPassword){
                    return res.redirect('/')
                }else{
                    const error = 'invalid password'
                    return res.send(error)
                }
            }else{
                const error = 'invalid email'
                return res.send(error)
            }
        })
        .catch(err=>res.send(err))
    }

    static profile(req,res){
        Profile.findAll({where : {id : 1}})
        .then((data)=>{
            console.log(data)
            res.render('profile',{data})
        })
        .catch(err=>{res.send(err)})
    }
    static addProfile(req,res){
        res.render('addProfile')
    }
    static addPro(req,res){
        const {name, address, gender, dateOfBirth, UserId} = req.body
        Profile.create({name,address, gender, dateOfBirth, UserId})
        .then(()=>{res.redirect('/')})
        .catch(err=>{res.send(err)})
    }
}
module.exports = UserController