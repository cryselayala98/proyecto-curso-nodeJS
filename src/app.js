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

  if(req.session.documento){
    res.redirect('/principal');
  }
  res.render('index');
});

app.get('/mis-cursos', (req,res)=>{
  //let texto= funciones.listar_cursos_estudiante(req.body.documento);
  res.render('aspirante/mis-cursos',{
    cursos: "texto"
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
    req.session.nombre= nombre;
    req.session.correo= correo;
    req.session.telefono= telefono;
    req.session.rol= 'aspirante';
    funciones.registrar_usuario(documento, correo, nombre, telefono);
    res.redirect('/principal');
  }
});
app.get('/principal', (req,res)=>{
  res.render('aspirante/index-aspirante', {
    nombre: req.session.nombre
  });
});

app.get('/ver-cursos-aspirante', (req,res)=>{
  res.render('aspirante/ver-cursos');
});

app.get('/inscribir-curso', (req,res)=>{ //cargar vista registrar curso
  res.render('aspirante/inscribir-curso');
});

app.get('/ver-cursos', (req,res)=>{
  res.render('ver-cursos');
});

app.get('/registrarse', (req,res)=>{ //cargar vista registrarse
  res.render('registrarse');
});

app.get('/ini',(req,res)=>{
  res.render('ini');
});

app.get('/cerrar', (req,res)=>{
  req.session.documento= null;
  req.session.nombre= null;
  req.session.correo= null;
  req.session.telefono= null;
  req.session.rol= null
  res.redirect('/');
});

app.get('*', (req,res)=>{
  res.render('errors',{
    estudiante: 'error',
  })
});

app.listen(3000, ()=>{
  console.log("Escuchando en el Puerto 3000 :3");
});
