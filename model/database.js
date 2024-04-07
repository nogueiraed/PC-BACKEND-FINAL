const mysql = require("mysql2/promise");
class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: "aws-efy.clseyoauobbq.sa-east-1.rds.amazonaws.com",
      user: "admin",
      password: "Unoeste123",
      database: "efy",
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
        console.log("Conexão adquirida com sucesso");
        const [results] = await connection.query(sql, params);
        console.log("Consulta SQL executada com sucesso:", sql, "Parametros:", params, "Resultados:", results);
        return results.affectedRows;
    } catch (error) {
        console.error("Erro ao executar consulta SQL:", error);
        throw error; 
    } finally {
        connection.release();
        console.log("Conexão liberada");
    }
}


}

module.exports = Database;
