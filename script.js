// Preguntas a evaluar
const preguntas = [
    {
        id: 0,
        q: "La orientación a futuro de los adolescentes incorpora varios procesos",
        a: [{ text: "Motivación", isCorrect: false },
            { text: "Planificación y evaluación de metas", isCorrect: false },
            { text: "Construcción del sí mismo", isCorrect: false },
            { text: "Todas las opciones son correctas", isCorrect: true },
            { text: "Todas las opciones son incorrectas", isCorrect: false }
        ]

    },
    {
        id: 1,
        q: "El constructo de los posibles sí mismos considera:",
        a: [{ text: "Autoconocimiento del potencial de otros y futuro", isCorrect: false, },
            { text: "Autoconocimiento del propio potencial y futuro", isCorrect: true },
            { text: "Autoconocimiento del propio potencial y pasado", isCorrect: false },
            { text: "Autoconocimiento del potencial de otros y futuro", isCorrect: false }
        ]

    },
    {
        id: 2,
        q: "La percepción del futuro se ve influenciada por",
        a: [{ text: "el individuo y la cultura", isCorrect: false },
            { text: "el entorno social y la realidad virtual", isCorrect: false },
            { text: "el entorno social y cultural", isCorrect: true },
            { text: "el individuo y la realidad virtual", isCorrect: false }
        ]
    }
]

const resultados = []
let preguntaActual = 0

function mostrarSiguientePregunta() {

    preguntaActual++
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
    btn.className = "option"
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
    question.innerText = pregunta.q  
}

function seleccionarResultado(respuesta) {

    const valorRespuesta = respuesta.isCorrect
    resultados.push(valorRespuesta)

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

mostrarPregunta(0)

document.getElementById("btn-siguiente").onclick = () => {

    if (confirm("¿Está seguro de que desea saltearse la pregunta y continuar con la siguiente?")) {
        mostrarSiguientePregunta()
    }
}   