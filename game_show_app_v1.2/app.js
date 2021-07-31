document.addEventListener('DOMContentLoaded', () => {
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
    for (let i = 0; i < arr.length; i++) {
      let arrInput = arr[i];
      const li = document.createElement('li');
      if (arrInput !== ' ') {
        li.textContent = arrInput;
        li.className = 'letter';
        phraseUL.appendChild(li);
      } else {
        li.textContent = arrInput;
        phraseUL.appendChild(li);
      }
    }
  }

  function checkLetter(clicked) {
    const letters = phraseUL.querySelectorAll('.letter');
    for (let i = 0; i < letters.length; i++) {
      let letter = letters[i];
      let correctLetter;
      if(letter.textContent.toLowerCase() === clicked.textContent) {
        correctLetter += letter;
        letter.className += ' show';
        console.log(clicked);
      } else {
        return null;
      }
    }
  }

  startGame.addEventListener('click', (e) => {
    const startOverly = e.target.parentNode;
    startOverly.style.display = 'none';
    const phrases = ['I am Iron man', 'Avengers Inifinity War', 'Captian America', 'I am Groot', 'Why is Gamora'];
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
  })

  qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      button.className = 'chosen';
      button.setAttribute('disabled', '');
      checkLetter(button);
    }
  })

});