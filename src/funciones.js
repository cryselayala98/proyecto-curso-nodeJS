const fs = require('fs');

lista_cursos =[];
usuarios=[];
usuarios_curso=[];

const validar_usuario_repetido = (documento) =>{
  listar_usuarios();
  console.log(usuarios.length);
  let duplicado = usuarios.find( user =>(user.documento == documento));
  if(!duplicado){
    return false;
  }
  return duplicado;

}

//cursos en los que el estudiante está inscrito
const listar_cursos_estudiante = (documento) =>{

  listar_usuarios_cursos();
  let validar = usuarios_curso.filter(function(user) {
    return (user.id_est == documento);
  });
  console.log(validar);
  if(!validar.length){
    console.log("no tienes cursos");
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
    console.log("Usuario Registrado");
  });

}

const registrar_usuario = (documento, correo, nombre, telefono) =>{
  listar_usuarios();
  let aspirante = {
    documento : documento,
    telefono : telefono,
    correo : correo,
    nombre : nombre,
    rol : 'aspirante'
  };

  usuarios.push(aspirante);

  guardar_usuario();
}

let guardar_usuario= () => {
  let datos = JSON.stringify(usuarios);
  fs.writeFile("./src/archivos-json/usuarios.json", datos, (err)=>{
    if (err){
      throw (err);
    }
    console.log("Usuario Registrado");
  });

}

const listar_cursos = () =>{

    cursos = require('./archivos-json/listado-de-cursos.json')
    let texto = "<br> \
                 <br>";
    cursos.forEach(curso=>{
      if(curso.estado=='disponible'){
      texto = texto+
              '<p><strong>Id del curso</strong>: '+ curso.id + '</p>'+
              '<p><strong>Nombre del curso: </strong>' + curso.nombre + '</p>'+
              '<p><strong>Valor del curso: </strong>' + curso.valor+'</p>'+
              '<p><strong>Descripción: </strong>' + curso.descripcion+'</p>'+
              '<p><strong>Modalidad: </strong>' + curso.modalidad+'</p>'+
              '<p><strong>Intensidad: </strong>' + curso.intensidad+'</p>'+
              '<br><br>';
      }
    });
    return texto;
}

const listar_usuarios = () =>{
  try{
    usuarios = require('./archivos-json/usuarios.json')
  }catch(error){
    usuarios = [];
  }
}

const listando_cursos = () =>{
  try{
    lista_cursos = require('./archivos-json/listado-de-cursos.json')
  }catch(error){
    lista_cursos = [];
  }
}

const listar_usuarios_cursos = () =>{
  try{
    usuarios_curso = require('./archivos-json/registrados-curso.json')
  }catch(error){
    usuarios_curso = [];
  }
}

module.exports = {
  listar_cursos,
  validar_usuario_repetido,
  registrar_usuario,
  validar_existencia_curso,
  registrar_curso_est,
  listar_cursos_estudiante
};
