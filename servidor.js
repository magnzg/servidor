// Servidor -> servidor.js

// Importar os módulos necessários 
const http = require('http') // módulo para criar servidor HTTP
const fs = require('fs') //Módulo para manipular arquivos
const caminho = require('path')
//Módulo para manipular o caminho dos arquivos

//Definir portar e host
const porta = 3000
const host = 'localhost'

//Criando o servidor 
const servidor = http.createServer((requisicao, resposta)=> {
    if(requisicao.url === '/') {
        //Verifica se o usuário acessou a página principal
        const caminhoArquivo = caminho.join(__dirname, 'index.html')
        //Lê o arquivo HTML e envia a resposta
        fs.readFile(caminhoArquivo, (erro, conteudo) => {
            if(erro) {
                resposta.writeHead(500)
                resposta.end("Erro ao ler arquivo HTML")
                return
            }
            resposta.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
                resposta.end(conteudo)
        })
    }
    else if (requisicao.url === '/mensagem') {
        // verifica se o usuario acesssou a rota / mensagem
        resposta.writeHead(200, {'Content-Type': 'text/plain ; carset=utf8'}) 
        resposta.end("Olá, esse é uma mensagem do servido HTTP")
    }
    else { //Caso a rota não exista
        resposta.writeHead(404)
        resposta.end("Página não encontrada")
    }
})

//Iniciar o servidor
servidor.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`)
})