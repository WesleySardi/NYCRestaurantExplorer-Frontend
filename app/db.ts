import { Pool } from "pg";

const pool = new Pool({
  user: "postgres", // Substitua pelo seu usuário
  host: "localhost",
  database: "nycrestaurantexplorer", // Substitua pelo nome do banco
  password: "admin123", // Substitua pela sua senha
  port: 5432, // Porta padrão do PostgreSQL
});

export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params),
};
