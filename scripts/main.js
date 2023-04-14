let enviaMsg = document.getElementById('enviarMsg');

let textoMsg 

let campoMsg = document.querySelector('input')

let estruturaMsgs = document.getElementById('msgs');

let seuNome = prompt('Digite um nome ou apelido:')
axios.defaults.headers.common['Authorization'] = '';
usuarioEstaOnline()


function usuarioEstaOnline() {
    let envioSeuNome
    console.log("testando")

        let quemEntrou = {name : seuNome}
        envioSeuNome = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', quemEntrou)

        envioSeuNome.then(entraNaSala);

        envioSeuNome.catch(() => {
            alert('O nome utilizado esta indisponivel!')
            window.location.reload()
        })
}

function escolhaOutroNome(){
    seuNome=prompt('O nome ou apelido escolhido esta indisponivel! Tente novamente com outro:')
}
let contentTypeStatus = {
    from: seuNome,
    to: "Todos",
    text: "entra na sala...",
    type: "status",
    time: " "
}
let contentTypeMessage = {
    from: seuNome,
    to: "Todos",
    text: " ",
    type: "message"
}
let contentTypePMessage = {
    from: seuNome,
    to: "Todos",
    text: " ",
    type: "private-message",
    time: " "
}
enviaMsg.addEventListener('click', sendMsg);
campoMsg.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {sendMsg()}
})
function sendMsg() {
    textoMsg = document.getElementById('digitarMsg').value;
    contentTypeMessage.text = textoMsg;

    let msgEnviada = axios.post("https://mock-api.driven.com.br/api/vm/uol/messages", contentTypeMessage)

    msgEnviada.then(mostrarMsg);
    msgEnviada.catch(showError);
}

function mostrarMsg(){
    console.log("Deu certo!")
}

function showError(error) {
    console.log(error.response.data)
}
function entraNaSala() {
    setInterval(() => {axios.post('https://mock-api.driven.com.br/api/vm/uol/status', {
        name: seuNome
    })
    .then((res) => console.log(res))}
    ,2000)
}