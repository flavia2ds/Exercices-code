console.log("JS loaded");

//types de données
//types de données
//let nombre = 12; number
//let text = "coucou"; string
//let boolean = true; bool

let tableau = ["chien", "chat", "loup"];
//on essaye de stocker un seul type de données

console.log(tableau);

//récup la longueur du tableau 
console.log(tableau.length);

//l'ordinateur commence à compter à partir de 0 

//récuperation du deuxième élément du tableau
console.log(tableau[1]);

// rajouter un élément à la fin du tableau 
tableau.push("poisson");
console.log(tableau);

//boucle for

//1. initialisation : crée une variable (compteur) et assigne la valeur 0
//2. la condition d'arrêt : tu t'exécutes tant que i est strictement inférieur à 200
//3. incrémentation : comment i évolue à chaque tour de boucle

for (let i = 0; i < 200; i++) {
	
	console.log(i);
}

console.log("fin de la boucle");

//crée une boucle qui s'execute autant de fois qu'il y a d'éléments dans le tableau
for (let j = 0; j < tableau.length; j++) {
	//crée une constante qui stocke l'élement avec l'index j
	const animal = tableau[j];
	console.log(animal);
}