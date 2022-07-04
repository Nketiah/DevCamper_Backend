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
const {protect} = require("../middleware/authMiddleware")

// router.get("/", getBootcamps)
// router.get("/:id", getBootcamp)
// router.post("/", createBootcamp)
// router.put("/:id", updateBootcamp)
// router.delete("/:id", destroyBootcamp)
// router.get("/radius/:zipcode/:distance", getBootcampsInRadius)

//Re-route into other resource router
//pass control to coursesRouter
router.use("/:bootcampId/courses", coursesRouter)

router
     .route("/")
     .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
     .post(protect, createBootcamp)
router.route("/:id").get(getBootcamp).put(protect, updateBootcamp).delete(protect, destroyBootcamp)
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius)
router.route('/:id/photo').put(protect, bootcampPhotoUpload)

module.exports = router