function inputChar(char){
    const currentRow = rows[row];
    for(i = 0; i<rows[row].length;i++){
        if(letter[currentRow[i]].value==""){
letter[currentRow[i]].value = char
return
        }
    }
}
function handleDelete(){
    const currentRow = rows[row];
    for(i = rows[row].length-1;i>=0;i--){
        console.log(letter[currentRow[i]].value)
        if(letter[currentRow[i]].value!=""){
letter[currentRow[i]].value = ""
return
        }
    }
}

function isLetter(letter){
 return /^[a-zA-Z]$/.test(letter);
}
const rows = [
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10,11,12,13,14],
    [15,16,17,18,19],
    [20,21,22,23,24],
    [25,26,27,28,29]
]

async function fetchWord(){
    loading.style.display= "flex"
    const promise = await fetch("https://words.dev-apis.com/word-of-the-day?random=1")
    const word = await promise.json()
   return word

}



async function validateWord(word){
      loading.style.display= "flex"
const promise = await fetch("https://words.dev-apis.com/validate-word",
    {
        method: "POST",
        body:JSON.stringify({word:word})
    }
)
return await promise.json()
}



function hints(wordInput,wordApi){
    let currentRow = rows[row]
    let wordToObject = wordObject(wordApi)
    for(let i = 0;i<wordInput.length;i++){
        if(wordInput.charAt(i) == wordApi.charAt(i)){
            letter[currentRow[i]].classList.add("right-position")
        }
        else if(wordApi.includes(wordInput.charAt(i))){
            if(duplicate(wordInput.charAt(i),wordToObject)){
                wordToObject[wordInput.charAt(i)] -= 1
                console.log(wordToObject)
                letter[currentRow[i]].classList.add("included")
            }
            else{
                letter[currentRow[i]].classList.add("not-included")
            }
        }
        else{
             letter[currentRow[i]].classList.add("not-included") 
        }
    }
}


function wordObject(wordApi){
    let api = {}
    for(let i =0;i<wordApi.length;i++){
        if(!api[wordApi.charAt(i)]){
            api[wordApi.charAt(i)] = 1;
        }
        else{
            api[wordApi.charAt(i)] +=1;
        }
    }
    return api
}

function duplicate(char,wordObject){
return wordObject[char] <= 0? false:true;
}

function matchWord(word){

    const currentRow = rows[row]
    let wordInput = ""
for(let i=0;i<currentRow.length;i++){
    wordInput+=letter[currentRow[i]].value
}
validateWord(wordInput).then((res)=>{
      loading.style.display= "none"
   if(res.validWord){
    hints(wordInput,word)
    if(wordInput == word){
        alert("You got it!")
    }
    else{
          row = row==6?row:row+1;
              console.log(word)
    if(row==6){
        return alert("you lose! the word is "+word)
    }
    }
}
else{
    alert("invalid word")
}
})}

let row = 0;

const loading = document.querySelector(".loader-container")
const letter = document.querySelectorAll(".word-input")
fetchWord().then((data)=>{
data? loading.style.display= "none":""

document.addEventListener("keydown", function(event){
    if(!isLetter(event.key)){
        switch(event.key){
            case "Enter":
                matchWord(data.word)
       
            break;
            case "Backspace":
                handleDelete()

            break;
        }
            console.log(event.key)
        event.preventDefault();
    }
    else{
inputChar(event.key)
    }
})


})

