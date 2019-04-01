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

app.get('/mis-cursos', (req,res)=>{
  let texto= funciones.listar_cursos_estudiante(req.session.documento);
  res.render('aspirante/mis-cursos',{
    cursos: texto
  });
});

app.post('/relacionar-curso', (req,res)=>{

  let id= req.body.id;
  let validar = funciones.validar_existencia_curso(id); //si ese curso existe

  if(!validar){
    res.render('aspirante/inscribir-curso', {
      error : "El curso no existe"
    });
  }else{

  validar = funciones.registrar_curso_est(req.session.documento, id);
  if(!validar){
    res.render('aspirante/inscribir-curso', {
      error : "Ya se inscribió antes a ese curso"
    });
  }else{
    res.render('aspirante/index-aspirante', {
      success : "Registro de Curso exitoso"
    });
  }
  }
});

app.post('/ini', (req,res)=>{
  let doc=req.body.documento;
  console.log(doc);
  let validar=funciones.validar_usuario_repetido(doc)
  if(validar){
    req.session.documento= doc;
    res.redirect('/principal');


}else{
  res.render('index', {
    error: "El usuario ingresado no existe"
  });
}
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
