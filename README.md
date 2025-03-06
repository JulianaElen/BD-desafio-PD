# Desafio Zé Delivery - Banco de Dados PD

Este é um projeto apresentado a discipolina de Banco de Dados do PD, onde foi desenvolvido um programa para o desafio do Zé Delivery. 

## Tecnologias Utilizadas
- **Node.js**
- **Express.js**
- **MySQL** 

## Instalação e Configuração

### 1. Clonar o repositório
'''sh
git clone **link do repositorio**
cd BD-DESAFIO
'''

### 2. Instalar dependências para o frontend
'''sh
cd frontend
npm install
'''

### 3. Configurar as variáveis de ambiente

Abra o arquivo index.js e altere a parte abaixo corforme necessario.
'''sh
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sua senha',
  database: 'ze_delivery',
});
'''

### 4. Criar tabelas no banco de dados
'''sh
No Backend, abra a pasta data_base e crie o banco de dados localmente usando as instruções do arquivo DataBase.sql.
'''

### 5. Iniciar o servidor
Rode o BAck e o Front usando:
'''sh
npm start
'''

