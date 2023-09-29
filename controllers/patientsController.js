const {Disease, Patient, Profile, User, PatientDisease} = require('../models')
const Icd = require('../helper/help')
const pdfService = require('../helper/pdf-service')
const {Op} = require('sequelize')
class Controller {
    static home(req,res){
        res.render('home')
    }
    static patientList(req,res){
        let UserId= req.session.UserId
        const {search} = req.query
        console.log(search)
        let option = {
            include: Disease,
            where: {UserId}
        }
        if(search){
            option.where.name = {
                [Op.iLike] : `%${search}%`
            }
        }
        Patient.findAll(option)
        .then((data)=>{
            res.render('listPatient',{data})
        })
        .catch(err=>{res.send(err)})
    }
    static diseaseList(req,res){
        Disease.findAll()
        .then((data)=>{
            res.render('listDeases',{data,Icd})
        })
        .catch(err=>{res.send(err)})
    }
    static addPatient(req,res){
        const error = req.query.err
        Disease.findAll()
        .then(data=>{
            res.render('addPatient',{data,error})
        })
        .catch(err=>{res.send(err)})
    }
    static addPatientPost(req,res){
        let UserId= req.session.UserId
        const {name, address, dateOfBirth, DiseaseId} = req.body
        Patient.create({name,address, dateOfBirth, UserId})
        .then(()=>{
            return Patient.findOne({
                where: { },
                order: [ [ 'createdAt', 'DESC' ]],
            });
        })
        .then(data=>{
            console.log(data)
            let PatientId = data.dataValues.id
            return PatientDisease.create({
                DiseaseId , PatientId
            })
        })
        .then(()=>{res.redirect('/patients')})
        .catch(err=>{
            if(err.name === "SequelizeValidationError"){
                const eroors = err.errors.map(el=>el.message)
                res.redirect(`/patients/add?err=${eroors}`)
            }else{
                res.send(err)
            }
        })

    }
    static editPatient(req,res){
        const error = req.query.err
        const id = req.params.id
        let dataPatient
        Patient.findByPk(id,{
            include: Disease
        })
        .then((data)=>{
            dataPatient = data
            return Disease.findAll()
        })
        .then((dataDis)=>{
            res.render('editPatient',{dataDis,dataPatient,error})
        })
        .catch(err=>{res.send(err)})
    }
    static editPatientPost(req,res){
        const id = +req.params.id
        const {name, address, dateOfBirth, DiseaseId} = req.body
        Patient.update({name, address, dateOfBirth},{where: {id}})
        .then(()=>{
            return PatientDisease.update({
                DiseaseId
            },{where : {PatientId : id}})
        })
        .then(()=>{res.redirect('/patients')})
        .catch(err=>{
            if(err.name === "SequelizeValidationError"){
                const eroors = err.errors.map(el=>el.message)
                res.redirect(`/patients/edit/${id}?err=${eroors}`)
            }else{
                res.send(err)
            }
        })
    }
    static delete(req,res){
        const id = +req.params.id
        console.log(id)
        Patient.destroy({where: {id}})
        .then(()=>{res.redirect('/patients')})
        .catch(err=>{res.send(err)})
    }
    static pdf(req,res){
        const id = +req.params.id
        console.log(id)
        Patient.findByPk(id)
        .then(data=>{
            const pdfPath = pdfService('./html/businessCard.html', data.dataValues, './surat.pdf')
            res.download('./surat.pdf');
        })
        .catch(err=>{res.send(err)})
    }
    
}
module.exports = Controller