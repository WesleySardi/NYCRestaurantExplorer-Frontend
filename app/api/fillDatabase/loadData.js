import pkg from "pg";
const { Client } = pkg;

// Configuração do cliente PostgreSQL
const client = new Client({
  user: "postgres", // Substitua pelo seu usuário
  host: "localhost",
  database: "nycrestaurantexplorer", // Substitua pelo nome do banco
  password: "admin123", // Substitua pela sua senha
  port: 5432, // Porta padrão do PostgreSQL
});

// Função para consumir e inserir dados
const loadData = async () => {
  try {
    // Conectando ao banco de dados
    await client.connect();

    // Fazendo o fetch dos dados
    const response = await fetch(
      "https://data.cityofnewyork.us/resource/43nn-pn8j.json"
    );
    const data = await response.json();

    console.log("Inserindo dados no banco de dados...");

    // Loop para inserir os dados
    for (const item of data) {
      const query = `
        INSERT INTO restaurants (
          camis, name, borough, building, street, zipcode, phone, 
          inspection_date, critical_flag, record_date, latitude, longitude, 
          community_board, council_district, census_tract, bin, bbl, nta
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
        ) ON CONFLICT (camis) DO NOTHING;`; // Evita duplicatas, assumindo camis como único.

      const values = [
        item.camis,
        item.dba,
        item.boro,
        item.building,
        item.street,
        item.zipcode,
        item.phone,
        item.inspection_date,
        item.critical_flag,
        item.record_date,
        item.latitude,
        item.longitude,
        item.community_board,
        item.council_district,
        item.census_tract,
        item.bin,
        item.bbl,
        item.nta,
      ];

      // Executando a query
      await client.query(query, values);
    }

    console.log("Dados inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  } finally {
    // Fechando a conexão com o banco de dados
    await client.end();
  }
};

// Executar o script
loadData();
