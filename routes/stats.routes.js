import { Router } from "express";
import mysql from "mysql2/promise";

// Create router
const statsRouter = Router();

// Create MySQL connection pool
const db = mysql.createPool({
  host: "103.247.19.105",
  port: 3306,
  user: "u171_uLZYgTQHtE",
  password: "v0Tx4yehc2ur!f62.1Xc4vEo",
  database: "s171_Plan",
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

statsRouter.get("/votes", async (req, res) => {
  try {
    const [rows] = await db.query(`
    SELECT pu.uuid, pv.user_name, SUM(pv.votes) AS total_votes
    FROM plan_votes pv
    JOIN plan_users pu ON pv.user_name = pu.name
    GROUP BY pv.user_name, pu.uuid
    ORDER BY total_votes DESC
    LIMIT 6;
      `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching player stats:", error);
    res.status(500).json({ error: "Failed to fetch player stats" });
  }
});

export default statsRouter;
