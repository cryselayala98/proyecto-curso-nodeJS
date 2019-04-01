const fs = require('fs');

inscritos = [];

const crear = (estudiante) =>{
  console.log(estudiante);
  listar(); //cargar en inscritos[] el archivo .json de los estudiantes inscritos
  let est = {
    id_curso : estudiante.id,
    est_nombre : estudiante.nombre_est,
    cedula : estudiante.identificacion_estudiante
  };

  let duplicado = inscritos.find( user =>(user.cedula == estudiante.identificacion_estudiante));
  let duplicado2 = inscritos.find( user2 =>(user2.id_curso == estudiante.id));
  if(!duplicado || !duplicado2){
  inscritos.push(est);
  guardar();
  }else{
  console.log('ya te inscribiste anteriormente');
  }
}

const listar = () =>{
  try{
    inscritos = require('./listaInscritos.json');
  //  lista_inscritos =JSON.parse(fs.readFileSync('listaInscritos.json'));
  }catch(error){
    inscritos = [];
  }
}

const guardar = () =>{
  let datos = JSON.stringify(inscritos);

  fs.writeFile("./listaInscritos.json", datos, (err)=>{
    if (err) throw (err)
      console.log("Archivo creado con exito");
});

}

const mostrar_listado = () =>{
  listar();

  console.log("estudiantes Inscritos en los cursos\n");
  inscritos.forEach( inscrito =>{
    console.log(inscrito.id_curso+"\n"+inscrito.est_nombre+"\n"+inscrito.cedula+"\n");
  });
}

const mostrar_est = (nombre) =>{
  listar();
  let search = inscritos.filter( user =>(user.est_nombre == nombre));
  if(!search){
      console.log('No existe el estudiante');
  }else{
    search.forEach( est =>{
    console.log(est.id_curso+"\n"+est.est_nombre+"\n"+est.cedula+"\n");
    });
}
}

const mostrar_id = () =>{ //muestra los inscritos con id 1
  listar();
  let search = inscritos.filter( user =>(user.id_curso == 1));
  if(search.length == 0) {
      console.log('no existen estudiantes inscritos en ese curso');
  }
  else{
    search.forEach( est =>{
    console.log(est.id_curso+"\n"+est.est_nombre+"\n"+est.cedula+"\n");
    });
  }
}

const actualizar_curso = (nombre_est, identificación, id_curso) =>{ //actualiza el id del curso que va a hacer el estudiante
  listar();

  let search = inscritos.find( user =>(user.est_nombre == nombre_est));
  if(!search){
      console.log('No existe el estudiante');
  }else{
    search['id_curso'] = id_curso;
    guardar();
  }
}

const eliminar_inscripcion = (nombre_est, id_curso) =>{
    listar();

    let nuevo = inscritos.filter(function(user) { //filtrar los estudiantes que no cumplan esas condiciones
      return (user.est_nombre != nombre_est || user.id_curso != id_curso);
    });

    if(nuevo.length == inscritos.length){
        console.log('No existe ningun inscrito con esas características');
    }else{
      inscritos = nuevo;
      guardar();
    }

}

module.exports = {
    crear,
    mostrar_listado,
    mostrar_est,
    mostrar_id,
    actualizar_curso,
    eliminar_inscripcion
};
