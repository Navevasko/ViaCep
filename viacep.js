"use strict"

const cepValido = (cep) => /^[0-9]{8}$/.test(cep)  //As expressões regulares são usadas para validar várias coisas. Para fazer uma expressão regular, se usa: "//" e a expressão fica entre as barras  

const limparCampos = () => {
    document.querySelector('#endereco').value = ''
    document.querySelector('#bairro').value = ''
    document.querySelector('#cidade').value = ''
    document.querySelector('#estado').value = ''
}

const pesquisarCep = async (cep) => {
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const preencherFormulario = async (evento) => {
    const cep = evento.target.value
    if(cep === '' ) return 0
    limparCampos()

    if(cepValido(cep)) {
    const infoCep = await pesquisarCep(cep)
    if(infoCep.erro) {
        document.querySelector('#endereco').value = "CEP não encontrado"
    }
    else {
        document.querySelector('#endereco').value = infoCep.logradouro
        document.querySelector('#bairro').value = infoCep.bairro
        document.querySelector('#cidade').value = infoCep.localidade
        document.querySelector('#estado').value = infoCep.uf
    }
    }
    else {
        document.querySelector('#endereco').value = "CEP incorreto"
    }
}

document.querySelector('#cep')
        .addEventListener('focusout', preencherFormulario);

    // Invocar
    // preencherFormulário
    // Ao invocar, você pode passar parametros. ex: preencherFormulario("ana")