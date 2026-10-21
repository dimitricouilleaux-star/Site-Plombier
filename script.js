// Sélection de la barre de navigation
const navbar = document.getElementById('navbar');

// Écouteur d'événement sur le défilement (scroll) de la page
window.addEventListener('scroll', () => {
    // Si on descend de plus de 50 pixels
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animation douce pour les liens de navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if(targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80, // -80 pour compenser la hauteur du menu fixe
                behavior: 'smooth'
            });
        }
    });
});

// --- LOGIQUE DU MULTI-STEP FORM ---
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.btn-next');
const prevBtns = document.querySelectorAll('.btn-prev');
const progress = document.getElementById('progress');
const form = document.getElementById('multiStepForm');
let currentStep = 0;

// Met à jour l'affichage de l'étape et de la barre de progression
function updateStep(stepIndex) {
    steps.forEach((step, index) => {
        step.classList.toggle('active', index === stepIndex);
    });
    
    // Calcul de la progression (3 étapes = 33%, 66%, 100%)
    const progressPercent = ((stepIndex + 1) / (steps.length - 1)) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Boutons "Suivant"
nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Optionnel : Vérifier si un choix a été fait avant de passer à la suite
        const currentInputs = steps[currentStep].querySelectorAll('input[type="radio"]:checked');
        if (steps[currentStep].querySelectorAll('input[type="radio"]').length > 0 && currentInputs.length === 0) {
            alert('Veuillez sélectionner une option pour continuer.');
            return;
        }

        if (currentStep < steps.length - 2) { // -2 car la dernière div est le message de succès
            currentStep++;
            updateStep(currentStep);
        }
    });
});

// Boutons "Retour"
prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateStep(currentStep);
        }
    });
});

// Gestion de la soumission du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    // Ici, tu peux laisser Formspree faire son travail 
    // ou afficher directement le message de succès pour la démo
    
    steps.forEach(step => step.classList.remove('active'));
    document.getElementById('successMessage').classList.add('active');
    progress.style.width = '100%';
    
    // Si tu utilises Formspree, décommente la ligne ci-dessous pour envoyer réellement les données :
    // form.submit();
});