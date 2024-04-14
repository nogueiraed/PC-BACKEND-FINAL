const mysql = require("mysql2/promise");
class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: "aws-efy.clseyoauobbq.sa-east-1.rds.amazonaws.com",
      user: "admin",
      password: "Unoeste123",
      database: "precision_cleaning",
      //email faculdade senha padrao
    });
  }

  async ExecuteQuery(sql, params = []) {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query(sql, params);
      return rows;
    } finally {
      connection.release();
    }
  }

  async ExecuteNonQuery(sql, params = []) {
    const connection = await this.pool.getConnection();
    try {
        const [results] = await connection.query(sql, params);
        return results.affectedRows;
    } catch (error) {
        throw error; 
    } finally {
        connection.release();
    }
  }
}

module.exports = Database;
