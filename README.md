# Documentação do projeto

Entre em cada uma das pastas front e back depois crei um arquivo .env em cada um copie o conteudo do .env.sample dentro dele.

No mobile cole o conteudo do .env.sample em um arquivo .env.development.

Lembre de colocar sua key da openai na env OPENAI_API_KEY, retire ela nesse link:

- [Open AI Plataform](https://openai.com/api/)

Quando estiver configurando o .env da api descubra o ip da sua maquina e coloque na env DATABASE_URL, faça isso ultilizando os seguintes comandos:

MacOS:

```
ipconfig getifaddr en0
```

Linux:

```
hostname -I
```

Windows:

```
ipconfig
```

Baixe as dependencias de cada projeto com o comando node de sua preferencia e rode o projeto com os respectivos comandos.

no back rode o comando docker para subir a api e o banco de dados

```
docker-compose up --build
```

apos baixar as dependencias no mobile rode os seguintes comandos

```
pnpm ios
```

ou

```
pnpm android
```

## Decisões tecnicas

Decidi ultilizar docker na api para facilitar na hora de subir o banco, ja que com isso o banco e a api sobem juntos.

Ja no mobile eu decidir usar a lib gluestack ui para me auxiliar na criação dos componentes, o que me ajudou bastante a ganhar tempo na criação das telas.
