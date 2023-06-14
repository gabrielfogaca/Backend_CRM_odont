<!-- Paraa rodar o projeto baixado
instalar todas as dependencias indicada pelo package.json

### NPM INSTALL

Rodar o projeto

### node app.js

SEQUENCIA PARA CRIAR O PROJETO Criar o arquivo package

### npm init

Instalar o MySQL

### npm install --save mysql2

Instalar as seguintes dependencias para o servidor:

### npm install express

### npm install express-session

### npm install express-fileupload

### npm install cors

Instalar a dependenciade forma global. Executar o comando atraves do prompt, e somente se nunca instalou a dependencia na maquina, apos instalar, reinicar o PC.

### npm install -g nodemon

Instalar a dependencia como desenvolvedor para reiniciar o servidor sempre que houver alteração no codigo fonte.

### npm install --save-dev nodemon

Rodar o projeto usando o nodemon

caso o nodemon não esteja funcionando abra o powershell como administrador e execute a linha de comando:

### Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

O nodemon serve para cada vez que salvar as alterações, inicializar o app.js

### nodemon app.js -->

Para rodar esse projeto, basta executar os seguintes comandos:

    Primeiramente, há um arquivo chamado '.env.example'. Nele contém as váriaveis de ambiente que devem ser adicionadas no arquivo '.env', o qual deve ser criado na raiz do projeto. (OBS: pegar os valores das variáveis com os desenvolvedores do projeto)

    Após criar o arquivo '.env' e colocar os seus valores, os seguintes comandos devem ser executadas:

    OBS: retirar as aspas simples (')

        -> 'npm install' ou 'yarn' ----------- comando para baixar todas as dependências do projeto
        -> 'npm start'             ----------- comando para iniciar o projeto
