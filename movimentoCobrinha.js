/*OBSERVACAO: eu construi a logica das cordenadas invertidas, usei x para o eixo vertical e y para o eixo horizontal :) */
jogando = false
fimDeJogo = false

intervalo = null
movimento = null

ss = 0
mm = 0
hh = 0

pontos = 0
incremento = 1
count = 0
controlador = 2

click = false //serve para que nao seja possivel mudar para a direcao oposta
indiceX = 0 //os idices concatenados formam a cordenada da cobrinha. Ja estao setados na posicao inicial
indiceY = 0
direcao = 'y+'
velocidade = 100
crescimento = 0 //serve para controlar quantos quadradinhos a cobrinha cresce por vez
inicio = new Date().getTime() //para cronometrar o jogo
minhoca = new Array() //cobrinha

//as proximas 8 linhas setam a posicao inicial da da cobrinha e da comida.
//para uilizar a funcao que joga sozinha e presiso mudar onde tem 20 para 39
indiceX = 10 
indiceY = 3
minhoca[0] = '10,1'
minhoca[1] = '10,2'
minhoca[2] = '10,3'
comidaM = '10,20'
mudarCor('10,1', '#ffffff')
mudarCor('10,2', '#ffffff')
mudarCor('10,3', '#ffffff')
mudarCor('10,20', '#ff0000')


function mudarCor(id, cor){
    quadrado = window.document.getElementById(id)
    quadrado.style.backgroundColor = cor
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
    comidaM = `${Math.floor(Math.random() * 21)},${Math.floor(Math.random() * 40)}`
    if(minhoca.indexOf(comidaM, 0) != -1){
        comida()
    }
    mudarCor(comidaM, '#ff0000')
}

function mover(){
    click = false
    switch (direcao){
        case 'y+':
            if(++indiceY >= 40 || minhoca.indexOf(`${indiceX},${indiceY}`, 0) != -1)
                acabou()
            else
                deslocar()    
            break
        case 'y-':
            if(--indiceY < 0 || minhoca.indexOf(`${indiceX},${indiceY}`, 0) != -1)
                acabou()
            else
                deslocar()
            break
        case 'x+':
            if(++indiceX >= 21 || minhoca.indexOf(`${indiceX},${indiceY}`, 0) != -1)
                acabou()
            else
                deslocar()
            break
        case 'x-':
            if(--indiceX < 0 || minhoca.indexOf(`${indiceX},${indiceY}`, 0) != -1)
                acabou()
            else
                deslocar()
    }
    if(`${indiceX},${indiceY}` == comidaM){
        comida() 
        pontos = pontos + incremento
        count++
        atualizarInformacao()
        if(count == controlador){
            controlador++
            incremento = incremento * 2
            count = 0 
        }
        crescimento = 1
    }else if(crescimento > 0 && crescimento <= 2){
        crescimento++
    }else{
        mudarCor(minhoca[0], '#000000')
        minhoca.shift()
    }
}

function timer() {
    ss++; 
    if (ss == 59) { 
        ss = 0 
        mm++ 
        if (mm == 59) { 
            mm = 0
            hh++
        }
    }
    atualizarInformacao()
}

function atualizarInformacao(){
    textPontos = ''
    if(pontos < 10){textPontos = '000'+pontos}
    else if(pontos < 100){textPontos = '00'+pontos}
    else if(pontos < 1000){textPontos = '0'+pontos}
    else {textPontos = pontos}

    format = '<strong>&nbsp; '+(hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss)+' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pts: '+textPontos+' </strong>'
    document.getElementById('display').innerHTML = format
}

function comecarJogo(){
    if(fimDeJogo == false){
        if(jogando == false){
            jogando = true
            intervalo = setInterval(() => { timer(); }, 1000)
            movimento = setInterval(() => { mover(); }, 100)
        }
    }else{
        document.location.reload()
    }
}

function pausarJogo(){
    jogando = false
    clearInterval(intervalo)
    clearInterval(movimento)
}

function acabou(){
    fimDeJogo = true
    clearInterval(intervalo)
    clearInterval(movimento)
    gameOver()
}

function gameOver(){
    gO = ['13,1','13,2','13,3','13,4','13,21','13,22','13,23','13,24',
    '12,1','12,4','12,6','12,7','12,8','12,10','12,11','12,12','12,13','12,14','12,16','12,17','12,18','12,21','12,24','12,26','12,30','12,32','12,33','12,34','12,36','12,38',
    '11,1','11,8','11,10','11,12','11,14','11,16','11,18','11,21','11,24','11,26','11,30','11,32','11,34','11,36','11,37',
    '10,1','10,3','10,4','10,6','10,7','10,8','10,10','10,12','10,14','10,16','10,17','10,18','10,21','10,24','10,27','10,29','10,32','10,33','10,34','10,36',
    '9,1','9,4','9,6','9,8','9,10','9,12','9,14','9,16','9,21','9,24','9,27','9,29','9,32','9,36',
    '8,1','8,2','8,3','8,4','8,6','8,7','8,8','8,10','8,12','8,14','8,16','8,17','8,18','8,21','8,22','8,23','8,24','8,28','8,32','8,33','8,34','8,36']

    for(i = 0; i < 21; i++){
        for(j = 0; j < 40; j++){
            mudarCor(i+','+j, '#000000')
        }
    }

    for(i = 0; i < gO.length; i++){
        mudarCor(gO[i], '#ffffff')
    }
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