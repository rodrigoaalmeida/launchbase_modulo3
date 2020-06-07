const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server
})

//=== rotas ===
server.get("/", function(req, res){
    return res.render("sobre")
})

server.get("/portfolio", function(req, res){
    return res.render("portfolio")
})

//informa a porta que o servidor fica ouvindo
server.listen(5000, function(){
    console.log("Server is running")
})

//usando dados dinamicos