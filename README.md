# Payment Service Provider

Versão super simplificada de um Payment Service Provider

## Conteúdo
- [Introdução](#introdução)
- [Descrição](#descrição)
- [Tecnologias](#tecnologias)
- [Começando](#começando)
  - [Defina as variáveis de ambiente](#defina-as-variáveis-de-ambiente)
  - [Executando localmente](#executando-localmente)
  - [Executando os testes](#executando-os-testes)
  - [Acessando a documentação da API](#acessando-a-documentação-da-api)
- [Contribuidor](#contribuidor)

## Introdução

Esse repositório tem como objetivo em ser um sistema de pagamento simplificado usando Node.js.

## Descrição

O sistema oferece os seguintes serviços:
- Criar e editar a conta do usuário recebedor
- Criar transações de ```Débito``` e ```Crédito à vista``` e processar os recebíveis para o recebedor
- Visualizar os recebíveis do usuário

## Tecnologias
O que foi usado:
- **[Docker](https://docs.docker.com)** e **[Docker Compose](https://docs.docker.com/compose/)** para criar o ambiente de desenvolvimento
- **[PostgreSQL](https://www.postgresql.org/)** para gravar os dados e o **[Sequelize](https://sequelize.org/)** como ORM
- **[Jest](https://github.com/facebook/jest)** como um framework de testes
- **[Yarn](https://yarnpkg.com/)** como gerenciador de pacotes

## Começando
Para começar, você deve instalar o **Docker** e **Docker Compose**.
E então, clone o repositório:
```sh
$ git clone https://github.com/anderfilth/payment-service-provider.git
```
Você deve rodar
```
Yarn
```
para instalar as dependências

### Defina as variáveis de ambiente
Copie o arquivo modelo:
```
cp .env.example .env
```
Windows:
```
copy .\.env.example .env
```
Segue um exemplo de configuração da variáveis de ambiente:
```
NODE_ENV=development
PORT=9000

# Auth

TOKEN_SECRET=yourtokensecret
TOKEN_EXPIRES_IN=1h

# Database

DB_DIALECT=postgres
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yoursecret
DB_DATABASE=psp
DB_PORT=5432
DB_MIN_POOL=1
DB_MAX_POOL=50
DB_IDLE=10000
DB_LOGGING=false
```
A expressão para o ```TOKEN_EXPIRES_IN``` pode ser acessado [aqui](https://github.com/zeit/ms)

### Executando localmente
Para rodar localmente, você deve executar o seguinte comando:
```sh
$ docker-compose up
```
### Executando os testes
To run the tests, run the following command:
```sh
$ yarn test
```

### Acessando a documentação da API
O projeto foi escrito usando a documentação interativa do swagger. Para acessar, execute a aplicação ``` yarn start ``` ou ```docker-compose up```
e acesse pela url da aplicação. Exemplo:
```
localhost:9000/docs/
```

---

## Contribuidor

- Anderson R. Santos [Contato](https://www.linkedin.com/in/anderson-ribeiro-dos-santos-a53a1a4b/)
