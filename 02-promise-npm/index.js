console.log('Hello node!!');

// * Ciclo de vida do Javascript 
/* 
? Funcoes que dependem de execucoes externa serao executadas em background
? A forma com que seu código e escrito e diferente da ordem em que e executado 
? Importante sempre manter a ordem de sua execucao para evitar problemas 
*/

// * Problemas em funcoes JS

/* 
!!!!  callbacks !!!!
0 - Obter um usuario 
1 - Obter numero de telefone de um usuario a partir de seu ID
2 - Obter o endereco do usuario pelo ID

* Ciclo de vida de promises 
? Pending: !! Estado inicial, ainda não terminou ou ainda nao foi rejeitado
? Fulfilled: !! Quando executou todas as operações com sucesso 
? Rejected: Quando a operacao falhou
*/

// importamos um módulo interno do node.js
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);


function obterUsuario() {
    // !quando der algum problema -> reject (error)
    // ? quando success -> resolve

    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            // TODO return (new Error('DEU RUIM DE VERDADE'))

            return resolve({
                id: 1,
                nome: 'Jorge',
                dataNascimento: new Date()
            })
        }, 1000);
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '837497629',
                ddd: 11
            })
        }, 2000);

    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua dos Lobos',
            numero: 12
        })
    }, 2000);
}

//1º passo adicionar a palavra async ->  automaticamente ela retornará uma Promise
main();
async function main() {
    try {
        console.time('medida-promise');
        const usuario = await obterUsuario();
        //const telefone = await obterTelefone(usuario.id);
        //const endereco = await obterEnderecoAsync(usuario.id);

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const endereco = resultado[1]
        const telefone = resultado[0]
        console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua}, ${endereco.numero},
                Telefone: (${telefone.ddd}) ${telefone.telefone}.
        `)
        console.timeEnd('medida-promise');
    }
    catch (error) {
        console.error('DEU RUIM', error);
    }
}


// const usuarioPromise = obterUsuario()
// ? para manipular o sucesso usamos a função .then
// ? para manipular erros , usamos o .catch
// ? usuario -> telefone -> telefone
// usuarioPromise
//     .then(function (usuario) {
//         return obterTelefone(usuario.id)
//             .then(function resolverTelefone(result) {
//                 return {
//                     usuario: {
//                         nome: usuario.nome,
//                         id: usuario.id
//                     },
//                     telefone: result
//                 }
//             })
//     })
//     .then(function (resultado) {
//         const endereco = obterEnderecoAsync(resultado.usuario.id)
//         return endereco.then(function resolverEndereco(result) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result
//             }
//         })
//     })
//     .then(function (resultado) {
//         console.log(`
//             Nome: ${resultado.usuario.nome}
//             Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//             Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//         `)
//     })
//     .catch(function (error) {
//         console.error('DEU RUIM', error)
//     })

// obterUsuario(function resolverUsuario(error, usuario) {
//     ! null || "" || 0 === false
//     if (error) {
//         console.error('DEU RUIM em USUARIO', error)
//         return;
//     }
//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if (error1) {
//             console.error('DEU RUIM em TELEFONE', error)
//             return;
//         }
//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if (error2) {
//                 console.error('DEU RUIM em TELEFONE', error)
//                 return;
//             }

//             console.log(`
//              Nome: ${usuario.nome},
//              Endereco: ${endereco.rua},${endereco.numero}
//              Telefone: (${telefone.ddd})${telefone.telefone}
//             `)
//         })
//     })
// })
// const telefone = obterTelefone(usuario.id)
// console.log('telefone', telefone)
