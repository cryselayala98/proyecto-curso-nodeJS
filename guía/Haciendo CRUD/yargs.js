const id={
  demand:true,
  default:5,
  alias:'i'
}

const nombre_est={
  demand:true,
  default:'sin nombre',
  alias:'n'
}

const identificacion_estudiante={
  demand:true,
  default:0,
  alias:'c'
}

const muestra_est ={
  nombre_est
}

const actualiza={
  nombre_est,
  identificacion_estudiante,
  id
/*  id : { //id curso que va a hacer, en el caso que no exista esa constante
    demand:true,
    default:5,
    alias:'i'
  }*/
}

const elimina={ //eliminar inscripcion a curso
  nombre_est,
  id
}

const creacion ={
  id,
  nombre_est,
  identificacion_estudiante
}

const argv = require('yargs')
            .command('inscribir', 'inscribir un curso', creacion)
            .command('mostrar', 'listar los inscritos en los cursos')
            .command('mostrar_est', 'mostrar un estudiante en especifico', muestra_est)
            .command('actualizar', 'actualizar el curso que voy a hacer', actualiza)
            .command('eliminar', 'dar de baja a un inscrito', elimina)
            .command('mostrar_id', 'mostrando id')
            .argv

module.exports = {
    argv
};
