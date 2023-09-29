const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersController')
const patientsController = require('../controllers/patientsController')
const profileController = require('../controllers/profileController')

router.get('/register',usersController.register)
router.post('/register',usersController.registerPost)

router.get('/login',usersController.login)
router.post('/login',usersController.loginPost)

router.get('/logout',usersController.logout)

router.use((req, res, next) => {
    console.log(req.session)
    if(!req.session.UserId) {
        const error = "Please login first!"
        res.redirect('/login')
    }else{
        next()
    }
    //console.log('Time:', Date.now(),'----')
})
router.get('/',patientsController.home)
router.get('/profiles',profileController.profile)
router.get('/profiles/add',profileController.addProfile)
router.post('/profiles/add',profileController.addPro)
router.get('/profiles/edit/:id',profileController.editProfile)
router.post('/profiles/edit/:id',profileController.editProfilePost)
router.get('/patients',patientsController.patientList)
router.get('/diseases',patientsController.diseaseList)
router.get('/patients/add',patientsController.addPatient)
router.post('/patients/add',patientsController.addPatientPost)
router.get('/patients/edit/:id',patientsController.editPatient)
router.post('/patients/edit/:id',patientsController.editPatientPost)
router.get('/patients/delete/:id',patientsController.delete)
router.get('/invoice/:id',patientsController.pdf)

module.exports = router