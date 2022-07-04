const express = require('express')
const router  = express.Router()


router.get("/api/v1/bootcamps", (req, res)=> {
    res.status(200).json({success: true, message: 'show all bootcamps'})
})

router.post("/api/v1/bootcamps", (req, res)=> {
    res.status(200).json({success: true, message: 'Create new bootcamps'})
})

router.put("/api/v1/bootcamps/:id", (req, res)=> {
    res.status(200).json({success: true, message: `Update bootcamp ${req.params.id}`})
})

router.get("/api/v1/bootcamps/:id", (req, res)=> {
    res.status(200).json({success: true, message: `Get bootcamp ${req.params.id}`})
})

router.delete("/api/v1/bootcamps/:id", (req, res)=> {
    res.status(200).json({success: true, message: `Destroy bootcamp ${req.params.id}`})
})