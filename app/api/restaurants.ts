import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Helpers
const paginate = (query, { page = 1, limit = 20 }) => {
  const offset = (page - 1) * limit;
  return `${query} LIMIT ${limit} OFFSET ${offset}`;
};

// Endpoints

// 1. Create (POST /api/restaurants)
app.post("/api/restaurants", async (req, res) => {
  const {
    name,
    cuisine,
    street,
    borough,
    zipcode,
    phone,
    grade,
    inspection_date,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO restaurants (name, cuisine, street, borough, zipcode, phone, grade, inspection_date) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, cuisine, street, borough, zipcode, phone, grade, inspection_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating restaurant" });
  }
});

// 2. Read (GET /api/restaurants)
app.get("/api/restaurants", async (req, res) => {
  const {
    page = 1,
    limit = 20,
    cuisine,
    grade,
    borough,
    sort = "name",
  } = req.query;
  const filters = [];
  const values = [];

  if (cuisine)
    filters.push(`cuisine = $${filters.length + 1}`), values.push(cuisine);
  if (grade) filters.push(`grade = $${filters.length + 1}`), values.push(grade);
  if (borough)
    filters.push(`borough = $${filters.length + 1}`), values.push(borough);

  const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  const query = paginate(
    `SELECT * FROM restaurants ${whereClause} ORDER BY ${sort}`,
    { page, limit }
  );

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching restaurants" });
  }
});

// 3. Read single (GET /api/restaurants/:id)
app.get("/api/restaurants/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM restaurants WHERE id = $1`, [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Fetch inspection history
    const inspections = await pool.query(
      `SELECT * FROM inspections WHERE restaurant_id = $1`,
      [id]
    );
    res.json({ ...result.rows[0], inspections: inspections.rows });
  } catch (err) {
    res.status(500).json({ error: "Error fetching restaurant" });
  }
});

// 4. Search (GET /api/restaurants/search)
app.get("/api/restaurants/search", async (req, res) => {
  const { name } = req.query;

  if (!name || name.length < 3) {
    return res
      .status(400)
      .json({ error: "Search term must be at least 3 characters long" });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM restaurants WHERE name ILIKE $1`,
      [`%${name}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error searching restaurants" });
  }
});

// 5. Update (PUT /api/restaurants/:id)
app.put("/api/restaurants/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    cuisine,
    street,
    borough,
    zipcode,
    phone,
    grade,
    inspection_date,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE restaurants 
       SET name = $1, cuisine = $2, street = $3, borough = $4, zipcode = $5, phone = $6, grade = $7, inspection_date = $8 
       WHERE id = $9 RETURNING *`,
      [
        name,
        cuisine,
        street,
        borough,
        zipcode,
        phone,
        grade,
        inspection_date,
        id,
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error updating restaurant" });
  }
});

// 6. Delete (DELETE /api/restaurants/:id)
app.delete("/api/restaurants/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Soft delete
    await pool.query(
      `UPDATE restaurants SET deleted_at = NOW() WHERE id = $1`,
      [id]
    );
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error deleting restaurant" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
