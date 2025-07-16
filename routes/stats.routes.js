import { Router } from "express";
import mysql from "mysql2/promise";

// Create router
const statsRouter = Router();

// Create MySQL connection pool
const db = mysql.createPool({
  host: "45.113.226.161",
  port: 3306, // Replace with your DB port
  user: "u171_7XT0ZOrPgu", // Replace with your DB user
  password: "iD!r3t@t!W6X6o7WPr4=EBJ6", // Replace with your DB password
  database: "s171_Plan", // Replace with your DB name
});

// GET /api/v1/stats
statsRouter.get("/stats", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
          u.uuid,
          u.name,
          COUNT(*) AS total_kills
      FROM plan_kills k
      JOIN plan_users u ON k.killer_uuid = u.uuid
      GROUP BY u.uuid, u.name
      ORDER BY total_kills DESC
      LIMIT 10;
      `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching player stats:", error);
    res.status(500).json({ error: "Failed to fetch player stats" });
  }
});

statsRouter.get("/deaths", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
          u.uuid,
          u.name,
          SUM(s.deaths) AS total_deaths
      FROM plan_sessions s
      JOIN plan_users u ON s.user_id = u.id
      GROUP BY s.user_id, u.uuid, u.name
      ORDER BY total_deaths DESC
      LIMIT 10;
      `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching player stats:", error);
    res.status(500).json({ error: "Failed to fetch player stats" });
  }
});

statsRouter.get("/plays", async (req, res) => {
  try {
    const [rows] = await db.query(`
    SELECT 
        u.uuid,
        u.name,
        SUM(s.session_end - s.session_start) AS total_playtime
    FROM plan_sessions s
    JOIN plan_users u ON s.user_id = u.id
    GROUP BY s.user_id, u.uuid, u.name
    ORDER BY total_playtime DESC
    LIMIT 10;
      `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching player stats:", error);
    res.status(500).json({ error: "Failed to fetch player stats" });
  }
});
export default statsRouter;
