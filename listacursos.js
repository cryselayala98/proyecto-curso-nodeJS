let cursos = [
  {
    id:1,
    nombre:'Metodologias de desarrollo Agiles',
    duracion:'25 horas',
    valor:'$35000'
  },
  {
    id:2,
    nombre:'Introduccion a Node.js',
    duracion:'40 horas',
    valor:'Gratuito'
  },
  {
    id:3,
    nombre:'Desarrollo de un Software ERP por medio de implementacion de vistas javaFX',
    duracion:'30 horas',
    valor:'$45000'
  },
  {
    id:4,
    nombre:'Introduccion al Desarrollo Web',
    duracion:'40 horas',
    valor:'$28000'
  }
];

let info_curso=(id,n,d,v,milsec, callback)=>{
  setTimeout(function(){
    let res = 'id: '+id+'\nnombre: '+n+'\nduración: '+d+'\nvalor: '+v+'\n\n';
    callback (res);
  }, milsec);
}

let mostrar_cursos = ()=>{
  let tim=2000;
  console.log('*******LISTA DE CURSOS DISPONIBLES*******\n para inscribir curso digitar id, nombre del estudiante e identificación\n\n');
  for (i = 0; i < cursos.length; i++) {
        info_curso(cursos[i]['id'], cursos[i]['nombre'], cursos[i]['duracion'], cursos[i]['valor'],tim*(i+1), function(resultado){
        console.log(resultado);
      });
  }
}

let buscar_curso = (id_curso)=>{
  let buscar= cursos.find( curso => curso.id == id_curso);
  return buscar;
}

module.exports = {
  cursos,
  buscar_curso,
  mostrar_cursos
};
