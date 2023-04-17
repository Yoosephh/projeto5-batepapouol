let enviaMsg = document.getElementById('enviarMsg');

let textoMsg 

let campoMsg = document.querySelector('input')

let estruturaMsgs = document.getElementById('msgs');

let seuNome = prompt('Digite um nome ou apelido:')
axios.defaults.headers.common['Authorization'] = 'oeo6PR6eeMEhAS8MNcbBRwIB';
usuarioEstaOnline()


function usuarioEstaOnline() {
    let envioSeuNome

        let quemEntrou = {name : seuNome}
        envioSeuNome = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', quemEntrou)

        envioSeuNome.then(entraNaSala);

        envioSeuNome.catch(() => {
            alert('O nome utilizado esta indisponivel!')
            window.location.reload()
        })
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

    msgEnviada.then(getMsg);
    msgEnviada.catch(showError);
}

function renderizaMsg(arrayGet) {
    estruturaMsgs.innerHTML = "";
    let startIndex = (arrayGet.data.length > 100) ? arrayGet.data.length - 100 : 0;
    for(let i = startIndex; i < arrayGet.data.length; i++) {
        let objects = arrayGet.data[i];

        if (objects.type === "message") {
            estruturaMsgs.innerHTML += `<li class="forAll" data-test="message"> <span class="timeProperty">(${objects.time})</span> <strong>${objects.from}</strong>&nbsp;para&nbsp;<strong>${objects.to}</strong>: ${objects.text}</li>` } 

        else if (objects.type === "status") {
            estruturaMsgs.innerHTML += `<li class="statusMsg" data-test="message"> <span class="timeProperty">(${objects.time})</span> <strong>${objects.from}</strong>&nbsp; ${objects.text}</li>`
        }
        else if (objects.type === "private_message"){
            if (objects.to === seuNome){
                estruturaMsgs.innerHTML += `<li class="forAll" data-test="message"> <span class="timeProperty">(${objects.time})</span> <strong>${objects.from}</strong>&nbsp;para&nbsp;<strong>${objects.to}</strong>: ${objects.text}</li>` } 
        }
    }
}

function getMsg(){
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
    getMsg()
    setInterval(() => {(axios.post('https://mock-api.driven.com.br/api/vm/uol/status', {
        name: seuNome
    })).catch(usuarioEstaOffline)},5000)
    setInterval(getMsg, 3000)
}

function usuarioEstaOffline() {
    alert("Voce foi descontectado por inatividade!")
    window.location.reload();
    usuarioEstaOnline();
}