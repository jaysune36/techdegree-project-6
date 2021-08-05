document.addEventListener('DOMContentLoaded', () => {
  const startGame = document.querySelector('.btn__reset');
  const qwerty = document.getElementById('qwerty');
  const phrase = document.getElementById('phrase');
  const phraseUL = phrase.querySelector('ul');
  const scoreBoard = document.getElementById('scoreboard');
  const scoreBoardLivesImg = scoreBoard.querySelectorAll('img');
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
        li.className = 'space'
        phraseUL.appendChild(li);
      }
    }
  }

  function checkLetter(clicked) {
    const letters = phraseUL.querySelectorAll('.letter');
    let correctLetter;
    let wrongLetter;
    for (let i = 0; i < letters.length; i++) {
      let letter = letters[i];
      const letterContent = letter.textContent;
      if(letterContent.toLowerCase() === clicked.textContent) {
        letter.className += ' show';
        correctLetter = letterContent;
      } else {
        wrongLetter = null;
      
    }
  }
    if(correctLetter !== undefined) {
      return correctLetter;
    } else {
      return wrongLetter;
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
      const letterFound = checkLetter(button);
      if(letterFound === null) {
        missed++;
        for(let i=0; i<scoreBoardLivesImg.length; i++) {
          let scoreBoardLiveImg = scoreBoardLivesImg[i];
          if(scoreBoardLiveImg.getAttribute('src', 'images/liveHeart.png')) {
          scoreBoardLiveImg = scoreBoardLiveImg.setAttribute('src', 'images/lostHeart.png');
          break;
          }
          }
      }
    }
  })

});