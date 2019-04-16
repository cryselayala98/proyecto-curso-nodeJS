const fs = require('fs');
const Usuario = require('./models/usuarios');
const Curso = require('./models/listado-de-cursos');
const Curso_est = require('./models/registrados-curso');


lista_cursos =[];
usuarios=[];
usuarios_curso=[];

const validar_usuario_repetido = (documento) =>{
//index
}


//cursos en los que el estudiante está inscrito
const listar_cursos_estudiante = (documento) =>{

  listar_usuarios_cursos();
  let validar = usuarios_curso.filter(function(user) {
    return (user.id_est == documento);
  });

  if(!validar.length){

    return "no estás registrado en ningún curso";
  }
  //buscar info mas especifica de cada curso
  listando_cursos();
  texto = '';
  validar.forEach(val=>{
    let curso = lista_cursos.find(function(curso1) {
      return (curso1.id == val.id_curso);
    });
    texto = texto+
            '<p><strong>Id del curso</strong>: '+ curso.id + '</p>'+
            '<p><strong>Nombre del curso: </strong>' + curso.nombre + '</p>'+
            '<p><strong>Valor del curso: </strong>' + curso.valor+'</p>'+
            '<p><strong>Descripción: </strong>' + curso.descripcion+'</p>'+
            '<p><strong>Modalidad: </strong>' + curso.modalidad+'</p>'+
            '<p><strong>Intensidad: </strong>' + curso.intensidad+'</p>'+
            '<br><br>';
  });
  return texto;
}

const validar_existencia_curso = (id) =>{
  listando_cursos();
  let duplicado = lista_cursos.find( curso =>(curso.id == id));
  return duplicado;
}

registrar_curso_est = (id_est, id_curso)=> {
  listar_usuarios_cursos();

  //validar que el estudiante no se haya registrado antes
  let validar = usuarios_curso.find(function(user) {
    return (user.id_est == id_est && user.id_curso == id_curso);
  });

  if(validar) return undefined;

  let nuevo ={
    id_est: id_est,
    id_curso:id_curso
  };
  usuarios_curso.push(nuevo);
  guardar_nuevo_usuario_curso();
  return true;
}

const guardar_nuevo_usuario_curso =() =>{
  let datos = JSON.stringify(usuarios_curso);
  fs.writeFile("./src/archivos-json/registrados-curso.json", datos, (err)=>{
    if (err){
      throw (err);
    }

  });
}

const registrar_nuevo_curso = (id_curso, nombre, valor, descripcion, modalidad, intensidad) =>{

  let nuevo_curso = new Curso({
    id:id_curso,
    nombre:nombre,
    valor:valor,
    descripcion:descripcion,
    modalidad:modalidad,
    intensidad:intensidad,
    estado:'disponible'
  });

  nuevo_curso.save((err, resultado) => {
    if(err)console.log(err);
  });
}

const registrar_usuario = (documento, correo, nombre, telefono) =>{
  listar_usuarios();
  let aspirante = new Usuario({
    documento : documento,
    telefono : telefono,
    correo : correo,
    nombre : nombre,
    rol : 'aspirante'
  });
  aspirante.save((err, resultado) => {
    if(err)return false;
    //console.log(resultado);
  });
}

let guardar_usuario= () => {
  let datos = JSON.stringify(usuarios);
  fs.writeFile("./src/archivos-json/usuarios.json", datos, (err)=>{
    if (err){
      throw (err);
    }
  });
}

const listar_cursos_todos = () =>{
  listando_cursos();
  let texto = '';
  lista_cursos.forEach(curso=>{
    texto = texto+
            '<p><strong>Id del curso</strong>: '+ curso.id + '</p>'+
            '<p><strong>Nombre del curso: </strong>' + curso.nombre + '</p>'+
            '<p><strong>Valor del curso: </strong>' + curso.valor+'</p>'+
            '<p><strong>Descripción: </strong>' + curso.descripcion+'</p>'+
            '<p><strong>Modalidad: </strong>' + curso.modalidad+'</p>'+
            '<p><strong>Intensidad: </strong>' + curso.intensidad+'</p>'+
            '<p><strong>Estado: ' + curso.estado+'</strong></p>';
    if(curso.estado=='disponible') texto = texto + '<a href="/cerrarCurso?id_curso='+curso.id+'"><i>(Cambiar el estado del curso '+curso.id+' a cerrado)</i></a>'
    texto=texto+'<br><br>';
  });
  return texto;
}

const listar_usuarios = () =>{

  Usuario.find({}).exec((err, respuesta)=>{
      if(err){
        return console.log(err);
      }
    });
}

const listando_cursos = () =>{



}

const listar_usuarios_cursos = () =>{
  try{
    usuarios_curso = require('./archivos-json/registrados-curso.json')
  }catch(error){
    usuarios_curso = [];
  }
}

const cancelar_curso = (id_curso, documento) =>{
  listar_usuarios_cursos();

  let nuevo = usuarios_curso.filter(function(user_curso) { //filtrar los estudiantes que no cumplan esas condiciones
      return (user_curso.id_est != documento || user_curso.id_curso != id_curso);
    });
  usuarios_curso = nuevo;
  guardar_nuevo_usuario_curso();
}

const validar_existencia_curso_estudiante = (id_curso, id_est) =>{
  listar_usuarios_cursos();

  //validar que el estudiante se haya registrado antes al curso
  let validar = usuarios_curso.find(function(user) {
    return (user.id_est == id_est && user.id_curso == id_curso);
  });
  return validar;
}

const cerrar_curso = (id_curso) =>{
  listando_cursos();
  let curso_search = lista_cursos.find( curso =>(curso.id == id_curso));
  curso_search.estado ='cancelado';
  let cursos = lista_cursos.filter( curso =>(curso.id != id_curso));
  cursos.push(curso_search);
  lista_cursos = cursos;
  guardar_cursos();
}

const guardar_cursos = () =>{
  let datos = JSON.stringify(lista_cursos);
  fs.writeFile("./src/archivos-json/listado-de-cursos.json", datos, (err)=>{
    if (err){
      throw (err);
    }

  });
}

const cambiar_rol=(documento, rol) =>{
  listar_usuarios();
  usuario = usuarios.find( user =>(user.documento == documento));
  usuario.rol =rol;
  nueva_lista = lista_cursos.filter(  user =>(user.documento != documento));
  nueva_lista.push(usuario);
  guardar_usuario();
}

module.exports = {
  validar_usuario_repetido,
  registrar_usuario,
  validar_existencia_curso,
  registrar_curso_est,
  listar_cursos_estudiante,
  cancelar_curso,
  validar_existencia_curso_estudiante,
  listar_cursos_todos,
  cerrar_curso,
  registrar_nuevo_curso,
  cambiar_rol
};
