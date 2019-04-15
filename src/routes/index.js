const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const funciones = require('./../funciones')
var cookieSession = require('cookie-session')

const dir_views = path.join(__dirname, '../../views');
const directorio_partials =  path.join(__dirname, '../../partials');

app.set('view engine', 'hbs');
app.set('views', dir_views);
hbs.registerPartials(directorio_partials);
require('./../helpers')

app.use(cookieSession({
  name: 'session',
  keys: ['123456'],
  maxAge: 24 * 60 * 60 * 1000
}));

const aja = () =>{
  return req.session.documento;
}

app.get('/', (req,res)=>{

  if(req.session.documento){
    res.redirect('/principal');
  }
  res.render('index');
});

app.get('/mis-cursos', (req,res)=>{
  let texto= funciones.listar_cursos_estudiante(req.session.documento);
  res.render('aspirante/mis-cursos',{
    cursos: texto
  });
});

app.post('/dar_baja_curso', (req,res)=>{
  let id= req.body.id;
  let validar = funciones.validar_existencia_curso_estudiante(id, req.session.documento); //si ese curso existe
  let texto= funciones.listar_cursos_estudiante(req.session.documento);


  if(!validar){
    res.render('aspirante/mis-cursos', {
      cursos: texto,
      error : "No estás registrado a ese curso"
    });
  }else{

    funciones.cancelar_curso(id, req.session.documento);

    res.render('aspirante/index-aspirante', {
      cursos: texto,
      success : "Cancelación de curso exitosa"
    });
  }
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
    res.render('aspirante/inscribir-curso', {
      success : "Registro de Curso exitoso"
    });
  }
  }
});

app.post('/iniciar', (req,res)=>{
  let documento= req.body.documento;
  let validar_repetido = funciones.validar_usuario_repetido(documento);

  if(!validar_repetido){
    res.render('index', {
      error: "El usuario no existe"
    });
  }else{
    req.session.nombre= validar_repetido.nombre;
    req.session.documento= validar_repetido.documento;
    req.session.correo= validar_repetido.correo;
    req.session.telefono= validar_repetido.telefono;
    req.session.rol= validar_repetido.rol;
    res.redirect('/principal');

  }
});

app.post('/registrar-curso', (req,res)=>{
  let id_curso=req.body.id_curso;
  let nombre=req.body.nombre;
  let valor=req.body.valor;
  let descripcion=req.body.descripcion;
  let modalidad=req.body.modalidad;
  let intensidad=req.body.intensidad;

  let registrar = funciones.registrar_nuevo_curso(id_curso, nombre, valor, descripcion, modalidad, intensidad);

  if(!registrar){
    res.render('coordinador/crear-curso', {
      error: "Este curso ya existe"
    });
  }else{
    res.render('coordinador/crear-curso', {
      success: "Curso registrado con exito"
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

    funciones.registrar_usuario(documento, correo, nombre, telefono);

    req.session.documento= documento;
    req.session.nombre= nombre;
    req.session.correo= correo;
    req.session.telefono= telefono;
    req.session.rol= 'aspirante';
    res.redirect('/principal');
  }
});

app.get('/principal', (req,res)=>{
//  console.log(req.session.nombre);
  if(req.session.rol=='aspirante'){
    res.render('aspirante/index-aspirante', {
      nombre: req.session.nombre
    });
  }else{
    res.render('coordinador/index-coordinador', {
      nombre: req.session.nombre
    });
  }

});

app.get('/inscribir-curso', (req,res)=>{ //cargar vista registrar curso
  res.render('aspirante/inscribir-curso');
});

app.get('/ver-cursos', (req,res)=>{

  if(!req.session.rol){
    res.render('ver-cursos');
  }else if(req.session.rol=='aspirante'){
    res.render('aspirante/ver-cursos');
  }else{
    res.render('coordinador/ver-cursos');
  }
});

app.get('/cerrarCurso', (req,res)=>{ //cerrar un curso que está disponible; recibe una url tipo (http://localhost:3000/cerrarCurso?id_curso=4)

  let id_curso = req.query.id_curso;
  funciones.cerrar_curso(id_curso);
  res.render('coordinador/index-coordinador',{
    success: 'El curso '+ id_curso +' se ha cerrado'
  })
});

app.get('/eliminar-user-curso', (req,res)=>{
  let documento = req.query.documento;
  let id_curso = req.query.id_curso;
  funciones.cancelar_curso(id_curso,documento);

  res.render('coordinador/index-coordinador', {
    success : "Se ha liberado un cupo"
  });
});

app.get('/registrarse', (req,res)=>{ //cargar vista registrarse
  res.render('registrarse');
});

app.get('/ini',(req,res)=>{
  res.render('ini');
});

app.get('/crear-curso',(req,res)=>{
  res.render('coordinador/crear-curso');
});

app.get('/inscritos',(req,res)=>{
  res.render('coordinador/inscritos');
});

app.get('/cambiar-rol',(req,res)=>{
  res.render('coordinador/roles');
});

app.post('/cambiar-rol-user',(req,res)=>{
  let documento = req.body.documento;
  let rol = req.body.rol;
  if(req.session.documento == documento){
    res.render('coordinador/roles',{
      error: 'Tu no puedes cambiar de rol'
    })
  }else{
  funciones.cambiar_rol(documento, rol);

  res.render('coordinador/index-coordinador',{
    success: 'El usuario ha sido cambiado de rol exitosamente'
  })
}

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
    estudiante: 'error'
  })
});


module.exports = app
