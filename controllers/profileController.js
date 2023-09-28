const {Profile, User} = require('../models')
class profileController{
    static profile(req,res){
        const UserId = req.session.UserId
        Profile.findAll({where : {UserId}})
        .then((data)=>{
            res.render('profile',{data})
        })
        .catch(err=>{res.send(err)})
    }
    static addProfile(req,res){
        res.render('addProfile')
    }
    static addPro(req,res){
        const UserId = req.session.UserId
        const {name, address, gender, dateOfBirth} = req.body
        Profile.create({name,address, gender, dateOfBirth, UserId})
        .then(()=>{res.redirect('/')})
        .catch(err=>{res.send(err)})
    }
    static editProfile(req,res){
        const id = +req.params.id
        Profile.findByPk(id)
        .then(data=>{
            res.render('editProfile',{data})
        })
        .catch(err=>{res.send(err)})
    }
    static editProfilePost(req,res){
        const id = +req.params.id
        const {name,address,gender,dateOfBirth} = req.body
        Profile.update({name,address,gender,dateOfBirth},{where: {id}})
        .then(()=>{res.redirect('/profiles')})
        .catch(err=>{res.send(err)})
        
    }
}
module.exports = profileController