// Preguntas a evaluar
let preguntas = []
let resultados = []
let preguntaActual = 0

function mostrarSiguientePregunta() {

    preguntaActual++
    localStorage.setItem("preguntaActual", preguntaActual)

    if (preguntaActual >= preguntas.length) {
        mostrarResultados()
    } else {        
        mostrarPregunta(preguntaActual)
    }    
}

function crearRespuesta(respuesta, i) {
    
    const div = document.createElement("div")
    const indice = i + 1
    div.innerText = indice.toString() + ". "

    const btn = document.createElement("button")
    btn.className = "option btn btn-primary mb-1"
    btn.innerText = respuesta.text

    btn.onclick = () => {
        seleccionarResultado(respuesta)
    }   
    
    div.appendChild(btn)     
    return div
}

function mostrarPregunta(indice) {    
    
    const pregunta = preguntas[indice]
    const respuestas = pregunta.a

    const container = document.getElementById("option-container")

    document.getElementById("option-container").innerHTML = ""

    //renderizo las respuestas
    respuestas.map((respuesta, i) => {
        const respuestaDiv = crearRespuesta(respuesta, i)
        container.appendChild(respuestaDiv)
    })
    
    //renderizo la pregunta
    const question = document.getElementById("question")
    question.innerHTML = "<span style='color: blue'>" + (parseInt(indice) + 1)  + "</span>.- " +  pregunta.q  
}

function seleccionarResultado(respuesta) {

    const valorRespuesta = respuesta.isCorrect

    Swal.fire({
        position: 'top-end',
        icon: respuesta.isCorrect ? 'success' : 'error',
        title: 'Respuesta ' + (respuesta.isCorrect ? 'Correcta' : "Incorrecta"),
        showConfirmButton: false,
        timer: 1000
    })

    resultados.push(valorRespuesta)

    localStorage.setItem("resultados", JSON.stringify(resultados))

    mostrarSiguientePregunta()
}

function mostrarResultados() {

    const container = document.getElementById("question-container")
    container.style = "display: none"

    const containerResutlado = document.getElementById("answer-container")
    containerResutlado.style = "display: block"
    
    const respuestasCorrectas = resultados.filter((resultado) => { return resultado === true}).length

    const containerRespuestasCorrectas = document.getElementById("answer-count-container")
    containerRespuestasCorrectas.innerText = respuestasCorrectas.toString()    
}

function reset() {

    resultados = []
    localStorage.setItem("resultados", JSON.stringify(resultados))

    preguntaActual = 0
    localStorage.setItem("preguntaActual", preguntaActual)

    mostrarPregunta(0)

    const container = document.getElementById("question-container")
    container.style = "display: block"

    const containerResutlado = document.getElementById("answer-container")
    containerResutlado.style = "display: none"
}

function init(_preguntas) {

    preguntas = _preguntas
    preguntaActual = localStorage.getItem("preguntaActual") || 0    

    try {
        resultados = JSON.parse(localStorage.getItem("resultados"))
    } catch (e) {
        resultados = []
    }    
    if (!resultados) {
        resultados = []
    }

    if (preguntaActual >= preguntas.length) {
        mostrarResultados()
    } else {
        mostrarPregunta(preguntaActual)
    }
    
    console.log(parseInt(preguntaActual) + 1)
    console.log(resultados)

    document.getElementById("btn-siguiente").onclick = () => {

        Swal.fire({
            title: "Atención",
            text: "¿Está seguro de que desea saltearse la pregunta y continuar con la siguiente?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#111',
            cancelButtonColor: 'blue',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                mostrarSiguientePregunta()
            }
        })        
    } 
}

fetch('/data/preguntas.json').then(response => response.json()).then(data => init(data))
