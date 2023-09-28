const {Disease, Patient, Profile, User, PatientDisease} = require('../models')
class Controller {
    static home(req,res){
        res.render('home')
    }
    static patientList(req,res){
        Patient.findAll({
            include: Disease
        })
        .then((data)=>{
            console.log(data)
            //res.send(data)
            res.render('listPatient',{data})
        })
        .catch(err=>{res.send(err)})
    }
    static diseaseList(req,res){
        Disease.findAll()
        .then((data)=>{
            res.render('listDeases',{data})
        })
        .catch(err=>{res.send(err)})


    }
}
module.exports = Controller