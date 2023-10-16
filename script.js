let settimana = 0;
const maxSettimane = 144;
let money = 50;
let hp = 100;
let ep = 0;
let collezione = [];

document.getElementById("visitatori").addEventListener("click", function () {
  avanzamentoSettimana();
});

// Funzione per avanzare la settimana
function avanzamentoSettimana() {
  if (settimana >= maxSettimane) {
    alert("Il gioco è terminato dopo 144 settimane!");
    clearInterval(intervalID); // Interrompe il ciclo di avanzamento delle settimane
    return;
  }

  // Calcola la riduzione degli Hortus Point (HP) basata sul numero di piante nella collezione
  const riduzioneHP = Math.ceil(collezione.length * 1.5);
  const aumentoHP = Math.ceil(collezione.length * 2)

  // Simula un evento casuale che aumenta o riduce HP ed EP
  const eventoCasuale = Math.random(0,1); // Valore casuale tra 0 e 1

  // Modifica HP ed EP in base all'evento casuale
  if (eventoCasuale < 0.0) {
    // 30% di probabilità di un evento che aumenta HP ed EP
    hp += (collezione.length / 0.1);
    ep += (collezione.length / 5) ;
  } else if (eventoCasuale < 0.6) {
    // 30% di probabilità di un evento che riduce HP ed EP
    hp -= (collezione.length * 3);
    ep += (collezione.length * 1.5);
  }

// Riduci HP in base alla riduzione calcolata
hp += aumentoHP;
// Riduci HP in base alla riduzione calcolata
hp -= riduzioneHP;

  // Verifica se hai esaurito i soldi
  if (money < 0) {
    gameover();
    return;
  }

  // Verifica se hai esaurito gli Hortus Point (HP)
  if (hp <= 0) {
    gameover(); // Aggiunto il game over quando gli HP sono esauriti
    return;
  }
  settimana++;

  riepilogo();

  // Scegli una curiosità casuale tra le 10 piante
  const curiositaIndex = Math.floor(Math.random() * piante.length);
  const curiositaPianta = piante[curiositaIndex];
  const curiositaText = `Curiosità sulla ${curiositaPianta.nome}: In natura, la ${curiositaPianta.nome} è spesso associata a simboli di bellezza e amore.`;

  // Aggiungi la curiosità
  const curiositaElement = document.getElementById("curiosita");
  curiositaElement.innerText = curiositaText;
}

// Avvia l'avanzamento delle settimane ad intervalli regolari (es. ogni 5 secondi)
const intervalID = setInterval(avanzamentoSettimana, 10000);

function riepilogo() {
  const riepilogoElement = document.getElementById("riepilogo");
  riepilogoElement.innerHTML = `
    <p>Settimana: ${settimana}</p>
    <p>Money ($): ${money}</p>
    <p>Hortus Point (HP): ${hp}</p>
    <p>Ecosystem Point (EP): ${ep}</p>
  `;

  // Aggiorna la collezione
  const collezioneElement = document.getElementById("collezione");
  collezioneElement.innerHTML = '';
  for (let i = 0; i < collezione.length; i++) {
    const icon = collezione[i];
    const iconSquare = document.createElement('div');
    iconSquare.className = 'collezione-square';
    iconSquare.innerText = icon;
    collezioneElement.appendChild(iconSquare);
  }
}

// Aggiunti event listener per le icone delle piante nel menu
document.getElementById("piantaMargherita").addEventListener("click", function () {
  selezionaPianta("🌼", 5);
});

document.getElementById("piantaRosa").addEventListener("click", function () {
  selezionaPianta("🌹", 10);
});

document.getElementById("piantaTulipano").addEventListener("click", function () {
  selezionaPianta("🌷", 15);
});

document.getElementById("piantaGirasole").addEventListener("click", function () {
  selezionaPianta("🌻", 5);
});

document.getElementById("piantaOrchidea").addEventListener("click", function () {
  selezionaPianta("🌸", 30);
});

document.getElementById("piantaIris").addEventListener("click", function () {
  selezionaPianta("🌺", 15);
});

document.getElementById("piantaGiglio").addEventListener("click", function () {
  selezionaPianta("🌼", 25);
});

document.getElementById("piantaPeonia").addEventListener("click", function () {
  selezionaPianta("🌷", 50);
});

document.getElementById("piantaLavanda").addEventListener("click", function () {
  selezionaPianta("🌱", 10);
});

// Definisci un oggetto che mappa i nomi delle piante alle rispettive curiosità
const curiositaPiante = {
  "🌼 Margherita": "I semi di margherita possono essere trasportati dal vento fino a 100 km di distanza!",
  "🌹 Rosa": "La rosa più antica del mondo ha oltre 400 anni e si trova in Germania.",
  "🌷 Tulipano": "Il tulipano è il fiore nazionale dei Paesi Bassi e il fiore più coltivato al mondo.",
  "🌻 Girasole": "Il girasole può seguire il sole con la testa durante la giornata.",
  "🌸 Orchidea": "L'orchidea è la famiglia di piante più numerosa al mondo, con oltre 25.000 specie diverse.",
  "🌺 Iris": "L'iris è il fiore simbolo della città di Firenze, in Italia.",
  "🌼 Giglio": "Il giglio è il fiore nazionale della Francia e il fiore simbolo della purezza e dell'innocenza.",
  "🌷 Peonia": "La peonia è il fiore simbolo della Cina e il fiore simbolo della felicità e della fortuna.",
  "🌱 Lavanda": "La lavanda è una pianta aromatica utilizzata da secoli per le sue proprietà rilassanti e sedative."
};

// Funzione per selezionare una pianta
function selezionaPianta(tipo, costo) {
  if (settimana >= maxSettimane) {
    alert("Il tuo periodo di gestione è finito! Grazie di essere stato con noi <3");
    return;
  }

  if (money < costo) {
    alert("Non hai abbastanza soldi per piantare questa specie!");
    return;
  }

  if (collezione.length >= 100) {
    alert("Non c'è più spazio nell'orto!");
    return;
  }

  money -= costo;
  collezione.push(tipo);

  // Mostra la curiosità relativa alla pianta appena acquistata
  mostraCuriosita(tipo);

  riepilogo();
}

// Funzione per mostrare la curiosità relativa alla pianta
function mostraCuriosita(pianta) {
  const curiositaElement = document.getElementById("curiosita");
  const curiositaText = curiositaPiante[pianta];
  if (curiositaText) {
    curiositaElement.innerText = curiositaText;
  }
}


// Funzione per la manutenzione
document.getElementById("manutenzione").addEventListener("click", function () {
  if (settimana >= maxSettimane) {
    alert("Il tuo periodo di gestione è finito! Grazie di essere stato con noi <3");
    return;
  }

  if (collezione.length === 0) {
    alert("Niente da mantenere. Pianta qualcosa prima!");
    return;
  }

  const costo = 5 * collezione.length;
  money -= costo;
  hp += 10;

  riepilogo();
});

// Funzione per i visitatori
document.getElementById("visitatori").addEventListener("click", function () {
  if (settimana >= maxSettimane) {
    alert("Il tuo periodo di gestione è finito! Grazie di essere stato con noi <3");
    return;
  }

  const numeroCasuale = Math.random() * 0.6 + 0.2; // Ridotto il guadagno settimanale
  const guadagno = Math.floor(numeroCasuale * collezione.length * 2);
  money += guadagno;

  riepilogo();
});

function gameover() {
  alert("Si, è un game over. La prossima volta sii più attento ai tuoi fondi e alla manutenzione");
  location.reload(); // Ricarica la pagina per iniziare una nuova partita
}

riepilogo();

// Seleziona l'elemento audio
const backgroundmusic = document.getElementById("backgroundMusic");

// Avvia la riproduzione della musica
backgroundmusic.play();

// Seleziona i pulsanti "Play" e "Pause"
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");

// Aggiungi un gestore per il pulsante "Play"
playButton.addEventListener("click", function() {
  backgroundmusic.play(); // Avvia la riproduzione della musica
});

// Aggiungi un gestore per il pulsante "Pause"
pauseButton.addEventListener("click", function() {
  backgroundMusic.pause(); // Metti in pausa la riproduzione della musica
});


// Seleziona l'elemento audio
const backgroundMusic = document.getElementById("backgroundMusic");

// Seleziona il pulsante di toggle della musica
const toggleMusicButton = document.getElementById("toggleMusic");

// Imposta una variabile per tenere traccia dello stato della musica
let isMusicPlaying = true;

// Aggiungi un gestore per il pulsante di toggle della musica
toggleMusicButton.addEventListener("click", function () {
  if (isMusicPlaying) {
    // Metti in pausa la riproduzione della musica
    backgroundMusic.pause();
    // Cambia l'icona a "🎵" (riproduci)
    toggleMusicButton.textContent = "🎵";
  } else {
    // Riprendi la riproduzione della musica
    backgroundMusic.play();
    // Cambia l'icona a "🔇" (pausa)
    toggleMusicButton.textContent = "🔇";
  }
  // Inverti lo stato della musica
  isMusicPlaying = !isMusicPlaying;
});
