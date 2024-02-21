export default function random(generated, n){
    let randomIndex = Math.floor(Math.random() * n)
    if(generated && generated.length === n){
        generated.length = 0
    }
    while(generated && generated.includes(randomIndex)){
        randomIndex = Math.floor(Math.random() * n)
    }
    generated && generated.push(randomIndex)
    return randomIndex
}