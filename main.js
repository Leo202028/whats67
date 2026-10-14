const express = require("express");
const path = require("path");
const db = require("./db/connection");
const authRoutes = require("./routes/auth.route");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);

// Verificar se a API e o banco estão funcionando
app.get("/api/status", async (req, res) => {
    try {
        await db.query("SELECT 1");

        res.json({
            mensagem: "API e banco de dados conectados!"
        });
    } catch (erro) {
        console.error("Erro na conexão:", erro);

        res.status(500).json({
            erro: "Não foi possível conectar ao banco de dados."
        });
    }
});

// Resposta JSON para rotas inexistentes da API
app.use("/api", (req, res) => {
    res.status(404).json({
        erro: "Rota da API não encontrada."
    });
});

// Tratamento de erros inesperados
app.use((erro, req, res, next) => {
    console.error("Erro no servidor:", erro);

    if (res.headersSent) {
        return next(erro);
    }

    res.status(500).json({
        erro: "Ocorreu um erro interno no servidor."
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});