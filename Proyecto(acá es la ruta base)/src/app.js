//PARA EJECUTAR   //nodemon src/app -e js,hbs

const express = require('express')
const app = express()
const path = require('path')  //permite crear una ruta
const hbs = require('hbs')
const bodyParser = require('body-parser')
require('./helpers')


const directorio_publico = path.join(__dirname, '../public');
const directorio_partials =  path.join(__dirname, '../partials');
app.use(express.static(directorio_publico))
hbs.registerPartials(directorio_partials);
app.use(bodyParser.urlencoded({ extended : false }))
//console.log(__dirname);  //__dirname es la carpet raiz
/*app.get('/', function (req, res) {
  res.send('Hello World')
})*/
/*Importando otros archivos para visualizar. muestra todo lo que hay en public y por defecto muestra de primero index*/

//app.use(express.static(__dirname + '/public'))  //no se usa porque debo moverme entre directorios

//app.listen(3000)

/*Configurando HBS*/

app.set('view engine', 'hbs');
//cuando no se escriba una dirección se redirecciona a index.html
app.get('/', (req,res)=>{
//  console.log(req.query);
  //capturar dados desde acá -> //http://localhost:3000/?estudiante=marta&nota1=345&nota2=345&nota3=345
  res.render('index', {
    estudiante: req.body.estudiante,
    nota1: parseInt(req.body.nota1),
    nota2: parseInt(req.body.nota2),
    nota3: parseInt(req.body.nota3)
  });
});

app.get('/registrarse', (req,res)=>{
  res.render('registrarse', {
    estudiante: req.body.estudiante,
    nota1: parseInt(req.body.nota1),
    nota2: parseInt(req.body.nota2),
    nota3: parseInt(req.body.nota3)
  });
});

app.get('/ver-cursos', (req,res)=>{
  res.render('ver-cursos', {
    estudiante: req.body.estudiante,
    nota1: parseInt(req.body.nota1),
    nota2: parseInt(req.body.nota2),
    nota3: parseInt(req.body.nota3)
  });
});

app.get('*', (req,res)=>{
  res.render('errors',{
    estudiante: 'error',
  })
});

app.listen(3000, ()=>{
  console.log("Escuchando en el Puerto 3000 :3");
});
