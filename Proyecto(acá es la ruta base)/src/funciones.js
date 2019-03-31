const fs = require('fs');

lista_cursos =[];
usuarios=[];



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

module.exports = {
  listar_cursos
};
