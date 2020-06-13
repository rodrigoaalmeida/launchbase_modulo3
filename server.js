const express = require('express')
const nunjucks = require('nunjucks')

const videos = require("./data")
const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

//=== rotas ===
server.get("/", function(req, res){
    const sobre = {
        avatar_url: "https://avatars1.githubusercontent.com/u/42939426?s=460&u=6a2a721b6e94d314acebc0ceedd5113824010b10&v=4",
        name: "Rodrigo Almeida",
        role: "Programador júnior - Freelancer",
        description: `<a href="https://github.com/rodrigoaalmeida" target="_blank">Programador</a> em aprendizado contínuo,
         tenho a meta de trabalhar na área antes de chegar aos trinta e cinco anos, e pretendo me aposentar por ela algum
          dia, para isso estou aprendendo web e inglês.`,
        links: [
            {name: "Github", url: "https://github.com/rodrigoaalmeida"},
            {name: "Linkedin", url: "https://www.linkedin.com/in/rodrigo-andrade-de-almeida-a65b97167/"}
        ]
    }

    return res.render("sobre", {sobre})
})

server.get("/portfolio", function(req, res){
    return res.render("portfolio", { items: videos})
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send("Video not found!")
    }
    
    return res.render("video", { item: video })
})

//informa a porta que o servidor fica ouvindo
server.listen(5000, function(){
    console.log("Server is running")
})

//usando dados dinamicos