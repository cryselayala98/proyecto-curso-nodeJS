const hbs = require ('hbs');
const funciones = require('./funciones')

/*Mostrar lista de cursos (solo los disponiles)*/
hbs.registerHelper('ver-cursos-disponibles', ()=>{
  let texto = funciones.listar_cursos();
  return texto;
});

hbs.registerHelper('ver-todos-los-cursos', ()=>{
  let texto = funciones.listar_cursos_todos();
  return texto;
});

hbs.registerHelper('ver-inscritos', ()=>{ //ver inscritos a los cursos
  let texto = funciones.ver_inscritos();
  return texto;
});

hbs.registerHelper('listar-estudiantes-select', ()=>{ //ver inscritos a los cursos
  let texto = funciones.listar_est_select();
  return texto;
});
