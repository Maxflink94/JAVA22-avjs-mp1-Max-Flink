const url = 'https://highscorelist-78712-default-rtdb.europe-west1.firebasedatabase.app/Highscore.json';

// Hämtar highscore från firebase
export async function getHighscoreList(){
    const response = await fetch(url);
    const highscoreList = response.json();

    return highscoreList;
}

// Sortera HighscoreList efter vem som har mest Score
function sortHighscoreList(highscoreList){

    let array = [];

    highscoreList.forEach(element => {
        array.push(element);
    });
    array.sort((a, b) =>{
        return a.score - b.score;
    })

    const sortedArray = array.reverse();

    return sortedArray;
}

// Printar ut highscorelistan (UTAN CSS)
function displayHighscoreList(sortedArray, div){

    // for ( players in sortedArray ){

    //     const highscoreh2 = document.createElement('h2');
    //     highscoreh2.innerText = sortedArray[players].name + '  ' + sortedArray[players].score;
    //     div.append(highscoreh2);
        
    // }

    sortedArray.forEach(players =>{
        const highscoreh2 = document.createElement('h2');
        highscoreh2.innerText = players.name + '  ' + players.score;
        div.append(highscoreh2);
    });
}

// Uppdaterar (med PATCH/PUT/POST) highscore på firebase
async function putHighscoreList(sortedArray){

    const options = {
        method: 'PUT',
        body: JSON.stringify(sortedArray),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const response = await fetch(url, options);
    console.log("response from put");
    console.log(response);
    const data = await response.json();
    console.log("data response from put")
    console.log(data);

}

export async function addPossHighscore(newAttempt) {
    const highscoreList = await getHighscoreList();
    console.log("Getting hs");
    console.log(highscoreList);
    const allScores = [...highscoreList, newAttempt];
    const sortedNewHighscoreList = sortHighscoreList(allScores);
    console.log("sorted hs");
    console.log(sortedNewHighscoreList);
    
    sortedNewHighscoreList.pop();
    console.log("poped hs");
    console.log(sortedNewHighscoreList);

    await putHighscoreList(sortedNewHighscoreList);
}

export async function showHighscoreList(div){
    const highscoreList = await getHighscoreList();
    const sortedHighscoreList = sortHighscoreList(highscoreList);
    displayHighscoreList(sortedHighscoreList, div);
}
