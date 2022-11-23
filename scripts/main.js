const app = document.querySelector('#app');
const delay = ms => new Promise(res => setTimeout(res, ms));
let commands = {
	'contact': cmdContact,
	'all': cmdAll,
	'all 2': cmdAll2,
	'about me': cmdAboutMe,
	'certificates': cmdCertificates,
	'experiences': cmdExperiences,
	'hobbies': cmdHobbies,
	'skills': cmdSkills,
	'clear': cmdClear,
	'home': cmdHome,
	'light': cmdLight,
	'dark': cmdDark,
	'pdf': cmdPdf,
	// 'yolo': cmdYolo,
};
let tabIndex = -1;
let logs = [];
let yolo = false;
let title = document.getElementById('asciiClem').innerHTML;
let skillsPrint = document.getElementById('skills').innerHTML;
let nbTab = false;
let cmdIndex = -1;
let input = '';

app.addEventListener('keypress', async function (event) {
	if (event.key === 'Enter') {
		await delay(150);
		getInputValue();
		removeInput();
		await delay(150);
		new_line();
		tabIndex = -1;
		cmdIndex = -1;
		nbTab = false;
	}
});

document.onkeydown = function (e) {
	if (e.keyCode === 38) {
		if (tabIndex >= -1 && tabIndex < logs.length - 1) {
			tabIndex++;
			document.querySelector('input').value = logs[tabIndex];
		}
	} else if (e.keyCode === 40) {
		if (tabIndex > 0 && tabIndex < logs.length) {
			tabIndex--;
			document.querySelector('input').value = logs[tabIndex];
		}
	}
};

app.addEventListener('keydown', async function (event) {
	if (event.key !== 'Tab') {
		if (event.key == 'Backspace') {
			nbTab = false;
		}
		return;
	}
	event.preventDefault();
	if (nbTab === false) {
		input = document.querySelector('input').value;
	}
	nbTab = true;
	let checked = check(input);
	if (checked != undefined) {
		if (cmdIndex >= -1 && cmdIndex < checked.length - 1) {
			cmdIndex++;
			document.querySelector('input').value = checked[cmdIndex];
			if (cmdIndex >= checked.length - 1) {
				cmdIndex = -1;
			}
		}
	}
});

function check(input) {
	if ((input === '')||(input === undefined)) {
		let list = Object.keys(commands);
		return list.sort();
	}
	let list = [];
	Object.entries(commands).forEach(([key, value]) => {
		if (key.startsWith(input.toLowerCase())) {
			list.push(key);
		}
	});
	return list.sort();
}

app.addEventListener('keydown', async function (event) {});

app.addEventListener('click', function (event) {
	const input = document.querySelector('input');
	input.focus();
});

async function open_terminal() {
	createText('Loading commands');
	await delay(400);
	createText('Starting main script');
	await delay(400);
	createText('Loading hobbies');
	await delay(400);
	createText('Démarrage du serveur...');
	await delay(1500);
	createAscii(title);
	createText(
		"Bienvenue sur mon CV en lignes de commandes, vous pouvez executer plusieurs commandes pour accéder aux différentes informations me concernant, faites 'all' pour toutes les voir.<br><br> (PS : l'autocompletion est disponible avec 'Tab' et les commandes précedentes avec les fleches du haut et bas)",
	);
	await delay(500);
	new_line();
}

function new_line() {
	const p = document.createElement('p');
	const span1 = document.createElement('span');
	const span2 = document.createElement('span');
	p.setAttribute('class', 'path');
	p.textContent = '# Clem';
	span1.textContent = ' in';
	span2.textContent = ' ~/guest';
	p.appendChild(span1);
	p.appendChild(span2);
	app.appendChild(p);
	const div = document.createElement('div');
	div.setAttribute('class', 'type');
	const i = document.createElement('i');
	i.setAttribute('class', 'fas fa-angle-right icone');
	const input = document.createElement('input');
	div.appendChild(i);
	div.appendChild(input);
	app.appendChild(div);
	input.focus();
}

function removeInput() {
	const div = document.querySelector('.type');
	app.removeChild(div);
}

async function getInputValue() {
	const value = document.querySelector('input').value;
	if (commands[value] !== undefined) {
		trueValue(value);
		commands[value]();
	} else {
		falseValue(value);
		createText(`command not found: ${value}`);
	}
	if (value != '') {
		logs.unshift(value);
	}
}

function cmdAll() {
	createText('- "home" pour retourner sur le menu principal');
	createText('- "clear" pour netoyer le terminal');
	createText('- "about me" pour en savoir plus sur moi');
	createText('- "certificates" pour connaitre mon parcour scolaire');
	createText(
		'- "experiences" pour lire mes différentes expériences professionnelles',
	);
	createText('- "hobbies" pour voir mes passions et autres activités');
	createText('- "contact me" pour avoir mes coordonnées et me contacter');
	createText('- "pdf" pour avoir et telecharger mon CV officiel en pdf');
	createText('- "all 2" pour afficher les commandes secondaires');
}

function cmdAll2() {
	createText('- "light" pour mettre le theme clair');
	createText('- "dark" pour mettre le theme sombre');
}

function cmdHome() {
	cmdClear();
	open_terminal();
}

function cmdClear() {
	document.querySelectorAll('p').forEach(e => e.parentNode.removeChild(e));
	document
		.querySelectorAll('section')
		.forEach(e => e.parentNode.removeChild(e));
}

function cmdPdf() {
	createText('<p><b>VOICI MON CV OFFICIEL :</b></p>');
	const a = document.createElement('a');
	a.href =
		'https://docdro.id/LTkkQiQ';
	a.setAttribute('download', 'CV - Clément_HERBELIN.pdf');
	a.setAttribute('target', "blank");
	a.click();
}

function cmdSkills() {
	createAscii(skillsPrint);
}

function cmdLight() {
	if (document.body.classList.contains('light-mode')) {
		createText('Vous etes déjà en mode clair.');
		return;
	}
	setLightMode(true);
	return 'Vous êtes maintenant en mode clair.';
}

function cmdDark() {
	if (!document.body.classList.contains('light-mode')) {
		createText('Vous etes déjà en mode sombre.');
		return;
	}
	setLightMode(false);
	return 'Vous êtes maintenant en mode sombre.';
}

function cmdYolo() {
	yolo = !yolo;
	setYoloMode(yolo);
}

function cmdAboutMe() {
	createText('<p><b>A PROPOS DE MOI :</b></p>');
	createText(
		"Étudiant de 20 ans ayant un esprit scientifique, des connaissances en informatique et des valeurs sociales. J'étudie actuellement à l'école d'ingénieur en informatique Hexagone à Clermont-Ferrand.",
	);
}

function cmdCertificates() {
	createText('<p><b>PARCOURS SCOLAIRE :</b></p>');
	createText(
		'- Brevet Collège Champclaux (Chatel guyon 63140) (09/2013 - 06/2017)',
	);
	createText(
		"- Bac S (Sciences de l'Ingénieur) Lycée Pierre Joel Bonté (Riom 63200) (09/2017 - 06/2020)",
	);
	createText(
		"- 1ère année d'IUT GEII à l'IUT1 de Grenoble (09/2020 - 05/2021)",
	);
	createText(
		'- Ecole Hexagone, Clermont Ferrand 63000, titre professionnel de niveau 7 (bac + 5) Manager de projets informatiques (09/2021 - 07/2026, deuxième année en cours)',
	);
}

function cmdExperiences() {
	createText('<p><b>EXPERIENCES PROFESSIONNELLES :</b></p>');
	createText("- Stage de 3ème dans l'entreprise Abiterre (10/2016)");
	createText(
		"- Implication dans l'association Amicale Laïc de Volvic en tant que coach sportif (plusieurs équipes de 6 à 14 ans), juge officiel (diplôme du BFO1) et sportif (2016 - 2020",
	);
	createText('- Castration des maïs (07/2018)');
	createText(
		"- Electricien en CDD dans l'entreprise DIAS Electricité (07/2019)",
	);
	createText("- Bénévole à l'EHPAD La Providence à Issoire (depuis 05/2022)");
	createText('- Entraîneur de Hadnball (depuis 09/2022)');
	createText(
		'- Stage de 6 semaines chez CGI en tant que développeur fullstack (07/2022 - 08/2022)',
	);
	createText(
		'- Developpeur Bénévole pour le projet communautaire "Galaxy Life" (depuis 06/2022)',
	);
}

function cmdHobbies() {
	createText('<p><b>PASSIONS :</b></p>');
	createText(
		"Je suis passioné d'informatique et plus généralement de sciences mais également sportif. Je pratique le handball et l'escalade",
	);
}

function cmdContact() {
	createText('<p><b>CONTACTEZ MOI :</b></p>');
	createText(
		"Vous pouvez me contacter a ce numéro : <a href='callto:0768364196' target='_blank'>0768364196</a>",
	);
	createText('ou bien par mail a cette adresse : clement.herbelin@gmail.com');
}

function setLightMode(value) {
	if (value) {
		document.body.classList.add('light-mode');
	} else {
		document.body.classList.remove('light-mode');
	}
}

function setYoloMode(value) {
	if (value) {
		document.body.classList.add('yolo-mode');
		document.getElementById('container').classList.add('yolo-mode');
	} else {
		document.body.classList.remove('yolo-mode');
		document.getElementById('container').classList.remove('yolo-mode');
	}
}

function trueValue(value) {
	const div = document.createElement('section');
	div.setAttribute('class', 'type2');
	const i = document.createElement('i');
	i.setAttribute('class', 'fas fa-angle-right icone');
	const mensagem = document.createElement('h2');
	mensagem.setAttribute('class', 'sucess');
	mensagem.textContent = `${value}`;
	div.appendChild(i);
	div.appendChild(mensagem);
	app.appendChild(div);
}

function falseValue(value) {
	const div = document.createElement('section');
	div.setAttribute('class', 'type2');
	const i = document.createElement('i');
	i.setAttribute('class', 'fas fa-angle-right icone error');
	const mensagem = document.createElement('h2');
	mensagem.setAttribute('class', 'error');
	mensagem.textContent = `${value}`;
	div.appendChild(i);
	div.appendChild(mensagem);
	app.appendChild(div);
}

function createText(text, classname) {
	const p = document.createElement('p');
	p.innerHTML = text;
	app.appendChild(p);
}

function createAscii(text, classname) {
	const pre = document.createElement('pre');
	pre.innerHTML = text;
	app.appendChild(pre);
}

function createCode(code, text) {
	const p = document.createElement('p');
	p.setAttribute('class', 'code');
	p.innerHTML = `${code} <br/><span class='text'> ${text} </span>`;
	app.appendChild(p);
}

open_terminal();
