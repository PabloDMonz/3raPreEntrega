// Función para calcular el promedio de un array de calificaciones
function calcularPromedio(calificaciones) {
    const suma = calificaciones.reduce((acumulador, sumando) => acumulador + sumando);
    return suma / calificaciones.length;
}

// Función para determinar si una materia está aprobada o no
function estaMateriaAprobada(promedio) {
    return promedio >= 6; 
}

// Función para guardar los datos en el localStorage
function guardarDatos() {
    const datos = {
        numMaterias: parseInt(document.getElementById("num-materias").value),
        numAlumnos: parseInt(document.getElementById("num-alumnos").value),
        materias: [],
        alumnos: []
    };

    document.querySelectorAll('#listas input[type="text"]').forEach(input => {
        if (input.placeholder.includes('materia')) {
            datos.materias.push(input.value);
        } else if (input.placeholder.includes('alumno')) {
            datos.alumnos.push(input.value);
        }
    });

    localStorage.setItem('datosCalificaciones', JSON.stringify(datos));
}

// Función para cargar los datos desde el localStorage
function cargarDatos() {
    const datos = JSON.parse(localStorage.getItem('datosCalificaciones'));

    if (datos) {
        document.getElementById("num-materias").value = datos.numMaterias;
        document.getElementById("num-alumnos").value = datos.numAlumnos;

        const materiasInputs = document.querySelectorAll('#listas input[type="text"][placeholder^="Nombre de la materia"]');
        datos.materias.forEach((materia, index) => {
            materiasInputs[index].value = materia;
        });

        const alumnosInputs = document.querySelectorAll('#listas input[type="text"][placeholder^="Nombre del alumno"]');
        datos.alumnos.forEach((alumno, index) => {
            alumnosInputs[index].value = alumno;
        });
    }
}

// Función para generar las listas de calificaciones
function generarListas() {
    const listasDiv = document.getElementById("listas");
    listasDiv.innerHTML = "";

    const numMaterias = parseInt(document.getElementById("num-materias").value);
    const numAlumnos = parseInt(document.getElementById("num-alumnos").value);

    // Generar inputs para los nombres de las materias
    const materiasInputs = [];
    for (let i = 0; i < numMaterias; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Nombre de la materia ${i + 1}`;
        materiasInputs.push(input);
    }

    // Generar inputs para los nombres de los alumnos
    const alumnosInputs = [];
    for (let i = 0; i < numAlumnos; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Nombre del alumno ${i + 1}`;
        alumnosInputs.push(input);
    }

    // Agregar los inputs al documento
    const materiasDiv = document.createElement("div");
    materiasDiv.innerHTML = "<h2>Materias</h2>";
    materiasInputs.forEach(input => materiasDiv.appendChild(input));
    listasDiv.appendChild(materiasDiv);

    const alumnosDiv = document.createElement("div");
    alumnosDiv.innerHTML = "<h2>Alumnos</h2>";
    alumnosInputs.forEach(input => alumnosDiv.appendChild(input));
    listasDiv.appendChild(alumnosDiv);

    // Botón para generar las calificaciones
    const buttonCalificar = document.createElement("button");
    buttonCalificar.textContent = "Calificar";
    buttonCalificar.onclick = function() {
        guardarDatos();

        const calificacionesDiv = document.createElement("div");
        calificacionesDiv.innerHTML = "<h2>Calificaciones</h2>";

        for (const alumnoInput of alumnosInputs) {
            const alumnoNombre = alumnoInput.value;
            const alumnoDiv = document.createElement("div");
            alumnoDiv.innerHTML = `<h3>${alumnoNombre}</h3>`;

            for (let i = 0; i < numMaterias; i++) {
                const materiaNombre = materiasInputs[i].value;
                const materiaDiv = document.createElement("div");
                materiaDiv.innerHTML = `<h4>${materiaNombre}</h4>`;

                const inputNota1 = document.createElement("input");
                inputNota1.type = "number";
                inputNota1.placeholder = `Calificación 1 para ${materiaNombre}`;
                materiaDiv.appendChild(inputNota1);

                const inputNota2 = document.createElement("input");
                inputNota2.type = "number";
                inputNota2.placeholder = `Calificación 2 para ${materiaNombre}`;
                materiaDiv.appendChild(inputNota2);

                const buttonCalcular = document.createElement("button");
                buttonCalcular.textContent = "Calcular Promedio";
                buttonCalcular.onclick = function() {
                    const calificacion1 = parseInt(inputNota1.value);
                    const calificacion2 = parseInt(inputNota2.value);
                    const promedio = calcularPromedio([calificacion1, calificacion2]);
                    const aprobada = estaMateriaAprobada(promedio);
                    const promedioDiv = document.createElement("div");
                    promedioDiv.textContent = `Promedio: ${promedio.toFixed(2)} - Condición: ${aprobada ? 'Aprobado' : 'Reprobado'}`;
                    materiaDiv.appendChild(promedioDiv);
                };
                materiaDiv.appendChild(buttonCalcular);

                alumnoDiv.appendChild(materiaDiv);
            }

            calificacionesDiv.appendChild(alumnoDiv);
        }

        listasDiv.appendChild(calificacionesDiv);
    };
    listasDiv.appendChild(buttonCalificar);

    cargarDatos(); // Cargar datos al cargar la página
}

generarListas(); // Llamar a la función para generar las listas al cargar la página


