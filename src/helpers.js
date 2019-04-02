const hbs = require ('hbs');
const funciones = require('./funciones')

hbs.registerHelper('obtener_promedio', (nota1, nota2, nota3)=>{
  return (nota1+nota2+nota3)/3;
})

/*Mostrar lista de cursos (solo los disponiles)*/
hbs.registerHelper('ver-cursos-disponibles', ()=>{
  let texto = funciones.listar_cursos();
  return texto;
});
