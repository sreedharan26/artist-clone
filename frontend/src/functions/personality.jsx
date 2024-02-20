function findCommon(firstArray, secondArray){
    
    let set1 = new Set(firstArray);
    let set2 = new Set(secondArray);

    let commonStrings = [];

    set1.forEach(str => {
        if (set2.has(str)) {
            commonStrings.push(str);
        }
    });

    return commonStrings;
}

export default function guessPersonality(artistData = [], userResponse = []){
    let commonArtists = new Map()
    userResponse && userResponse.forEach((data, index) => {
        let responsesLength = data && data.selected && data.selected.length
        if(responsesLength === 0){
            return
        }
        // let currentCommon = artistData && artistData[data && (data.id-1)][data && data.selected && (data.selected[0] - 1)]
        for(let i = 0; i < responsesLength; i++){
            // currentCommon = findCommon(currentCommon, artistData[data && (data.id-1)][data && data.selected && (data.selected[i] - 1)])
            artistData && artistData[data && (data.id-1)][data && data.selected && (data.selected[0] - 1)] && artistData[data && (data.id-1)][data && data.selected && (data.selected[0] - 1)].forEach((artist) => {
                if(commonArtists.has(artist)){
                    let count = commonArtists.get(artist);
                    commonArtists.set(artist, count + 1)
                }else{
                    commonArtists.set(artist, 1);
                }
            })
        }
        
    })
    let freq = 0
    let error = 2
    let artists = []
    for(let [artist, count] of commonArtists.entries()){
        if(count > freq){
            freq = count
        }
    }
    for(let [artist, count] of commonArtists.entries()){
        let x = freq - error
        if((x > 0 && count >= x) || (count === x)){
            artists.push(artist)
        }
    }
    return artists
}