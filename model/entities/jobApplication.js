const Database = require("../database");
const database = new Database();

class JobApplication {
  async deleteJa(id) {
    try {
      const query = "DELETE FROM jobapplication WHERE id = ?";
      const values = [id];
      await database.ExecuteQuery(query, values);

      return true;
    } catch (error) {
      console.log("Error deleting job application:", error);
      return false;
    }
  }

  async getAllJa() {
    try {
      const jas = await database.ExecuteQuery("SELECT * FROM jobapplication"); //jas = Job ApplicationS
      console.log("Job Applications fetched successfully:", jas);
      return jas;
    } catch (error) {
      console.log("Error fetching job applications:", error);
      return [];
    }
  }

  async createJa(jobApplicationData) {
    try {
      console.log("Creating job application:", jobApplicationData);

      const query = `
        INSERT INTO jobapplication (
        fullName, 
        phoneNumber, 
        emailAddress, 
        dob, 
        streetAddress, 
        city, 
        postCode, 
        visaStatus, 
        documentType, 
        documentNumber, 
        driverLicense, 
        jobPosition, 
        ppe, 
        siteSafe)
        
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        jobApplicationData.fullName,
        jobApplicationData.phoneNumber,
        jobApplicationData.emailAddress,
        jobApplicationData.dob,
        jobApplicationData.streetAddress,
        jobApplicationData.city,
        jobApplicationData.postCode,
        jobApplicationData.visaStatus,
        jobApplicationData.documentType,
        jobApplicationData.documentNumber,
        jobApplicationData.driverLicense,
        jobApplicationData.jobPosition,
        jobApplicationData.ppe,
        jobApplicationData.siteSafe,
      ];
      await database.ExecuteNonQuery(query, values);
      console.log("Job application created successfully");
      return true;
    } catch (error) {
      console.log("Error creating job application:", error);
      return false;
    }
  }

  async updateJa(id, updatedJa) {
    try {
      console.log(`Updating job application with ID ${id}`);
      console.log("Updated:", updatedJa);  
      const query = `
        UPDATE dailyworksheet SET 
        fullName = ?, 
        phoneNumber = ?, 
        emailAddress = ?, 
        dob = ?, 
        streetAddress = ?, 
        city = ?, 
        postCode = ?, 
        visaStatus = ?, 
        documentType = ?, 
        documentNumber = ?, 
        driverLicense = ?, 
        jobPosition = ?, 
        ppe = ?, 
        siteSafe = ?

        WHERE id = ?
      `;
      const values = [
        updatedJa.fullName,
        updatedJa.phoneNumber,
        updatedJa.emailAddress,
        updatedJa.dob,
        updatedJa.streetAddress,
        updatedJa.city,
        updatedJa.postCode,
        updatedJa.visaStatus,
        updatedJa.documentType,
        updatedJa.documentNumber,
        updatedJa.driverLicense,
        updatedJa.jobPosition,
        updatedJa.ppe,
        updatedJa.siteSafe,
      ];
      const affectedRows = await database.ExecuteNonQuery(query, values);
      console.log(`Job Application with ID ${id} updated. Affected rows:`, affectedRows);
      return affectedRows > 0;
    } catch (error) {
      console.error("Error updating job application:", error);
      return false;
    }
  }
  
  

  async getJaById(id) {
    try {
      const query = "SELECT * FROM jobapplication WHERE id = ?";
      const values = [id];
      const result = await database.ExecuteQuery(query, values);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.log("Error searching for job application by ID:", error);
      return null;
    }
  }
}

module.exports = JobApplication;
