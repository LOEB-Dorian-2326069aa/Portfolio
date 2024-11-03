<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Portfolio - Dorian Loeb</title>
  <link rel="icon" href="img/favicon_valanor.png">
  <meta name="description" content="Portfolio de Dorian Loeb">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css" type="text/css">
</head>
<body>
<!-- Header -->
<header>
  <div class="boxed">
    <div class="flex aligncenter space-between">
      <button onclick="openMenu()" class="header-menu-mobile">
        <span class="material-icons">menu</span>
      </button>
      <a class="header-logo" href="#">
        <img src="img/logo_valanor.png" alt="Logo Dorian Loeb">
      </a>
      <ul class="header-menu">
        <li><a href="#about">À propos</a></li>
        <li><a href="#experience">Expériences</a></li>
        <li><a href="#skills">Compétences</a></li>
        <li><a href="#projects">Projets</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </div>
</header>

<!-- Overlay pour le menu mobile -->
<div id="overlay" onclick="openMenu()"></div>

<!-- Slider -->
<div class="slider">
  <img class="slider-background" src="img/slider.jpg" alt="Image de fond">
  <div class="slider-content">
    <h1>Dorian Loeb</h1>
    <p>Étudiant en informatique</p>
  </div>
</div>

<!-- À propos de moi -->
<div id="about" class="section">
  <div class="boxed">
    <div class="flex toColumn mCenter">
      <div class="w40 wm100">
        <h2>À propos de moi</h2>
      </div>
      <div class="w60 wm100">
        <p>Je m'appelle Dorian Loeb, étudiant en 2ème année de BUT Informatique à l'IUT d'Aix-en-Provence. Passionné par le développement web, j'ai acquis des compétences solides en programmation et en gestion de projet. Mon objectif est de trouver un stage de 10 semaines pour valider ma deuxième année de BUT et appliquer mes connaissances dans un environnement professionnel.</p>
      </div>
    </div>
  </div>
</div>

<!-- Expériences professionnelles -->
<div id="experience" class="section dark">
  <div class="boxed text-center">
    <h2>Expériences professionnelles</h2>
    <div class="experience-container">
      <!-- Agent de Services Intérieurs -->
      <div class="experience">
        <h3>Agent de Services Intérieurs</h3>
        <p>Juillet - Août 2024</p>
        <p class="location">Hôpital du Pays Salonais - Salon de Provence</p>
        <p>Distribution de matériel dans les services de soins</p>
        <p>Réception et vérification des commandes</p>
      </div>
      <!-- Préparateur de commande -->
      <div class="experience">
        <h3>Préparateur de commande</h3>
        <p>Juillet - Août 2023</p>
        <p class="location">Pro à Pro Distribution Sud - Miramas</p>
        <p>Utilisation du transpalette électrique pour préparer les colis à l'envoi</p>
      </div>
      <!-- Conseiller clientèle -->
      <div class="experience">
        <h3>Conseiller clientèle</h3>
        <p>Juillet - Août 2022</p>
        <p>WELDOM - Salon-de-Provence</p>
        <p>Intégration de l'équipe du rayon luminaire</p>
        <p>Prodiguer des conseils techniques sur les produits</p>
        <p>Mise en rayon</p>
      </div>
      <!-- Stage d'observation - Service informatique -->
      <div class="experience">
        <h3>Stage d'observation - Service informatique</h3>
        <p>Décembre 2019</p>
        <p class="location">Hôpital du Pays Salonais - Salon-de-Provence</p>
        <p>Intégration de l'équipe de maintenance informatique</p>
        <p>Aide à l'installation du matériel informatique dans l'hôpital</p>
      </div>
    </div>
  </div>
</div>



<!-- Compétences -->
<div id="skills" class="section">
  <div class="boxed text-center">
    <h2>Compétences</h2>
    <div class="flex toColumn gap20">
      <!-- Langues -->
      <div class="w100 skill-category">
        <h3>Langues</h3>
        <div class="competence">Anglais : Courant (B1)</div>
      </div>
      <!-- Logiciels -->
      <div class="w100 skill-category">
        <h3>Logiciels</h3>
        <div class="competences">
          <div class="competence">Visual Studio</div>
          <div class="competence">IntelliJ IDEA</div>
          <div class="competence">Microsoft Office</div>
          <div class="competence">Oracle SQL</div>
        </div>
      </div>
      <!-- Langages informatiques -->
      <div class="w100 skill-category">
        <h3>Langages informatiques</h3>
        <div class="competences">
          <div class="competence">PHP</div>
          <div class="competence">HTML/CSS</div>
          <div class="competence">SQL</div>
          <div class="competence">JAVA</div>
          <div class="competence">C++</div>
        </div>
      </div>
    </div>
  </div>
</div>



<!-- Formation -->
<div id="education" class="section dark">
  <div class="boxed text-center">
    <h2>Formation</h2>
    <div class="education-container">
      <!-- BUT Informatique -->
      <div class="education-item">
        <h3>BUT Informatique</h3>
        <p class="date-location">Septembre 2023 - Juin 2026, IUT Aix-Marseille, Aix-en-Provence</p>
        <ul>
          <li>Programmation d'un jeu d'échecs en Java</li>
          <li>Programmation d'un Candy Crush-like en C++</li>
          <li>Programmation d'une base de données sur Access</li>
          <li>Création d'un site WEB avec MySQL/PHP</li>
        </ul>
      </div>
      <!-- Baccalauréat STI2D -->
      <div class="education-item">
        <h3>Baccalauréat STI2D, Mention Bien</h3>
        <p class="date-location">Juin 2023, Lycée polyvalent Adam de Craponne, Salon-de-Provence</p>
        <ul>
          <li>Programmation d'un store banne sur ARDUINO</li>
          <li>Conception et programmation d'un capteur de CO2 et d'un robot-sumo</li>
          <li>Programmation HTML et CSS</li>
          <li>Certification PIX</li>
        </ul>
      </div>
    </div>
  </div>
</div>


<!-- Projets -->
<div id="projects" class="section">
  <div class="boxed text-center">
    <h2>Projets</h2>
    <div class="flex space-between">
      <!-- Chess Game -->
      <div class="w32 wm100 realisation">
        <img src="img/chess.jpg" alt="Chess Game">
        <h3>Chess Game</h3>
        <p>Développement d'un jeu d'échecs en Java pour approfondir mes compétences en algorithmes et programmation orientée objet.</p>
      </div>
      <!-- Candy Crush-like -->
      <div class="w32 wm100 realisation">
        <img src="img/candy_crush.jpg" alt="Candy Crush-like">
        <h3>Candy Crush-like</h3>
        <p>Création d'un jeu similaire à Candy Crush en C++ pour améliorer mes compétences en développement de jeux et en logique de programmation.</p>
      </div>
      <!-- Site WEB avec MySQL/PHP -->
      <div class="w32 wm100 realisation">
        <a href="https://tenracc.alwaysdata.net/">
          <img href="https://tenracc.alwaysdata.net/" src="img/site_tenrac.JPG" alt="Site WEB">
        </a>
        <h3>Site WEB avec MySQL/PHP</h3>
        <p>Développement d'un site web dynamique utilisant MySQL et PHP pour gérer une base de données et offrir des fonctionnalités interactives.</p>
      </div>
    </div>
  </div>
</div>

<!-- Contact -->
<div id="contact" class="section dark">
  <div class="boxed text-center">
    <h2>Contact</h2>
    <div class="contact-info">
      <p>📞 <strong>Téléphone :</strong> 06.33.54.80.08</p>
      <p>📧 <strong>Email :</strong> <a href="mailto:loeb.dorian97@gmail.com">loeb.dorian97@gmail.com</a></p>
      <p>📍 <strong>Localisation :</strong> Eyguières (13430)</p>
      <p>🚗 <strong>Permis :</strong> B</p>
      <p>🎂 <strong>Âge :</strong> 20 ans</p>
    </div>
  </div>
</div>

<!-- Scripts -->
<script src="js/app.js"></script>
</body>
</html>
