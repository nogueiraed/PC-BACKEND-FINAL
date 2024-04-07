const Database = require("../database");
const database = new Database();

class DailyWorksheet {
  async deleteDw(id) {
    try {
      console.log(`Deleting daily worksheet with ID ${id}`);
      const query = "DELETE FROM dailyworksheet WHERE id = ?";
      const values = [id];
      await database.ExecuteQuery(query, values);
      console.log(`Daily worksheet with ID ${id} deleted successfully`);
      return true;
    } catch (error) {
      console.log("Error deleting daily worksheet:", error);
      return false;
    }
  }

  async getAllDws() {
    try {
      console.log("Fetching all daily worksheets from the database");
      const dws = await database.ExecuteQuery("SELECT * FROM dailyworksheet");
      console.log("Daily worksheets fetched successfully:", dws);
      return dws;
    } catch (error) {
      console.log("Error fetching daily worksheets:", error);
      return [];
    }
  }

  async createDw(dailyWorksheetData) {
    try {
      console.log("Creating daily worksheet:", dailyWorksheetData);

      const query = `
        INSERT INTO dailyworksheet (date, site, siteManager, jobNumber, poNumber, teamLeader, cleaners, contractType, workDescription, extraProduct)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        dailyWorksheetData.dailyWorksheetDate,
        dailyWorksheetData.site,
        dailyWorksheetData.siteManager,
        dailyWorksheetData.jobNumber,
        dailyWorksheetData.poNumber,
        dailyWorksheetData.teamLeader,
        JSON.stringify(dailyWorksheetData.cleaners),
        dailyWorksheetData.contractType,
        dailyWorksheetData.workDescription,
        dailyWorksheetData.extraProduct
      ];
      await database.ExecuteNonQuery(query, values);
      console.log("Daily worksheet created successfully");
      return true;
    } catch (error) {
      console.log("Error creating daily worksheet:", error);
      return false;
    }
  }

  async updateDw(id, updatedDw) {
    try {
      console.log(`Atualizando Daily Worksheet com ID ${id}`);
      console.log("Dados atualizados:", updatedDw);  
      const query = `
        UPDATE dailyworksheet
        SET date = ?,
        site = ?,
        siteManager = ?,
        jobNumber = ?,
        poNumber = ?,
        teamLeader = ?,
        cleaners = ?,
        contractType = ?,
        workDescription = ?,
        extraProduct = ?
        WHERE id = ?
      `;
      const values = [
        updatedDw.dailyWorksheetDate,
        updatedDw.site,
        updatedDw.siteManager,
        updatedDw.jobNumber,
        updatedDw.poNumber,
        updatedDw.teamLeader,
        JSON.stringify(updatedDw.cleaners),
        updatedDw.contractType,
        updatedDw.workDescription,
        updatedDw.extraProduct,
        id
      ];
      console.log("Executando consulta de atualização:", query);
      const affectedRows = await database.ExecuteNonQuery(query, values);
      console.log(`Daily Worksheet com ID ${id} atualizado com sucesso. Linhas afetadas:`, affectedRows);
      return affectedRows > 0;
    } catch (error) {
      console.error("Erro ao atualizar Daily Worksheet:", error);
      return false;
    }
  }
  
  

  async getDwById(id) {
    try {
      const query = "SELECT * FROM dailyworksheet WHERE id = ?";
      const values = [id];
      const result = await database.ExecuteQuery(query, values);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.log("Error searching for daily worksheet by ID:", error);
      return null;
    }
  }
}

module.exports = DailyWorksheet;
