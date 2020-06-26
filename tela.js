num = 0

novadiv = new Array()

for(i = 20; i >= 0; i--){
    for(j = 0; j <= 39; j++){
        num++
        novadiv[num] = document.createElement('div') 
        novadiv[num].setAttribute('id', `${i},${j}`) 
        novadiv[num].className = 'p'
        document.getElementById('tela').appendChild(novadiv[num])
    }
}