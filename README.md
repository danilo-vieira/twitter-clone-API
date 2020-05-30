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

### 📌 **Index**
* [Instalando as ferramentas](#instalando-as-ferramentas)
  * [Instalando NVM](#instalando-nvm)
  * [Instalando Node.js](#instalando-nodejs)
  * [Instalando Yarn](#instalando-yarn)
* [Executando o projeto](#🚀-executando-o-projeto)
  * [Faça o clone do projeto](#faça-o-clone-do-projeto)
  * [Abrindo o projeto](#abrindo-o-projeto)
  * [Instalando as dependências](#instalando-as-dependências)
  * [Configurando o Banco de Dados](#configurando-o-banco-de-dados)
  * [Executando as migrations](#executando-as-migrations)
* [Inicializando o projeto](#🚀-inicializando-o-projeto)
* [Referência completa da API](#💻-referência-da-API)
  * [Erros de autenticação](#erros-de-autenticação)
  * [Parâmetros de autenticação](#parâmetros-de-autenticação)
  * [Rotas](#usuários)
    * [Usuários](#usuários)
    * [Posts](#posts)
    * [Comentários](#comentários)


## 🚀 Como rodar o projeto

### ⚙ **Instalando as ferramentas**

O primeiro passo para rodar o projeto é ter certeza que você tem todas as ferramentas disponíveis no seu computador. Sendo assim, tenha certeza de seguir todos os passos corretamente.

ATENÇÃO: Os seguintes passos são para configurações em ambiente **Linux**. Se você possui outro SO, basta fazer algumas simples buscas na internet de como seguir os mesmos passos que irá funcionar (deixarei também algumas dicas por aqui, caso precise).

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
    nvm install v12.17.0
  ```
  E depois:
  ```bash
    nvm use v12.17.0
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

  Nessa API, temos três principais entidades que serão descritas por ordem e tipo de rota (GET, POST, PUT, PATCH ou DELETE):

  - Rotas para usuários;
  - Rotas para posts;
  - Rotas para comentários.

  A URL base a ser usada como exemplo será uma variável `base_url`. Considere que ela armazene o valor `http://localhost:3333`.



#### Erros de autenticação

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

### **Parâmetros de autenticação**
  - HEADER
    - ```
        key: authorization
      ```
    - ```
        value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1OTA2NjMyMTksImV4cCI6MTU5MDc0OTYxOSwic3ViIjoiOTBkMDAyZmItOTljMy00ODY4LTgzYjItOGFlMzkwZTM2ZTBiIn0.Hepb43TqjQe5ba8nnNJ-iBaaMBMSVi3rraAA0nATLT4
      ```

### **Usuários**

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
    - [Parâmetros de autenticação](#parâmetros-de-autenticação)


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
    - [Parâmetros de autenticação](#parâmetros-de-autenticação)

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
  - [Parâmetros de autenticação](#parâmetros-de-autenticação)

  **Resposta**

  Status code: `200`

  **Possíveis erros**
  - Motivo
    - [Erros de autenticação](#erros-de-autenticação)

<br>

### **Posts**

  **Rota**
  - POST - `base_url/posts`

  **Descrição**

  Essa rota realiza a criação de um post.

  **Parâmetros**
  - BODY
    - ```json
          {
            "content": "Hello World!"
          }
      ```
  - HEADER
    - [Parâmetros de autenticação](#parâmetros-de-autenticação)

  **Resposta**
  ```json
    {
      "id": "756db6fc-2635-49fd-9888-965eebf807d2",
      "user_id": "ee0c2b52-142e-4ee0-9369-41e4decc113e",
      "content": "Hello World!",
      "likes": 0,
      "comments": [],
      "created_at": "2020-05-28T17:44:57.250Z",
      "updated_at": "2020-05-28T17:44:57.250Z"
    }
  ```
  Status code: `200`

  **Possíveis erros**
  - Motivo
    - [Erros de autenticação](#erros-de-autenticação)
  - Motivo
    - Erros de validação do Celebrate caso o conteúdo do corpo não exista, possua menos que 1 caractere ou possua mais que 280 caracteres

<br>

  **Rota**
  - PUT - `base_url/posts/:postId`

  **Descrição**

  Essa rota realiza a alteração no conteúdo de um post.

  **Parâmetros**
  - BODY
    - ```json
          {
            "content": "Post Changed!"
          }
      ```
  - PARAMS
    - ```
        756db6fc-2635-49fd-9888-965eebf807d2
      ```
  - HEADER
    - [Parâmetros de autenticação](#parâmetros-de-autenticação)

  **Resposta**
  ```json
    {
      "id": "e686c337-9974-4242-9430-17fc958abffb",
      "user_id": "322dac61-b42d-4e0c-abb0-7dfbda6fd40c",
      "comment_id": null,
      "content": "Post Changed!",
      "likes": 0,
      "created_at": "2020-05-30T11:50:12.661Z",
      "updated_at": "2020-05-30T11:52:16.794Z",
      "user": {
        "id": "322dac61-b42d-4e0c-abb0-7dfbda6fd40c",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "created_at": "2020-05-30T11:50:02.728Z",
        "updated_at": "2020-05-30T11:50:02.728Z"
      },
      "comments": []
    }
  ```
  Status code: `200`

  **Possíveis erros**
  - Motivo
    - [Erros de autenticação](#erros-de-autenticação)

  - Motivo
    - Erros de validação do Celebrate caso o conteúdo do corpo não exista, se o `content` possuir menos que 1 caractere, possuir mais que 280 caracteres ou se o ID informado não for do tipo UUIDv4.

  - Motivo
    - O post não foi encontrado

  - Resposta desse erro:
    - ```json
        {
          "status": "error",
          "message": "Post not found"
        }
      ```
    - Status code: `400`

<br>

  **Rota**
  - PATCH - `base_url/posts/likes/:postId`

  **Descrição**

  Essa rota permite dar like em um post.
  Atenção: Apenas é permitido um like por usuário. Caso um usuário que já tenha dado like realize uma requisição à essa mesma rota, a ação será de deslike.

  **Parâmetros**
  - HEADER
    - [Parâmetros de autenticação](#parâmetros-de-autenticação)
  - PARAMS
    - ```
        e686c337-9974-4242-9430-17fc958abffb
      ```
  **Resposta**
  ```json
    {
      "id": "e686c337-9974-4242-9430-17fc958abffb",
      "user_id": "322dac61-b42d-4e0c-abb0-7dfbda6fd40c",
      "comment_id": null,
      "content": "Post Changed!",
      "likes": 1,
      "created_at": "2020-05-30T11:50:12.661Z",
      "updated_at": "2020-05-30T11:52:16.794Z",
      "user": {
        "id": "322dac61-b42d-4e0c-abb0-7dfbda6fd40c",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "created_at": "2020-05-30T11:50:02.728Z",
        "updated_at": "2020-05-30T11:50:02.728Z"
      },
      "comments": []
    }
  ```
  Status code: `200`

  **Possíveis erros**
  - Motivo
    - [Erros de autenticação](#erros-de-autenticação)
  - Motivo
    - Erros de validação do Celebrate caso o ID passado no parâmetro não seja do tipo UUIDv4.
  - Motivo
    - Usuário não encontrado
  - Resposta desse erro:
    ```json
      {
        "status": "error",
        "message": "User not found.",
      }
    ```
    - Status code: `400`

  - Motivo
    - Post não encontrado
  - Resposta desse erro:
    ```json
      {
        "status": "error",
        "message": "Post not found.",
      }
    ```
    - Status code: `400`

<br>

  **Rota**
  - DELETE - `base_url/posts/:postId`

  **Descrição**

  Essa rota realiza a remoção de um post do banco de dados.

  **Parâmetros**
  - PARAMS
    - ```
        756db6fc-2635-49fd-9888-965eebf807d2
      ```
  - HEADER
    - [Parâmetros de autenticação](#parâmetros-de-autenticação)

  **Resposta**

  Status code: `204`

  **Possíveis erros**
  - Motivo
    - [Erros de autenticação](#erros-de-autenticação)

  - Motivo
    - Erro de validação do Celebrate caso o ID informado não for do tipo UUIDv4.

  - Motivo
    - O post não foi encontrado

  - Resposta desse erro:
    - ```json
        {
          "status": "error",
          "message": "Post not found"
        }
      ```
    - Status code: `400`

<br>

  **Rota**
  - GET - `base_url/posts`

  **Descrição**

  Essa rota realiza a listagem de todos os posts de todos os usuários ordenados por data do mais recente para o mais antigo (timeline).

  **Parâmetros**

  - Não possui

  **Resposta**
  ```json
    [
      {
        "id": "e686c337-9974-4242-9430-17fc958abffb",
        "user_id": "322dac61-b42d-4e0c-abb0-7dfbda6fd40c",
        "comment_id": null,
        "content": "Post Changed!",
        "likes": 1,
        "created_at": "2020-05-30T11:50:12.661Z",
        "updated_at": "2020-05-30T11:52:16.794Z",
        "user": {
          "id": "322dac61-b42d-4e0c-abb0-7dfbda6fd40c",
          "name": "John Doe",
          "email": "johndoe@example.com",
          "created_at": "2020-05-30T11:50:02.728Z",
          "updated_at": "2020-05-30T11:50:02.728Z"
        },
        "comments": []
      }
    ]
  ```
  Status code: `200`

  **Possíveis erros**
  - Não possui

<br>

  **Rota**
  - GET - `base_url/posts/:userId`

  **Descrição**

  Essa rota realiza a listagem de todos os posts de um determinado usuário a partir do id dele.

  **Parâmetros**
  - PARAMS
    - ```
        ee0c2b52-142e-4ee0-9369-41e4decc113e
      ```

  **Resposta**
  ```json
    [
      {
        "id": "e686c337-9974-4242-9430-17fc958abffb",
        "user_id": "322dac61-b42d-4e0c-abb0-7dfbda6fd40c",
        "comment_id": null,
        "content": "Post Changed!",
        "likes": 1,
        "created_at": "2020-05-30T11:50:12.661Z",
        "updated_at": "2020-05-30T11:52:16.794Z",
        "user": {
          "id": "322dac61-b42d-4e0c-abb0-7dfbda6fd40c",
          "name": "John Doe",
          "email": "johndoe@example.com",
          "created_at": "2020-05-30T11:50:02.728Z",
          "updated_at": "2020-05-30T11:50:02.728Z"
        },
        "comments": []
      }
    ]
  ```
  Status code: `200`

  **Possíveis erros**
  - Motivo
    - [Erros de autenticação](#erros-de-autenticação)

  - Motivo
    - Erro de validação do Celebrate caso o ID informado não for do tipo UUIDv4.

  - Motivo
    - O usuário não foi encontrado

  - Resposta desse erro:
    - ```json
        {
          "status": "error",
          "message": "User not found"
        }
      ```
    - Status code: `400`

<br>

  **Rota**
  - GET - `base_url/posts/:postId/:userId`

  **Descrição**

  Essa rota mostra um post de um determinado usuário a partir do id do post e do usuário.

  **Parâmetros**
  - PARAMS
    1. ```
        fc53f681-82b5-4089-b2c1-d12002b38ed3
       ```
    2. ```
        ee0c2b52-142e-4ee0-9369-41e4decc113e
       ```

  **Resposta**
  ```json
    {
      "id": "fc53f681-82b5-4089-b2c1-d12002b38ed3",
      "user_id": "ee0c2b52-142e-4ee0-9369-41e4decc113e",
      "comment_id": null,
      "content": "Post Changed!",
      "created_at": "2020-05-28T18:16:53.420Z",
      "updated_at": "2020-05-28T18:16:53.420Z",
      "user": {
        "id": "ee0c2b52-142e-4ee0-9369-41e4decc113e",
        "name": "John",
        "email": "johndoe@example.com",
        "created_at": "2020-05-28T16:51:20.606Z",
        "updated_at": "2020-05-28T16:54:45.734Z"
      },
      "comment": []
    }
  ```
  Status code: `200`

  **Possíveis erros**
  - Motivo
    - [Erros de autenticação](#erros-de-autenticação)

  - Motivo
    - Erro de validação do Celebrate caso os IDs informados não forem do tipo UUIDv4.

  - Motivo
    - O usuário não foi encontrado

  - Resposta desse erro:
    - ```json
        {
          "status": "error",
          "message": "User not found"
        }
      ```
    - Status code: `400`

  - Motivo
    - O post não foi encontrado

  - Resposta desse erro:
    - ```json
        {
          "status": "error",
          "message": "Post not found"
        }
      ```
    - Status code: `400`

<br>

### **Comentários**

  **Rota**
  - POST - `base_url/comments/:postId`

  **Descrição**

  Essa rota realiza a criação de um comentário.

  **Parâmetros**
  - BODY
    - ```json
          {
            "content": "This is a comment!"
          }
      ```
  - PARAMS
     -  ```
        756db6fc-2635-49fd-9888-965eebf807d2
        ```
  - HEADER
    - [Parâmetros de autenticação](#parâmetros-de-autenticação)

  **Resposta**
  ```json
    {
      "post_id": "fc53f681-82b5-4089-b2c1-d12002b38ed3",
      "user_id": "ee0c2b52-142e-4ee0-9369-41e4decc113e",
      "likes": 0,
      "content": "This is a comment!",
      "id": "6422bdc6-c6b5-448a-9e77-e8ecd6e672df",
      "created_at": "2020-05-28T18:28:48.706Z",
      "updated_at": "2020-05-28T18:28:48.706Z"
    }
  ```
  Status code: `200`

  **Possíveis erros**
  - Motivo
    - [Erros de autenticação](#erros-de-autenticação)
  - Motivo
    - Erro de validação do Celebrate caso o ID informado não for do tipo UUIDv4.
  - Motivo
    - O post não foi encontrado

  - Resposta desse erro:
    - ```json
        {
          "status": "error",
          "message": "Post not found"
        }
      ```
    - Status code: `400`

<br>

  **Rota**
  - PUT - `base_url/comments/:commentId`

  **Descrição**

  Essa rota realiza a edição de um comentário a partir do seu ID.

  **Parâmetros**
  - BODY
    - ```json
          {
            "content": "Comment ALTERED"
          }
      ```
  - PARAMS
     -  ```
        6422bdc6-c6b5-448a-9e77-e8ecd6e672df
        ```
  - HEADER
    - [Parâmetros de autenticação](#parâmetros-de-autenticação)

  **Resposta**
  ```json
    {
      "id": "6422bdc6-c6b5-448a-9e77-e8ecd6e672df",
      "post_id": "fc53f681-82b5-4089-b2c1-d12002b38ed3",
      "user_id": "ee0c2b52-142e-4ee0-9369-41e4decc113e",
      "likes": 0,
      "content": "Comment ALTERED",
      "created_at": "2020-05-28T18:28:48.706Z",
      "updated_at": "2020-05-28T18:33:16.886Z"
    }
  ```
  Status code: `200`

  **Possíveis erros**
  - Motivo
    - [Erros de autenticação](#erros-de-autenticação)
  - Motivo
    - Erro de validação do Celebrate caso o ID informado não for do tipo UUIDv4.
  - Motivo
    - O comentário não foi encontrado

  - Resposta desse erro:
    - ```json
        {
          "status": "error",
          "message": "Comment not found"
        }
      ```
    - Status code: `400`

<br>

  **Rota**
  - PATCH - `base_url/comments/likes/:commentId`

  **Descrição**

  Essa rota permite dar like em um comentário.
  Atenção: Apenas é permitido um like por usuário. Caso um usuário que já tenha dado like realize uma requisição à essa mesma rota, a ação será de deslike.

  **Parâmetros**
  - HEADER
    - [Parâmetros de autenticação](#parâmetros-de-autenticação)
  - PARAMS
    - ```
        6422bdc6-c6b5-448a-9e77-e8ecd6e672df
      ```
  **Resposta**
  ```json
    {
      "id": "6422bdc6-c6b5-448a-9e77-e8ecd6e672df",
      "post_id": "e686c337-9974-4242-9430-17fc958abffb",
      "user_id": "322dac61-b42d-4e0c-abb0-7dfbda6fd40c",
      "likes": 1,
      "content": "Comment ALTERED",
      "created_at": "2020-05-30T11:51:13.587Z",
      "updated_at": "2020-05-30T11:52:41.408Z"
    }
  ```
  Status code: `200`

  **Possíveis erros**
  - Motivo
    - [Erros de autenticação](#erros-de-autenticação)
  - Motivo
    - Erros de validação do Celebrate caso o ID passado no parâmetro não seja do tipo UUIDv4.
  - Motivo
    - Usuário não encontrado
  - Resposta desse erro:
    ```json
      {
        "status": "error",
        "message": "User not found.",
      }
    ```
    - Status code: `400`

  - Motivo
    - Comentário não encontrado
  - Resposta desse erro:
    ```json
      {
        "status": "error",
        "message": "Comment not found.",
      }
    ```
    - Status code: `400`

<br>

  **Rota**
  - DELETE - `base_url/comments/:commentId`

  **Descrição**

  Essa rota realiza a remoção de um comentário do banco de dados a partir do seu ID. Aqui há uma regra de negócio mais específica que é o seguinte:

  O dono de uma publicação pode apagar qualquer comentário dessa publicação mesmo que não tenha sido escrito por ele.

  Já o autor de um comentário em uma publicação que não é dele, pode apagar somente o seu comentário.

  **Parâmetros**
  - PARAMS
     -  ```
        6422bdc6-c6b5-448a-9e77-e8ecd6e672df
        ```
  - HEADER
    - [Parâmetros de autenticação](#parâmetros-de-autenticação)

  **Resposta**

  Status code: `204`

  **Possíveis erros**
  - Motivo
    - [Erros de autenticação](#erros-de-autenticação)

  - Motivo
    - Erro de validação do Celebrate caso o ID informado não for do tipo UUIDv4.

  - Motivo
    - O comentário não foi encontrado

  - Resposta desse erro:
    - ```json
        {
          "status": "error",
          "message": "Comment not found"
        }
      ```
    - Status code: `400`

  - Motivo
    - O comentário não pode ser apagado por alguém que não é o autor do comentário ou da publicação ao qual esse comentário pertence.

  - Resposta desse erro:
    - ```json
        {
          "status": "error",
          "message": "Unable to delete this comment"
        }
      ```
    - Status code: `400`
<br>

  **Rota**
  - GET - `base_url/comments/:postId`

  **Descrição**

  Essa rota realiza a listagem de todos os comentários de um post a partir do ID de um post.

  **Parâmetros**
  - PARAMS
     -  ```
        fc53f681-82b5-4089-b2c1-d12002b38ed3
        ```

  **Resposta**

  ```json
    [
      {
        "id": "6422bdc6-c6b5-448a-9e77-e8ecd6e672df",
        "post_id": "fc53f681-82b5-4089-b2c1-d12002b38ed3",
        "user_id": "ee0c2b52-142e-4ee0-9369-41e4decc113e",
        "content": "Comment ALTERED",
        "created_at": "2020-05-28T18:39:57.899Z",
        "updated_at": "2020-05-28T18:39:57.899Z"
      }
    ]
  ```

  Status code: `200`

  **Possíveis erros**
  - Motivo
    - Erro de validação do Celebrate caso o ID informado não for do tipo UUIDv4.
  - Motivo
    - O post não foi encontrado

  - Resposta desse erro:
    - ```json
        {
          "status": "error",
          "message": "Post not found"
        }
      ```
    - Status code: `400`

<br>

  **Rota**
  - GET - `base_url/comments/:postId/:commentId`

  **Descrição**

  Essa rota mostra um comentário específico de um post a partir do ID de um post e do ID de um comentário.

  **Parâmetros**
  - PARAMS
     1. ```
        fc53f681-82b5-4089-b2c1-d12002b38ed3
        ```
    2.  ```
        6422bdc6-c6b5-448a-9e77-e8ecd6e672df
        ```

  **Resposta**

  ```json
    {
        "id": "6422bdc6-c6b5-448a-9e77-e8ecd6e672df",
        "post_id": "fc53f681-82b5-4089-b2c1-d12002b38ed3",
        "user_id": "ee0c2b52-142e-4ee0-9369-41e4decc113e",
        "content": "Comment ALTERED",
        "created_at": "2020-05-28T18:39:57.899Z",
        "updated_at": "2020-05-28T18:39:57.899Z"
      }
  ```

  Status code: `200`

  **Possíveis erros**
  - Motivo
    - Erro de validação do Celebrate caso os IDs informados não forem do tipo UUIDv4.

  - Motivo
    - O post não foi encontrado

  - Resposta desse erro:
    - ```json
        {
          "status": "error",
          "message": "Post not found"
        }
      ```
    - Status code: `400`

  - Motivo
    - O comentário não foi encontrado

  - Resposta desse erro:
    - ```json
        {
          "status": "error",
          "message": "Comment not found"
        }
      ```
    - Status code: `400`

<br>

Desenvolvido com ❤ por [Danilo Vieira](https://github.com/danilo-vieira/)

