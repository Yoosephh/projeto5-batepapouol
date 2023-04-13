    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); 
    const minutes = now.getMinutes().toString().padStart(2, '0'); 
    const seconds = now.getSeconds().toString().padStart(2, '0'); 
    const time_str = `${hours}:${minutes}:${seconds}`;
    console.log(`agora sao  ${time_str}`)

const seuNome = prompt('Digite um nome ou apelido:')
