//PARA EJECUTAR   //nodemon src/app -e js,hbs

const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
require('./helpers')
const funciones = require('./funciones')
const session = require('express-session')


const directorio_publico = path.join(__dirname, '../public');
const directorio_partials =  path.join(__dirname, '../partials');
app.use(express.static(directorio_publico))
hbs.registerPartials(directorio_partials);
app.use(bodyParser.urlencoded({ extended : false }))
app.use(session({secret: '123456', resave: true, saveUninitialized: true}));


app.set('view engine', 'hbs');
app.get('/', (req,res)=>{
  res.render('index');
});

app.post('/registrar-user', (req,res)=>{
  let documento= req.body.documento;
  let correo= req.body.correo;
  let nombre= req.body.nombre;
  let telefono= req.body.telefono;

  let validar_repetido = funciones.validar_usuario_repetido(documento);

  if(validar_repetido){
    res.render('index', {
      error: "Ya existe este usuario"
    });
  }
  else{
    req.session.documento= documento;
    res.render('aspirante/index-aspirante', {
      nombre: nombre
    });
  }

  //res.redirect('/');
});

app.get('/ver-cursos', (req,res)=>{
  res.render('ver-cursos', {
    estudiante: req.body.estudiante,
    nota1: parseInt(req.body.nota1),
    nota2: parseInt(req.body.nota2),
    nota3: parseInt(req.body.nota3)
  });
});

app.get('/registrarse', (req,res)=>{
  res.render('registrarse');
});

app.get('*', (req,res)=>{
  res.render('errors',{
    estudiante: 'error',
  })
});

app.listen(3000, ()=>{
  console.log("Escuchando en el Puerto 3000 :3");
});
