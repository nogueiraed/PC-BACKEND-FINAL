const DailyWorksheet = require("../model/entities/dailyWorksheet");
const dailyWorksheet = new DailyWorksheet();

class EntitiesController {
  async getAllDailyWorksheets(req, res) {
    try {
      console.log("Fetching all daily worksheets from the database");
      const result = await dailyWorksheet.getAllDws();
      console.log("Daily worksheets fetched successfully:", result);
      res.status(200).json(result);
    } catch (error) {
      console.log("Error getting daily worksheets: " + error);
      res.status(500).json({ error: "Not possible to get all daily worksheets" });
    }
  }

  async getDailyWorksheetById(req, res) {
    try {
      const id = req.params.id;
      console.log("Fetching daily worksheet with ID:", id);
      const dailyWorksheetData = await dailyWorksheet.getDwById(id);
      if (!dailyWorksheetData) throw Error("No daily worksheet found");
      else {
        console.log("Daily worksheet fetched successfully:", dailyWorksheetData);
        res.status(200).json(dailyWorksheetData);
      }
    } catch (error) {
      console.log("Error getting daily worksheet by ID: " + error);
      res.status(404).json({ error: "No daily worksheet found with this ID" });
    }
  }

  async createDailyWorksheet(req, res) {
    try {
      console.log("Received request to create a new daily worksheet:", req.body);
      const dailyWorksheetData = req.body;
      const result = await dailyWorksheet.createDw(dailyWorksheetData);
      console.log("Result of creating daily worksheet:", result);
      res.status(200).json(result);
    } catch (error) {
      console.log("Error creating daily worksheet:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async updateDailyWorksheet(req, res) {
    try {
      const id = req.params.id;
      console.log("Received request to update daily worksheet with ID:", id);
      console.log("Request body:", req.body);
  
      const updatedDailyWorksheetData = req.body;
      console.log("Updated daily worksheet data:", updatedDailyWorksheetData);
  
      const result = await dailyWorksheet.updateDw(id, updatedDailyWorksheetData);
      console.log("Result of updating daily worksheet:", result);
  
      if (!result) {
        console.log("Daily worksheet not found");
        res.status(404).json({ error: "Daily worksheet not found" });
      } else {
        console.log("Daily worksheet updated successfully");
        res.status(200).json({ message: "Daily worksheet updated successfully" });
      }
    } catch (error) {
      console.log("Error updating daily worksheet:", error);
      res.status(500).json({ error: "Unable to update daily worksheet" });
    }
  }
  
  
  

  async deleteDailyWorksheet(req, res) {
    try {
      const id = req.params.id;
      console.log("Deleting daily worksheet with ID:", id);
      const result = await dailyWorksheet.deleteDw(id);
      if (!result) {
        return res.status(500).send("Error deleting the daily worksheet");
      }
      return res.status(200).send("Daily worksheet deleted successfully!");
    } catch (err) {
      console.log("Error deleting daily worksheet:", err);
      return res.status(400).send("Could not delete the daily worksheet");
    }
  }
}

module.exports = EntitiesController;
