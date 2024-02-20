import stringComparison from "string-comparison"

export default function schedule(artists = [], data = []){
    const arr = []
    const n = data && data.length
    // let cos = stringComparison.Cosine
    for(const x of artists){
        for(const obj of data){
            if(obj.schedule !== null && obj.schedule !== undefined && obj.schedule !== "\n" && obj.name == x){
                arr.push(obj)
            }
        }
    }
    // if(arr.length === 0){
    //     let randomIndex = Math.floor(Math.random() *n)
    //     console.log(data[randomIndex])
    //     return data[randomIndex]
    // }   
    console.log(arr)
    const m = arr.length
    let randomIndex = Math.floor(Math.random() * m)
    console.log(randomIndex)
    return arr[randomIndex]

}