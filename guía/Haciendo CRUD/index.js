const { argv } = require('./yargs')
const funciones = require('./funciones')

/*almacenar info en archivos JSON*/

///console.log(argv);
//console.log('pos 0 '+ argv._[0]);

let comando = argv._[0];

switch(comando){ //tipo de comando que hago
  case 'inscribir':
    funciones.crear(argv);
  break;

  case 'mostrar':
    funciones.mostrar_listado();
  break;

  case 'mostrar_est':
    funciones.mostrar_est(argv.nombre_est);
  break;

  case 'mostrar_id':
    funciones.mostrar_id(); ////muestra los inscritos con id 1
  break;

  case 'actualizar':
    funciones.actualizar_curso(argv.nombre_est, argv.identificacion_estudiante, argv.id); ////muestra los inscritos con id 1
  break;

  case 'eliminar':
    funciones.eliminar_inscripcion(argv.nombre_est,  argv.id); ////muestra los inscritos con id 1
  break;

  default:
    console.log('no has ingresado comando');
}

/*if(comando == 'inscribir'){
  funciones.crear(argv);
}*/


/*
{ _: [ 'inscribir' ],   -->argv._[0]
  i: 0, --> argv._[1]
  id: 0,   --> argv._[2]
  n: 'maria',
  nombre_est: 'maria',
  c: 1478523,
  identificacion_estudiante: 1478523,
  '$0': 'index' }

*/
