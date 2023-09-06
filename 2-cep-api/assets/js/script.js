const limparFormulario = () => {
    document.getElementById('endereco').value = "";
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const ehNumero = (numero) => /^[0-9]{8}$/.test(numero);

const cepValido = (cep) => cep.length === 8 && ehNumero(cep);


const pesquisarCep = async () => {

    limparFormulario();

    const cep = document.getElementById('cep').value; //pega o valor do cep
    const url = `http://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();
        //fetch(url).then(responde => responde.json()).then(); //outra forma de fazer
        if (endereco.hasOwnProperty('erro')) { //tratamento de cep inválido
            document.getElementById('endereco').value = 'CEP não encontrado!';
        } else {
            preencherFormulario(endereco);
        }
    } else {
        document.getElementById('endereco').value = 'CEP inválido!';
    }
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);
//focusout = quando sair do foco, ou seja, quando o usuario sair do campo CEP irá chamar a funcao