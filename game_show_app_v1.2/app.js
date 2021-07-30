const startGame = document.querySelector('.btn__reset');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const phraseUL = phrase.querySelector('ul');
let missed = 0;

function getRandomPhraseAsArray(phrases) {
  const phrasesGenerate = phrases[Math.floor(Math.random() * phrases.length)];
  const phrasesSplit = phrasesGenerate.split('');
  return phrasesSplit;
}

function addPhraseToDisplay(arr) {
  for(let i=0; i < arr.length; i++) {
    let arrInput = arr[i];
    const li = document.createElement('li');
    if(arrInput !== ''){
      li.textContent = arrInput;
      li.className = 'letter';
      phraseUL.appendChild(li);
    } else {
      li.textContent = arrInput;
      phraseUL.appendChild(li);
    }
  } 
}

startGame.addEventListener('click', (e) => {
  const phrases = ['I am Iron man', 'Avenger Inifinity War', 'Captian America is better than Iron Man', 'I am Groot', 'Why is Gamora'];
  const phraseArray = getRandomPhraseAsArray(phrases);
  console.log(phraseArray);
})


