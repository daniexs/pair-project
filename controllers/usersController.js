const {Profile, User} = require('../models')
const bcrypt = require('bcryptjs')
class UserController {
    static register(req,res){
        const error = req.query.err
        res.render('register-form',{error})
    }
    static registerPost(req,res){
        const {email, password, role} = req.body
        User.create({email,password,role})
        .then(()=>{
            res.redirect('/login')
        })
        .catch(err=>{
            if(err.name === "SequelizeUniqueConstraintError"){
                const eroors = err.errors[0].message
                res.redirect(`/register?err=${eroors}`)
            }else{
                res.send(err)
            }
        })
    }
    static login(req,res){
        const error = req.query.err
        res.render('login',{error})
    }
    static loginPost(req,res){
        const {email, password}= req.body
        User.findOne({
            where: {email}
        })
        .then((user)=>{
            if(user){
                const validPassword = bcrypt.compareSync(password, user.password)
                if(validPassword == true){
                    req.session.UserId = user.id
                    let UserId = user.id
                    Profile.findOne({where : {UserId}})
                    .then((data)=>{
                        console.log(data)
                        res.redirect('/')
                    })
                    .catch((err)=>{res.redirect('/profiles/add')})
                     
                }else{
                    const error = 'invalid password'
                    return res.redirect(`/login?err=${error}`)
                }
            }else{
                const error = 'invalid email'
                return res.redirect(`/login?err=${error}`)
            }
        })
        .catch(err=>res.send(err))
    }

    static logout(req,res){
        req.session.destroy(function(err) {
            if (err){
                res.send(err)
            }else{
                res.redirect('/login')
            }
        })
    }
}
module.exports = UserController