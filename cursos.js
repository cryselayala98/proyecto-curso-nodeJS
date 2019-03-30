const {listado_de_cursos, buscar_curso, mostrar_cursos} = require('./listacursos');
const fs = require('fs');

const opciones={
  id:{
    default:5,
    alias:'i'
  },
  nombre_est:{
    default:'sin nombre',
    alias:'n'
  },
  identificacion_estudiante:{
    default:0,
    alias:'c'
  }
}

let matricularse = (opcion)=>{

  texto = '*****NUEVA PREMATRICULA*****\nId Curso: '+opcion['id']+'\nCurso Preinscrito: '+opcion['nombre']+
  '\nNumero de horas: '+opcion['duracion']+'\nValor: ='+opcion['valor']+'\nNombre del estudiante: '+argv.nombre_est+
  '\nIdentificacion del Estudiante: '+argv.identificacion_estudiante+'\n';

  fs.writeFile("./matriculas.txt", texto, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("Se ha Generado la Matrícula");
});

}

const argv = require('yargs')
            .command('inscribir', 'inscribir un curso', opciones)
            .argv

if(argv._[0]=='inscribir'){//modulo inscribir curso
  let opcion = buscar_curso(argv.id);
  if(!opcion || argv.nombre_est=='sin nombre' || argv.identificacion_estudiante==0){ //digitar todos los datos
    console.log('Opción Incorrecta.\n\n');
    mostrar_cursos();
  }else {
    matricularse(opcion);
  }

}else{
  mostrar_cursos();
}
