const JobApplication = require("../model/Entities/jobApplication");
const jobApplication = new JobApplication();

class JaController {
  async getAllJobApplications(req, res) {
    try {
      const result = await jobApplication.getAllJa();
      console.log("Job applications fetched successfully:", result);
      res.status(200).json(result);
    } catch (error) {
      console.log("Error getting job applications: " + error);
      res.status(500).json({ error: "Not possible to get all job applications" });
    }
  }

  async getJobApplicationById(req, res) {
    try {
      const id = req.params.id;
      const jobApplicationData = await jobApplication.getJaById(id);
      if (!jobApplicationData) throw Error("No job application found");
      else {
        console.log("job application fetched successfully:", jobApplicationData);
        res.status(200).json(jobApplicationData);
      }
    } catch (error) {
      console.log("Error getting job application by ID: " + error);
      res.status(404).json({ error: "No job application found with this ID" });
    }
  }

  async createJobApplication(req, res) {
    try {
      const jobApplicationData = req.body;
      const result = await jobApplication.createJa(jobApplicationData);
      console.log("Result of creating job application:", result);
      res.status(200).json(result);
    } catch (error) {
      console.log("Error creating job application:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async updateJobApplication(req, res) {
    try {
      const id = req.params.id;
      console.log("Received request to update job applicaton with ID:", id);
      console.log("Request body:", req.body);
  
      const updatedJobApplicationData = req.body;
      console.log("Updated job application data:", updatedJobApplicationData);
  
      const result = await jobApplication.updateJa(id, updatedJobApplicationData);
      console.log("Result of updating job application:", result);
  
      if (!result) {
        res.status(404).json({ error: "Job application not found" });
      } else {
        console.log("Job Application updated successfully");
        res.status(200).json({ message: "Job Application updated successfully" });
      }
    } catch (error) {
      console.log("Error updating job application:", error);
      res.status(500).json({ error: "Unable to update job application" });
    }
  }
  
  
  

  async deleteJobApplication(req, res) {
    try {
      const id = req.params.id;
      console.log("Deleting job application with ID:", id);
      const result = await jobApplication.deleteJa(id);
      if (!result) {
        return res.status(500).send("Error deleting the job application");
      }
      return res.status(200).send("Job application deleted successfully!");
    } catch (err) {
      console.log("Error deleting job application:", err);
      return res.status(400).send("Could not delete the job application");
    }
  }
}

module.exports = JaController;
