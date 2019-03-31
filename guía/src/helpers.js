const hbs = require ('hbs');

hbs.registerHelper('obtener_promedio', (nota1, nota2, nota3)=>{
  return (nota1+nota2+nota3)/3;
})

//listar listado.json y mostrarla en pantalla
hbs.registerHelper('listar', ()=>{
  lista_estudiantes = require('./listado.json')
  let texto="<table> \
            <thead> \
            <th> Nombre Estudiante </th>\
            <th> Matemáticas </th>\
            <th> Inglés </th>\
            <th> Programación </th>\
            </thead>\
            <tbody>";
  lista_estudiantes.forEach(estudiante=>{
    texto = texto+
            '<tr>'+
            '<td>'+ estudiante.nombre+'</td>'+
            '<td>'+ estudiante.matematicas+'</td>'+
            '<td>'+ estudiante.Ingles+'</td>'+
            '<td>'+ estudiante.programacion+'</td>'+
            '</tr>';

  });
  texto = texto+
          '</tbody>'+
          '</table>';
          
  return texto;
});
