const express = require("express");
const router = express.Router();
const DwController = require("../Controllers/dwController");

const dwController = new DwController();
const isAuthenticated = require("../middleware/auth");


router.get('/dailyWorksheet', dwController.getAllDailyWorksheets);
router.get('/dailyWorksheet/:id', dwController.getDailyWorksheetById);
router.post('/dailyWorksheet', dwController.createDailyWorksheet);
router.put('/dailyWorksheet/:id', dwController.updateDailyWorksheet);
router.delete('/dailyWorksheet/:id', dwController.deleteDailyWorksheet);



module.exports = router;
