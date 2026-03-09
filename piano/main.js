console.log("init");

//variables globales
let touches;
let audio;

const onClickTouche = (e) => {
  //récupération de la balise qi a déclenché le click
  const element = e.target;

  //récupération du data-son sur la balise
  const soundPath = `pianoNotes/piano-${element.dataset.son}-wav.mp3`;
  //   const soundPath = "pianoNotes/piano-" + element.dataset.son + "-wav.mp3";
  console.log(soundPath);

  //change la source de la balise audio
  audio.src = soundPath;
  //joue l'audio
  audio.play();
};

const onKeyDown = (e) => {
  console.log(e.keyCode);

  for (const div of touches) {
    //si le numéro de la touche dnas le data-key est égal à e.keycode
    //c'est  cette div qu'il faut jouer
    if (div.dataset.key == e.keyCode) {
      console.log(div);
      const soundPath = `pianoNotes/piano-${div.dataset.son}-wav.mp3`;

      let newAudio = document.createElement("audio");

      newAudio.src = soundPath;
      document.body.appendChild(newAudio);
      newAudio.play();

      break;
    }
  }
};

//quand les balises s ont chargées
const onDOMLoaded = () => {
  console.log("DOM loaded");

  //on récupère l'audio et les touches
  audio = document.querySelector("#player");
  touches = document.querySelectorAll(".touche");

  console.log(audio, touches);

  for (const touche of touches) {
    console.log(touche);
    touche.addEventListener("click", onClickTouche);
  }
  document.addEventListener("keydown", onKeyDown);
};

document.addEventListener("DOMContentLoaded", onDOMLoaded);
