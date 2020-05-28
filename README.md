<h1 align="center" >
  <img src="https://ik.imagekit.io/danilovieira/logo_MyF0R-5G1.png" alt="Twitter Clone API" width="">
</h1>

## 📝 Sobre

O **Twitter Clone API** é uma API RESTful que simula o funcionamento do Twitter, podendo ser usada para criar usuários, posts e comentários para os posts.

## 👨‍💻 Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

* [NodeJS](https://nodejs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Express](https://expressjs.com/)
* [JWT](https://jwt.io/)
* [TypeORM](https://typeorm.io/#/)
* [Tsyringe](https://github.com/microsoft/tsyringe)
* [Class Transformer](https://github.com/typestack/class-transformer)
* [Celebrate](https://github.com/arb/celebrate)
* [Jest](https://jestjs.io/)

## 🚀 Como rodar o projeto

### ⚙ **Instalando as ferramentas**

O primeiro passo para rodar o projeto é ter certeza que você tem todas as ferramentas disponíveis no seu computador. Sendo assim, tenha certeza de seguir todos os passos corretamente.

ATENÇÃO: Os seguintes passos são para configurações em ambiente **Linux**. Se você possui outro SO, basta fazer algumas simples buscas na internet de como seguir os mesmos passos que irá funcionar (deixarei também algumas dicas por aqui, caso precise).

### 📌 **Index**
* [Installing Tools](#installing-tools)
  * [Installing NVM](#installing-nvm)
  * [Installing Node.js](#installing-nodejs)
  * [Installing Yarn](#installing-yarn)
* [Running the Project](#🚀-running-the-project)
  * [Making a clone](#make-a-clone)
  * [Opening the project](#opening-the-project)
  * [Initializing the project](#initializing-the-project)

#### Instalando NVM

  Toda a documentação (incluindo o guia de instalação para Windows pode ser encontrada no [repositório oficial do NVM](https://github.com/nvm-sh/nvm#installing-and-updating)).

  Abra seu terminal e digite:
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
  ```
  Aguarde a instalação terminar antes de prosseguir.

#### Instalando Node.js

  No mesmo terminal, digite:
  ```bash
    nvm install v12.16.3
  ```
  E depois:
  ```bash
    nvm use v12.17.3
  ```
  Esses comandos vão fazer seu computador baixar o Node.js na sua útima versão LTS (que é a atual versão LTS, mas você pode checar por mudanças no [site oficial do NodeJS](https://nodejs.org/en/)) e usar ela.

### **Instalando Yarn**

  Yarn é o gerenciador de pacotes que vai ser usado para baixar todas as dependências e executar o projeto. Caso você prefira utilizar o próprio gerenciador de pacotes do NodeJS (NPM), pule esta etapa.

  Para baixar, nós temos duas opções:

  1. Ir ao [site oficial do Yarn](https://yarnpkg.com/) e ver por conta própria como baixar;

  2. Rodar este comando no terminal:
  ```bash
    npm install -g yarn
  ```

  **Agora temos tudo que precisamos para executar o projeto!**

---

### 🚀 **Executando o projeto**

#### Faça o clone do projeto

  Para isso, também há duas opções:

  1. Simplesmente baixar através do botão verde no canto superior direito dessa atual página;

  2. Usar o Git Bash:

  ```bash
  # faça o clone do repositório
  git clone https://github.com/danilo-vieira/twitter-clone-API.git

  # entre na pasta baixada
  cd twitter-clone-API
  ```

#### Abrindo o projeto

  Agora, abra este diretório com sua IDE (recomendo o [Visual Studio Code](https://code.visualstudio.com/))

#### Instalando as dependências

  Se você baixou o Yarn, com o terminal da IDE aberto, rode:
  ```bash
    yarn
  ```
  Se você está utilizando o NPM, rode:
  ```bash
    npm install
  ```

  Isso vai instalar todas as dependências necessárias. Tire uma pausa e tome um café enquanto espera ☕😋.

#### Configurando o Banco de Dados

  O projeto utiliza o banco Postgres. Certifique-se de tê-lo em sua máquina.

  Após isso, crie, na raiz do projeto, um arquivo chamado `ormconfig.json`. Tenha certeza de colocar o nome exato, pois esse arquivo será lido pela CLI do TypeORM para fazer a conexão com o Banco de Dados.

  Dentro desse arquivo, você irá colocar as configurações de conexão com o banco. Siga esse exemplo, substituindo APENAS o que estiver em caixa alta:

  ```json
    {
      "name": "default",
      "type": "postgres",
      "host": "HOST_DO_BANCO",
      "port": PORTA_DE_CONEXÃO,
      "username": "USUÁRIO",
      "password": "SENHA",
      "database": "NOME_DA_DATABASE",
      "entities": [
        "./src/modules/**/infra/typeorm/entities/*.ts"
      ],
      "migrations": [
        "./src/shared/infra/typeorm/migrations/*.ts"
      ],
      "cli": {
        "migrationsDir": "./src/shared/infra/typeorm/migrations"
      }
    }

  ```

#### Executando as migrations

  Com a conexão do Banco já configurada, rode no terminal da IDE:

  ```shell
    yarn typeorm migration:run
  ```

  Isso irá subir as tabelas para o banco.

### 🚀 **Inicializando o projeto**

  Para isso, basta rodar:

  ```shell
    yarn dev:server
  ```

  Lembre-se de manter o terminal em execução para que o projeto continue rodando.

### 💻 **Referência da API**

  Nessa API, temos três tipos de rotas que serão descritas por ordem e tipo (GET, POST, PUT ou DELETE):

  - Rotas para usuários;
  - Rotas para posts;
  - Rotas para comentários.

  A URL base a ser usada como exemplo será uma variável `base_url`. Considere que ela armazene o valor `http://localhost:3333`.

### **Erros comums**

- #### Erros de autenticação

- Motivo
  - Foi informado um token inválido no cabeçalho da requisição.

- Reposta desse erro
  - ```json
      {
        "status": "error",
        "message": "Invalid JWT token"
      }
    ```
  - Status code: `401`

  <br>

- Motivo
  - Não foi informado um token no cabeçalho da requisição

- Reposta desse erro
  - ```json
      {
        "status": "error",
        "message": "Token was not provided."
      }
    ```
  - Status code: `401`

### **Users**

  **Rota**
  - POST - `base_url/users`

  **Descrição**

  Essa rota realiza o cadastro de um usuário a partir do nome, email e senha.

  **Parâmetros**
  - BODY
    - ```json
          {
            "name": "John Doe",
            "email": "johndoe@example.com",
            "password": "123456"
          }
      ```

  **Resposta**
  ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "id": "90d002fb-99c3-4868-83b2-8ae390e36e0b",
      "created_at": "2020-05-28T13:52:51.342Z",
      "updated_at": "2020-05-28T13:52:51.342Z"
    }
  ```
  Status code: `201`

  **Possíveis erros**
  - Motivo
    - O email já está sendo utilizado por outro usuário.

  - Reposta desse erro
    - ```json
        {
          "status": "error",
          "message": "E-mail address already used"
        }
      ```
    - Status code: `400`

<br>

  **Rota**
  - POST - `base_url/sessions`

  **Descrição**

  Essa rota realiza a autenticação de um usuário cadastrado

  **Parâmetros**
  - BODY
    - ```json
          {
            "email": "johndoe@example.com",
            "password": "123456"
          }
      ```

  **Resposta**
  ```json
    {
    "user": {
      "id": "90d002fb-99c3-4868-83b2-8ae390e36e0b",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "created_at": "2020-05-28T13:52:51.342Z",
      "updated_at": "2020-05-28T13:52:51.342Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1OTA2NjMyMTksImV4cCI6MTU5MDc0OTYxOSwic3ViIjoiOTBkMDAyZmItOTljMy00ODY4LTgzYjItOGFlMzkwZTM2ZTBiIn0.Hepb43TqjQe5ba8nnNJ-iBaaMBMSVi3rraAA0nATLT4"
  }
  ```
  Status code: `200`

  **Possíveis erros**
  - Motivo
    - O email ou senha informados não bate com um usuário cadastrado

  - Reposta desse erro
    - ```json
        {
          "status": "error",
          "message": "Incorrect e-mail/password combination"
        }
      ```
    - Status code: `400`

<br>

  **Rota**
  - PUT - `base_url/profile/update`

  **Descrição**

  Essa rota realiza a alteração das informações cadastrais de um usuário como nome, email e senha, sendo a senha opicional.

  Para isso, é necessário que o usuário esteja autenticado, enviando o token pelo header da requisição.

  **Parâmetros**
  - BODY

    -Podem haver duas possibilides: Com os dados para troca de senha ou sem.
    1.  ```json
          {
            "name": "John",
            "email": "johndoe@example.com",
            "old_password": "123456",
            "password": "1234567",
            "password_confirmation": "1234567"
          }
        ```

    2.  ```json
          {
            "name": "John",
            "email": "johndoe@example.com"
          }
        ```

  - HEADER
    - ```
        key: authorization
      ```
    - ```
        value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1OTA2NjMyMTksImV4cCI6MTU5MDc0OTYxOSwic3ViIjoiOTBkMDAyZmItOTljMy00ODY4LTgzYjItOGFlMzkwZTM2ZTBiIn0.Hepb43TqjQe5ba8nnNJ-iBaaMBMSVi3rraAA0nATLT4
      ```


  **Resposta**
  ```json
    {
      "id": "90d002fb-99c3-4868-83b2-8ae390e36e0b",
      "name": "John",
      "email": "johndoe@example.com",
      "created_at": "2020-05-28T13:52:51.342Z",
      "updated_at": "2020-05-28T13:55:42.981Z"
    }
  ```
  Status code: `200`

  **Possíveis erros**
  - Motivo
    - [Erros de autenticação](#erros-de-autenticação)

<br>

  - Motivo
    - Email informado para atualização já está sendo utilizado por outro usuário.

  - Reposta desse erro
    - ```json
        {
          "status": "error",
          "message": "E-mail address already used"
        }
      ```
    - Status code: `400`

<br>

  - Motivo
    - Não foi informado um token no cabeçalho da requisição

  - Reposta desse erro
    - ```json
        {
          "status": "error",
          "message": "Token was not provided."
        }
      ```
    - Status code: `401`

<br>

  - Motivo
    - Foi informada a antiga senha mas não a nova senha/confirmação de senha.

  - Reposta desse erro
    - ```json
        {
          "status": "error",
          "message": "You need to inform the password field to set a new password"
        }
      ```
    - Status code: `400`

<br>

  - Motivo
    - A senha e a confirmação da senha não batem.

  - Reposta desse erro
    - ```json
        {
          "statusCode": 400,
          "error": "Bad Request",
          "message": "\"password_confirmation\" must be [ref:password]",
          "validation": {
            "source": "body",
            "keys": [
              "password_confirmation"
            ]
          }
        }
      ```
    - Status code: `400`
    - Erro de validação do Celebrate

<br>

  **Rota**
  - DELETE - `base_url/profile/delete`

  **Descrição**

  Essa rota realiza a remoção de uma conta de usuário do banco e junto dela, todos os posts e comentários da mesma.

  **Parâmetros**
  - HEADER
    - ```
        key: authorization
      ```
    - ```
        value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1OTA2NjMyMTksImV4cCI6MTU5MDc0OTYxOSwic3ViIjoiOTBkMDAyZmItOTljMy00ODY4LTgzYjItOGFlMzkwZTM2ZTBiIn0.Hepb43TqjQe5ba8nnNJ-iBaaMBMSVi3rraAA0nATLT4
      ```

  **Resposta**

  Status code: `204`

  **Possíveis erros**
  - Motivo
    - [Erros de autenticação](#erros-de-autenticação)

<br>

  **Rota**
  - GET - `base_url/profile`

  **Descrição**

  Essa rota mostra as informações do cadastro de um usuário

  **Parâmetros**
  - HEADER
    - ```
        key: authorization
      ```
    - ```
        value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1OTA2NjMyMTksImV4cCI6MTU5MDc0OTYxOSwic3ViIjoiOTBkMDAyZmItOTljMy00ODY4LTgzYjItOGFlMzkwZTM2ZTBiIn0.Hepb43TqjQe5ba8nnNJ-iBaaMBMSVi3rraAA0nATLT4
      ```

  **Resposta**

  Status code: `204`

  **Possíveis erros**
  - Motivo
    - [Erros de autenticação](#erros-de-autenticação)



Desenvolvido com ❤ por [Danilo Vieira](https://github.com/danilo-vieira/)

