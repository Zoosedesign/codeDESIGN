var quiz = {
  survey: [
    {
      question: 'All keys in an object are strings?',
      option: [
        'Depence', //opzione in alto a sinistra
        'False', //opzione in alto a destra
        'None of them', //opzione in basso a sinistra
        'True' //opzione in basso a destra
      ],
      // "3" è uguale all'indice della risposta esatta nell'array "o" cioè opzioni di risposta.
      answer: 3 //uguale indice quarta risposta
    },
    {
      question: 'Given a collection of artists and their song lists, where would you store them?',
      option: [
        'Alert',
        'Prompt',
        'Confirm',
        'None of them'
      ],
      answer: 1
    },
    {
      question: 'How to write an IF statement in JavaScript?',
      option: [
        'if i == 5 then',
        'if i = 5',
        'if i = 5 then',
        'if(i == 5)'
      ],
      answer: 3
    },
    {
      question: 'How do you round the number 7.25, to the nearest integer?',
      option: [
        'rnd(7.25)',
        'Math.rnd(7.25)',
        'Math.round(7.25)',
        'round(7.25)'
      ],
      answer: 2
    },
    {
      question: 'How does a FOR loop start?',
      option: [
        'for (i = =; i >= 5)',
        'for (i <= 5; i++)',
        'for (i = 0; i <=5; i++)',
        'for i = 1 to 5'
      ],
      answer: 2
    }
  ],

  // # DICHIARAZIONI VARIABILI BLOBALI DEL QUIZ

  // i wrapper/container dei vari contenuti li dichiariamo "null" cioè vuoti, perchè andremo a dargli i contenuti in seguito

  quizContainer: null, // contenitore generale del quiz
  wrapQn: null, // wrapper per la domanda del quiz
  wrapAns: null, // wrapper per le risposte del quiz
  now: 0, // indice della domanda corrente
  score: 0, // punteggio dell'utente

  //p.s. essendo quizContainer, wrapQn, etc proprietà dell'oggetto quiz assegnamo il relativo valore iniziale con ":" al posto di "="

  // # FUNZIONE DI INIZIALIZZAZIONE DEL QUIZ
  init: () => {
    // Recupero del contenitore del quiz dal documento HTML
    quiz.quizContainer = document.getElementById('quizWrap');

    // Creazione del wrapper/contenitore per la domanda
    quiz.wrapQn = document.createElement('div');
    quiz.wrapQn.id = 'quizQn';
    // lo aggiungiamo al contenitore generale del quiz
    quiz.quizContainer.appendChild(quiz.wrapQn);

    // Creazione del wrapper/contenitore per la risposta
    quiz.wrapAns = document.createElement('div');
    quiz.wrapAns.id = 'quizAns';
    // lo aggiungiamo al contenitore generale del quiz
    quiz.quizContainer.appendChild(quiz.wrapAns);

    //eseguiamo il quiz
    quiz.runQuiz();
  },

  // # FUNZIONE DI ESECUZIONE DEL QUIZ
  runQuiz: () => {
    // Inseriamo la domanda corrente, .now potrebbe essere anche .pippo, è il nome che diamo alla proprietà che rappresenta la domanda corrente
    quiz.wrapQn.innerHTML = quiz.survey[quiz.now].question;

    // Svuota il wrapper delle risposte
    quiz.wrapAns.innerHTML = '';

    // Cicla attraverso le opzioni di risposta della domanda corrente
    for (let i in quiz.survey[quiz.now].option) {
      // Crea un input di tipo radio per la risposta
      let radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      // per differenziarli non sapendo il numero delle domande, al nome dell'id verrà aggiunto il numero di indice
      radio.id = 'quiz-option' + i;

      // Aggiunge l'input al wrapper delle risposte
      quiz.wrapAns.appendChild(radio);

      // Crea un label per la risposta e lo imposta con il testo dell'opzione di risposta corrente
      let label = document.createElement('label');
      label.innerHTML = quiz.survey[quiz.now].option[i];

      // Imposta l'attributo "for" del label in modo che corrisponda all'id dell'input di risposta
      label.setAttribute('for', 'quiz-option' + i);

      // ".index" memorizzerà il numero di indice corrispondente alla risposta scelta dall'utente, cioè il dato che ci serve (.dataset).
      label.dataset.index = i;

      // Aggiungiamo al label un event listener per intercettare la selezione dell'opzione di risposta
      label.addEventListener('click', () => quiz.select(label));

      // Aggiunge il label al wrapper delle risposte
      quiz.wrapAns.appendChild(label);
    }
  },

  select: (option) => {
    // Rimuove l'event listener 'click' da tutte le label delle risposte per evitare che l'utente possa selezionare più di una risposta
    let all = quiz.wrapAns.getElementsByTagName('label');
    for (let label of all) {
      label.removeEventListener('click', quiz.select);
    }

    // Verifica se l'indice dell'opzione selezionata è uguale a quella memorizzata nella proprietà answer della domanda relativa
    let correct = option.dataset.index == quiz.survey[quiz.now].answer;

    // Aggiornamento del punteggio dell'utente e dell'aspetto dell'opzione di risposta selezionata
    if (correct) {
      quiz.score++;
      option.classList.add('correct');
    } else {
      option.classList.add('wrong');
    }


    quiz.now++;
    setTimeout(() => {
      //se l'indice del quiz appena risposto è minore della lunghezza della proprietà "survey:" del quiz, ri-esegui il quiz.
      if (quiz.now < quiz.survey.length) { quiz.runQuiz(); }
      else { //altrimenti dai i risultati
        quiz.wrapQn.innerHTML = `You have answered ${quiz.score} of ${quiz.survey.length} correctly.`;
        quiz.wrapAns.innerHTML = '';
      }
    }, 500);
  },

  //proprietà reset, qual'ora volessimo riprovarlo aggiungendo un bottone
  reset: () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.runQuiz();
  }
};
window.addEventListener('load', quiz.init);