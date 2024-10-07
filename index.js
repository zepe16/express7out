//npm init
//npm install express
//npm install nodemon
//npm install --save-dev nodemon

const express = require('express')
const nodemon = require('nodemon')
const app = express()
const port = 3000
const path = require('path')
const basePath= path.join(__dirname, 'templates')
const exphbs = require('Express-Handlebars')

app.engine('handlebars', exphbs.engine())

app.set('view engine', 'handlebars')

app.get('/', (req,res) => {
    res.render('home', {layout:false})
})

app.listen(port)

// Ler o body
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.get('/users/add',(req,res) => {
    res.sendFile(`${basePath}/form.html`)
})

// Arquivos estáticos
app.use(express.static('public'))

app.post('/users/save', (req,res) => {
    console.log(req.body)
    const name = req.body.name
    const email = req.body.email
    console.log(name)
    console.log(email)
})

app.get('/users/:id',(req,res) => {
    const id = req.params.id
    // leitura, resgatar um usuário do banco de dados
    console.log(`Estamos buscando pelo usuário: ${id}`)
    res.sendFile(`${basePath}/users.html`)
})

app.get('/',(req,res) => {
    res.sendFile(`${basePath}/index.html`)
}) //faz uma requisição e espera uma resposta dela



// var checkAuth = function(req,res,next){
//     req.authStatus = true

//     if(req.authStatus){
//         console.log('Está Logado')
//         next()
//     } else {
//         console.log('Não Está Logado')
//     }
// }

// app.use(checkAuth)