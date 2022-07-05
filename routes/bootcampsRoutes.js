const express = require('express')
const router  = express.Router()
const {
    getBootcamps, 
    getBootcamp, 
    createBootcamp, 
    updateBootcamp, 
    destroyBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload
} = require('../controllers/BootcampController')
const coursesRouter = require('./courseRoutes')
const advancedResults = require("../middleware/advancedResults")
const Bootcamp = require("../models/Bootcamp")
const {protect, authorize} = require("../middleware/authMiddleware")


//Re-route into other resource router
router.use("/:bootcampId/courses", coursesRouter)

router
     .route("/")
     .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
     .post(protect, authorize('publisher','admin'), createBootcamp)
router
     .route("/:id")
     .get(getBootcamp)
     .put(protect, authorize('publisher','admin'), updateBootcamp)
     .delete(protect, authorize('publisher','admin'), destroyBootcamp)
router
     .route("/radius/:zipcode/:distance")
     .get(getBootcampsInRadius)
router
     .route('/:id/photo')
     .put(protect, authorize('publisher','admin'), bootcampPhotoUpload)

     
module.exports = router