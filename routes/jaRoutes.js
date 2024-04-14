const express = require("express");
const router = express.Router();
const JaController = require("../Controllers/jaController");

const jaController = new JaController();
const isAuthenticated = require("../middleware/auth");


router.get('/jobApplication', jaController.getAllJobApplications);
router.get('/jobApplication/:id', jaController.getJobApplicationById);
router.post('/jobApplication', jaController.createJobApplication);
router.put('/jobApplication/:id', jaController.updateJobApplication);
router.delete('/jobApplication/:id', jaController.deleteJobApplication);



module.exports = router;
