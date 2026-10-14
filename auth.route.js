const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/connection");

const router = express.Router();

// CADASTRAR USUÁRIO
router.post("/cadastro", async (req, res) => {
    try {
        const { nome, telefone, senha } = req.body;

        if (
            typeof nome !== "string" ||
            typeof telefone !== "string" ||
            typeof senha !== "string" ||
            !nome.trim() ||
            !/^\d{10,15}$/.test(telefone) ||
            senha.length < 8 ||
            senha.length > 72
        ) {
            return res.status(400).json({
                erro: "Informe nome, telefone com 10 a 15 dígitos e senha de 8 a 72 caracteres."
            });
        }

        const senhaHash = await bcrypt.hash(senha, 12);

        await db.execute(
            `INSERT INTO usuarios (nome, telefone, senha_hash)
             VALUES (?, ?, ?)`,
            [nome.trim(), telefone, senhaHash]
        );

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!"
        });

    } catch (erro) {
        if (erro.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                erro: "Este telefone já está cadastrado."
            });
        }

        console.error("Erro no cadastro:", erro);

        return res.status(500).json({
            erro: "Erro ao cadastrar usuário. Confira a conexão com o banco."
        });
    }
});

// FAZER LOGIN
router.post("/login", async (req, res) => {
    try {
        const { telefone, senha } = req.body;

        if (
            typeof telefone !== "string" ||
            typeof senha !== "string" ||
            !/^\d{10,15}$/.test(telefone) ||
            senha.length === 0 ||
            senha.length > 72
        ) {
            return res.status(400).json({
                erro: "Telefone ou senha inválidos."
            });
        }

        const [usuarios] = await db.execute(
            `SELECT id, nome, telefone, senha_hash
             FROM usuarios
             WHERE telefone = ?`,
            [telefone]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                erro: "Telefone ou senha incorretos."
            });
        }

        const usuario = usuarios[0];

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha_hash
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                erro: "Telefone ou senha incorretos."
            });
        }

        return res.json({
            mensagem: "Login realizado com sucesso!",
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                telefone: usuario.telefone
            }
        });

    } catch (erro) {
        console.error("Erro no login:", erro);

        return res.status(500).json({
            erro: "Erro ao realizar login. Confira a conexão com o banco."
        });
    }
});

module.exports = router;