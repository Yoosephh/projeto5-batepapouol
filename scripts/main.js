let enviaMsg = document.getElementById('enviarMsg');

let textoMsg 

let campoMsg = document.querySelector('input')

let estruturaMsgs = document.getElementById('msgs');

let seuNome = prompt('Digite um nome ou apelido:')
axios.defaults.headers.common['Authorization'] = 'oeo6PR6eeMEhAS8MNcbBRwIB';
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

let contentTypeMessage = {
    from: seuNome,
    to: "Todos",
    text: " ",
    type: "message"
}

enviaMsg.addEventListener('click', sendMsg);
campoMsg.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {sendMsg()}
})
function sendMsg() {
    textoMsg = document.getElementById('digitarMsg');
    contentTypeMessage.text = textoMsg.value;

    let msgEnviada = axios.post("https://mock-api.driven.com.br/api/vm/uol/messages", contentTypeMessage)

    textoMsg.value = "";

    msgEnviada.then(mostrarMsg);
    msgEnviada.catch(showError);
}

function renderizaMsg(arrayGet) {
    estruturaMsgs.innerHTML = "";
    arrayGet.data.forEach( (objects) => {

        if (objects.type === "message") {
            estruturaMsgs.innerHTML += `<li class="forAll" data-test="message"> <span class="timeProperty">(${objects.time})</span> <strong>${objects.from}</strong>&nbsp;para&nbsp;<strong>${objects.to}</strong>: ${objects.text}</li>` } 

        else if (objects.type === "status") {
            estruturaMsgs.innerHTML += `<li class="statusMsg" data-test="message"> <span class="timeProperty">(${objects.time})</span> <strong>${objects.from}</strong>&nbsp; ${objects.text}</li>`
        }
})}

function mostrarMsg(){
    axios.get("https://mock-api.driven.com.br/api/vm/uol/messages")
    .then(renderizaMsg)
    .catch(showError)
}

function showError(error) {
    if (error.response) {
        console.log(error.response.status);
      } else {
        console.log("Error:", error.message);
      }}

function entraNaSala() {
    setInterval(() => {axios.post('https://mock-api.driven.com.br/api/vm/uol/status', {
        name: seuNome
    })},2000)
    setInterval(mostrarMsg, 3000)
}