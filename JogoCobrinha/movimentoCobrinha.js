/*OBSERVACAO: eu construi a logica das cordenadas invertidas, usei x para o eixo vertical e y para o eixo horizontal :) */

click = false //serve para que nao seja possivel mudar para a direcao oposta
indiceX = 0 //os idices concatenados formam a cordenada da cobrinha. Ja estao setados na posicao inicial
indiceY = 0
direcao = 'y+'
velocidade = 100
crescimento = 0 //serve para controlar quantos quadradinhos a cobrinha cresce por vez
pontos = 0
inicio = new Date().getTime() //para cronometrar o jogo
minhoca = new Array() //cobrinha

//as proximas 8 linhas setam a posicao inicial da da cobrinha e da comida.
//para uilizar a funcao que joga sozinha e presiso mudar onde tem 20 para 39
indiceX = 20 
indiceY = 3
minhoca[0] = '20,1'
minhoca[1] = '20,2'
minhoca[2] = '20,3'
comidaM = '20,20'
mudarCor('20,1', '#ffffff')
mudarCor('20,2', '#ffffff')
mudarCor('20,3', '#ffffff')
mudarCor('20,20', '#ff0000')


function mudarCor(id, cor){
    quadrado = window.document.getElementById(id)
    quadrado.style.backgroundColor = cor
}

function alertarFimDeJogo(){
    alert(`voce perdeu, Pontos: ${pontos}, Tempo: ${(new Date().getTime() - inicio)/1000}s`)
    window.location.reload()
}

function deslocar(){
    minhoca.push(`${indiceX},${indiceY}`)
    mudarCor(minhoca[minhoca.length -1], '#ffffff') 
}

function mudarDirecao(){
    if(click == false){
        click = true

        teclaPrecionada = event.keyCode

        if(direcao != 'x+' && teclaPrecionada == 115)
            direcao = 'x-'
        else if(direcao != 'x-' && teclaPrecionada == 119)
            direcao = 'x+'
        else if(direcao != 'y+' && teclaPrecionada == 97)
            direcao = 'y-'
        else if(direcao != 'y-' && teclaPrecionada == 100)
            direcao = 'y+'
    }
}

function comida(){
    comidaM = `${Math.floor(Math.random() * 40)},${Math.floor(Math.random() * 40)}`
    if(minhoca.indexOf(comidaM, 0) != -1){
        comida()
    }
    mudarCor(comidaM, '#ff0000')
}

function mover(){
    //teste ()
    click = false
    switch (direcao){
        case 'y+':
            if(++indiceY >= 40 || minhoca.indexOf(`${indiceX},${indiceY}`, 0) != -1)
                alertarFimDeJogo()
            else
                deslocar()    
            break
        case 'y-':
            if(--indiceY < 0 || minhoca.indexOf(`${indiceX},${indiceY}`, 0) != -1)
                alertarFimDeJogo()
            else
                deslocar()
            break
        case 'x+':
            if(++indiceX >= 40 || minhoca.indexOf(`${indiceX},${indiceY}`, 0) != -1)
                alertarFimDeJogo()
            else
                deslocar()
            break
        case 'x-':
            if(--indiceX < 0 || minhoca.indexOf(`${indiceX},${indiceY}`, 0) != -1)
                alertarFimDeJogo()
            else
                deslocar()
    }
    if(`${indiceX},${indiceY}` == comidaM){
        comida() 
        pontos++
        crescimento = 1
    }else if(crescimento > 0 && crescimento <= 2){
        crescimento++
    }else{
        mudarCor(minhoca[0], '#000000')
        minhoca.shift()
    }
    setTimeout("mover()", velocidade);
}

/*anterior = 42
function teste (){
    if(anterior == 39){
        direcao = 'y-'
        anterior = 42
    }else if(anterior == 1){
        direcao = 'y+'
        anterior = 42
    }else{
        if(indiceX == 0 && indiceY == 0){
            direcao = 'x+'
        }
        if(indiceX == 39 && indiceY == 0){
            direcao = 'y+'
        }
        else if(indiceY == 39){
            direcao = 'x-'
            anterior = 39
        }
        else if(indiceY == 1 && indiceX != 0 && indiceX != 39){
            direcao = 'x-'
            anterior = 1
        }
    }
}*/