# Energia Backend Coding Challenge: Note-taking API

## Challenge Description

Você deverá criar o famoso CRUD. Basicamente, pense que temos um aplicativo onde salvamos nossas notas. Cada usuário terá sua conta com suas devidas notas. Não esqueça que a API é pública, certifique-se de que segue os padrões de segurança e boas práticas. Não se preocupe muito com outras rotas, como a de criar usuário, que foi apenas criada para servir de exemplo. Siga os padrões já estabelecidos no código.

## Docs

http://localhost:3333/docs

## Requirements

1. Implemente estes endpoints:
   - POST /notes - Criar uma nova nota
   - GET /notes - Recuperar todas as notas
   - GET /notes/:id - Recuperar uma nota específica
   - PUT /notes/:id - Atualizar uma nota específica
   - DELETE /notes/:id - Excluir uma nota específica
2. Implemente testes para todos eles
3. Sempre que uma nota for cadastrada, envie um e-mail para o usuário (o conteúdo do e-mail não é relevante, apenas envie uma string "nota criada")
   3.1. Você pode utilizar o Mailtrap para testar.

## User Story

O usuário deve conseguir salvar uma nota, com o título e a descrição (opcional). Ele também deve ter acesso à data de criação desta nota.

## Submission Guidelines

Crie um fork deste projeto, deixe-o público e compartilhe neste [link](https://docs.google.com/forms/d/1X-lUQ15pCoo0zaROdd1OpaIUpIMGyeQw_TpQeKMFkl8/edit)

## Tips

Tente entender como o projeto está rodando antes de começar.
Sempre que tiver dúvida, baseie-se em coisas que já foram feitas no projeto ou procure em fontes confiáveis.
