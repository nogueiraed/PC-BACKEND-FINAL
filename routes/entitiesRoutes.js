const express = require("express");
const router = express.Router();
const EntitiesController = require("../controllers/EntitiesController");

const entitiesController = new EntitiesController();
const isAuthenticated = require("../middleware/auth");


router.get('/dailyWorksheet', entitiesController.getAllDailyWorksheets);
router.get('/dailyWorksheet/:id', entitiesController.getDailyWorksheetById);
router.post('/dailyWorksheet', entitiesController.createDailyWorksheet);
router.put('/dailyWorksheet/:id', entitiesController.updateDailyWorksheet);
router.delete('/dailyWorksheet/:id', entitiesController.deleteDailyWorksheet);



module.exports = router;
