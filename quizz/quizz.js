let json;
let score = 0;
let currentQuestion = 0;

//HTML elements
let divQuestion;
let divScore;
let btnReponse1;
let btnReponse2;
let btnReponse3;
let inter;
let interTitre;
let interBtn;
let divResult;
let divResultScore;
let btnReplay;

const updateQuestion = () => {
  //texte de la question
  divQuestion.innerText = json.quizz[currentQuestion].question;

  //texte des boutons
  btnReponse1.innerText = json.quizz[currentQuestion].reponses[0].text;
  btnReponse2.innerText = json.quizz[currentQuestion].reponses[1].text;
  btnReponse3.innerText = json.quizz[currentQuestion].reponses[2].text;
};

const checkReponse = (e) => {
  let i = parseInt(e.target.dataset.index);

  console.log(i);

  console.log(json.quizz[currentQuestion].reponses[i].isOk);

  //questions.quizz[0].reponses[i].isOk == true
  if (json.quizz[currentQuestion].reponses[i].isOk) {
    //ajouter des points dans le score
    score += 100;

    //mettre à jour la div score
    divScore.innerText = score;

    interTitre.innerText = json.good;
  } else {
    interTitre.innerText = json.bad;
  }

  inter.style.display = "flex";
};

const onClickNextQuestion = () => {
  inter.style.display = "none";

  //est-ce qu'on est à la fin du quizz

  if (currentQuestion < json.quizz.length - 1) {
    //question suivante
    currentQuestion++;

    updateQuestion();
  } else {
    divResult.style.display = "flex";
    divResultScore.innerText = score;
  }
};

const replay = () => {
  console.log("rejouer");

  divResult.style.display = "none";
  currentQuestion = 0;
  score = 0;
  divScore.innerText = score;

  updateQuestion();
};

//une fois le json chargé et mis dans questions
const createQuizz = () => {
  console.log(json.quizz[currentQuestion].reponses[0]);

  updateQuestion();

  btnReponse1.addEventListener("click", checkReponse);
  btnReponse2.addEventListener("click", checkReponse);
  btnReponse3.addEventListener("click", checkReponse);

  interBtn.addEventListener("click", onClickNextQuestion);

  btnReplay.addEventListener("click", replay);
};

const loadJSON = () => {
  //Attends le chargement du JSON
  fetch("quizz.json")
    .then((response) => {
      //traitement de la promesse
      console.log(response);

      if (response.ok) {
        //on converti la réponse en json pour le then suivant
        return response.json();
      } else {
        console.log("ça s'est pas bien passé");
      }
    })
    .then((data) => {
      //traitement des données
      console.log("data", data);

      //lorsqu'on a bien récupéré le JSON
      json = data;

      createQuizz();
    });
};

const onDomLoaded = () => {
  console.log("dom loaded");

  //récupération des éléments HTML
  divQuestion = document.querySelector("#question");
  divScore = document.querySelector("#score");
  btnReponse1 = document.querySelector("#reponse1");
  btnReponse2 = document.querySelector("#reponse2");
  btnReponse3 = document.querySelector("#reponse3");
  inter = document.querySelector("#inter");
  interTitre = document.querySelector("#inter__text");
  interBtn = document.querySelector("#inter__btn");
  divResult = document.querySelector("#resultat");
  divResultScore = document.querySelector("#resultat_score");
  btnReplay = document.querySelector("#replay");

  //Chargement du JSON
  loadJSON();
};

document.addEventListener("DOMContentLoaded", onDomLoaded);
