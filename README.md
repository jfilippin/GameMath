# GameMath
Projeto integrador feito durante o 3° semestre do curso de graduação em Análise e Desenvolvimento de Sistemas do SENAI/CTAI de Florianópolis, SC.
Trata-se de um jogo de matemática feito para alunos do ensino fundamental, onde o objetivo é responder 10 (dez) questões de adição, multiplicação ou subtração, obtendo pontos a cada questão respondida corretamente.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Grupo:
Fernando Jacques, Jarod Filippin e Sávio Magalhães
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Como rodar a aplicação?
Para rodar a aplicação, nós recomendamos utilizar duas instância t2.micro (em uma, o backend e banco de dados, e na outra o frontend) com Ubuntu 20.04 com as seguintes tecnologias instaladas:

    Maquina 1 (Backend e banco de dados):
      > Node.js;
      > express;
      > cors;
      > knex;
      > mysql2;
      > jsonwebtoken;
      > dotenv;
      > hashcode;
      (Para os pacotes do node, instale com o comando 'npm install express cors knex mysql2 jsonwebtoken dotenv hashcode')
      
    Maquina 2 (Frontend):
    > React.js;
    > Bootstrap;  
    > jQuery; 
     
Crie o banco de dados, apartir do arquivo DB.txt. Para isso abra o mysql, e insera as linhas de comando com ";" no final.

Crie uma pasta chamada frontend e uma pasta chamada backend
Execute o comando "npx create-react-app frontend". Acesse a pasta src e remova quase todos os arquivos, com exceção do App.js

Dentro da pasta frontend, cole os arquivos presentes na pasta frontend deste repositório.
Após isso, cole os arquivos da pasta backend deste repositório na sua pasta backend.

Voltando para a sua pasta frontend agora, entre em "src/components" e edite os todos os arquivos presentes nesta pasta com qualquer editor de texto que tenha disponível.
Em todos os locais onde houver um fetch, substitua o DNS público presente ali dentro pelo DNS público da sua máquina com o React.js instalado. Atente-se para o número presente após os dois pontos (:) do DNS público que está definido por padrão dentro destes arquivos. Você deve manter ele como 3000, pois caso o modifique, causará erros na aplicação. 

Feito isso, a parte do cliente deve estar pronta para rodar em sua aplicação. Execute o comando "yarn start" dentro da pasta frontend (e 'node server.js' dentro da pasta backend). Caso tudo corra conforme o planejado, você deve ver dois endereço: um com localhost e outro com o IP da sua máquina virtual. Acesse o navegador insira o DNS público da sua máquina na barra de pesquisa com :3000/login no final.

Faça login e divirta-se jogando.


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


