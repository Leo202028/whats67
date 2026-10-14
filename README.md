# whats67  
# DOCUMENTAÇÃO DO PROJETO — WHATSAPP DEMONSTRAÇÃO

## 1. Introdução

O projeto consiste no desenvolvimento de uma interface inspirada no WhatsApp, com o objetivo de praticar a criação de um sistema de cadastro e login utilizando tecnologias de desenvolvimento web e banco de dados.

O sistema permite cadastrar usuários por meio de nome, telefone e senha, além de verificar os dados informados durante o login.

Este projeto é educacional e não é um serviço oficial do WhatsApp.

## 2. Objetivo do projeto

Desenvolver uma aplicação web que permita cadastrar e autenticar usuários, integrando o front-end com uma API em Node.js e um banco de dados MySQL.

## 3. Tecnologias utilizadas

- **HTML:** estrutura da página, formulários e campos de entrada.
- **CSS:** aparência visual, cores, botões e organização da interface.
- **JavaScript:** validação dos campos e comunicação com a API.
- **Node.js:** execução do JavaScript no servidor.
- **Express:** criação das rotas da API para cadastro e login.
- **MySQL:** armazenamento dos dados dos usuários.
- **HeidiSQL:** ferramenta utilizada para administrar e executar consultas no banco de dados.
- **bcrypt:** biblioteca utilizada para gerar o hash das senhas antes de armazená-las.

## 4. Funcionamento do sistema

O sistema possui duas funcionalidades principais:

### 4.1 Cadastro de usuários

O usuário informa seu nome, número de telefone e senha. Os dados são enviados para a API, que valida as informações e registra o usuário no banco de dados.

O telefone deve ser único para cada conta, evitando cadastros duplicados.

### 4.2 Login de usuários

O usuário informa o telefone e a senha cadastrados anteriormente. A API consulta
