const hbs = require ('hbs');
const funciones = require('./funciones')

/*Mostrar lista de cursos (solo los disponiles)*/
hbs.registerHelper('ver-cursos-disponibles', (cursos)=>{
  let texto = '<table class: "table table-striped table-hover">'+
               '<thead class= "thead black">'+
               '<th>id</th>'+
               '<th>nombre</th>'+
               '<th>valor</th>'+
               '<th>descripcion</th>'+
               '<th>modalidad</th>'+
               '<th>intensidad</th>'+
               '</thead>'+
               '<tbody>';

   cursos.forEach(curso => {
     if(curso.estado=='disponible'){
     texto = texto +
     '<tr>'+
     '<td>'+curso.id+'</td>'+
     '<td>'+curso.nombre+'</td>'+
     '<td>'+curso.valor+'</td>'+
     '<td>'+curso.descripcion+'</td>'+
     '<td>'+curso.modalidad+'</td>'+
     '<td>'+curso.intensidad+'</td>'+
     '</tr>';
   }
   });

   texto = texto + '</tbody> </table>';
   return texto;
});

hbs.registerHelper('ver-todos-los-cursos', (cursos)=>{
  let texto = '<table class: "table table-striped table-hover">'+
               '<thead class= "thead black">'+
               '<th>id</th>'+
               '<th>nombre</th>'+
               '<th>valor</th>'+
               '<th>descripcion</th>'+
               '<th>modalidad</th>'+
               '<th>intensidad</th>'+
               '<th>estado</th>'
               '</thead>'+
               '<tbody>';

   cursos.forEach(curso => {
     texto = texto +
     '<tr>'+
     '<td>'+curso.id+'</td>'+
     '<td>'+curso.nombre+'</td>'+
     '<td>'+curso.valor+'</td>'+
     '<td>'+curso.descripcion+'</td>'+
     '<td>'+curso.modalidad+'</td>'+
     '<td>'+curso.intensidad+'</td>'+
     '<td>'+curso.estado+'</td>'+
     '</tr>';
   });

   texto = texto + '</tbody> </table>';
   return texto;
});

hbs.registerHelper('ver-inscritos', (cursos, usuarios, usuarios_curso)=>{ //ver inscritos a los cursos

  let texto = '';
  hay_registrados=false;

  lista_cursos.forEach(curso=>{
    if(curso.estado=='disponible'){
    let usuarios_act = usuarios_curso.filter(user => (user.id_curso == curso.id));
    if(usuarios_act.length>0){
      hay_registrados=true;
      texto = texto + '<h3>Para el curso "'+curso.nombre+'"</h3><br>';
      usuarios_act.forEach(user=>{ //recorrer cada usuario
      let usuario_aux = usuarios.find( user2 =>(user2.documento == user.id_est));
      texto = texto + '<p><strong>Nombre del Usuario</strong>: '+ usuario_aux.nombre +
              '  <a href="/eliminar-user-curso?documento='+usuario_aux.documento+
              '&id_curso='+curso.id+'">(Eliminar de este curso)</a>'+'</p><br>';  //dar de baja a un estudiante
      });
      texto = texto+ '<br><br>';
    }
  }
  });

  if(!hay_registrados)texto = 'No hay Estudiantes Registrados en los Cursos';

  return texto;
});

hbs.registerHelper('listar-estudiantes-select', (usuarios)=>{ //ver inscritos a los cursos
  let texto ='';
  usuarios.forEach(user=>{
    texto = texto + '<option value="'+user.documento+'">'+user.nombre+' ('+user.rol+')</option>';
  });

  return texto;
});
