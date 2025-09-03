// ========================================
// LOGIQUE DE LA PAGE FORMULAIRE
// ========================================

// Éléments de la page qu'on va utiliser
let form, nomInput, emailInput, submitBtn, successMessage;

// Quand la page est chargée, on initialise tout
document.addEventListener('DOMContentLoaded', () => {
    initializeFormPage();
});

/**
 * Initialise la page formulaire
 */
function initializeFormPage() {
    // Récupérer tous les éléments qu'on va utiliser
    form = document.getElementById('userForm');
    nomInput = document.getElementById('nom');
    emailInput = document.getElementById('email');
    submitBtn = document.getElementById('submitBtn');
    successMessage = document.getElementById('successMessage');
    
    if (form && nomInput && emailInput && submitBtn) {
        setupFormValidation();
        setupFormSubmission();
    }
}

/**
 * Configure la validation du formulaire
 */
function setupFormValidation() {
    // Validation en temps réel quand l'utilisateur tape
    nomInput.addEventListener('input', () => {
        AppUtils.validateField(nomInput, 'nomError', 'Le nom est requis');
    });
    
    emailInput.addEventListener('input', () => {
        AppUtils.validateField(emailInput, 'emailError', 'L\'email est requis et doit être valide');
    });
    
    // Enlever les erreurs quand l'utilisateur clique sur le champ
    nomInput.addEventListener('focus', () => {
        AppUtils.resetFieldError(nomInput, 'nomError');
    });
    
    emailInput.addEventListener('focus', () => {
        AppUtils.resetFieldError(emailInput, 'emailError');
    });
}

/**
 * Configure la soumission du formulaire
 */
function setupFormSubmission() {
    form.addEventListener('submit', handleFormSubmission);
}

/**
 * Gère la soumission du formulaire
 * @param {Event} e - Événement de soumission
 */
async function handleFormSubmission(e) {
    e.preventDefault(); // Empêcher le rechargement de la page
    
    if (!validateForm()) {
        return; // Le formulaire n'est pas valide
    }
    
    const formData = {
        nom: nomInput.value.trim(),
        email: emailInput.value.trim()
    };
    
    await submitUserData(formData);
}

/**
 * Valide le formulaire complet
 * @returns {boolean} - True si valide, false sinon
 */
function validateForm() {
    const isNomValid = AppUtils.validateField(nomInput, 'nomError', 'Le nom est requis');
    const isEmailValid = AppUtils.validateField(emailInput, 'emailError', 'L\'email est requis et doit être valide');
    
    return isNomValid && isEmailValid;
}

/**
 * Envoie les données utilisateur à l'API
 * @param {Object} formData - Données du formulaire
 */
async function submitUserData(formData) {
    // Désactiver le bouton et montrer qu'on travaille
    AppUtils.setButtonLoading(submitBtn, 'Ajout en cours...');
    
    try {
        const response = await AppUtils.apiRequest('/api/users', {
            method: 'POST',
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            handleSubmissionSuccess();
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout:', error);
        handleSubmissionError(error);
    } finally {
        // Remettre le bouton comme avant
        AppUtils.resetButton(submitBtn, 'Ajouter l\'utilisateur');
    }
}

/**
 * Gère le succès de la soumission
 */
function handleSubmissionSuccess() {
    // Montrer le message de succès
    if (successMessage) {
        AppUtils.showSuccessMessage('Utilisateur ajouté avec succès !');
    }
    
    // Vider le formulaire
    form.reset();
    
    // Enlever toutes les erreurs
    AppUtils.resetFieldError(nomInput, 'nomError');
    AppUtils.resetFieldError(emailInput, 'emailError');
    
    // Retourner à l'accueil après 2 secondes
    setTimeout(() => {
        AppUtils.redirectTo('/');
    }, 2000);
}

/**
 * Gère l'erreur de la soumission
 * @param {Error} error - Erreur survenue
 */
function handleSubmissionError(error) {
    const errorMessage = AppUtils.formatErrorMessage(error);
    alert('Erreur lors de l\'ajout: ' + errorMessage);
}

/**
 * Remet le formulaire à zéro
 */
function resetForm() {
    if (form) {
        form.reset();
        AppUtils.resetFieldError(nomInput, 'nomError');
        AppUtils.resetFieldError(emailInput, 'emailError');
        
        if (successMessage) {
            successMessage.style.display = 'none';
        }
    }
}

/**
 * Valide un champ spécifique
 * @param {HTMLInputElement} input - Champ à valider
 * @param {string} errorId - ID de l'élément d'erreur
 * @param {string} message - Message d'erreur
 * @returns {boolean} - True si valide, false sinon
 */
function validateField(input, errorId, message) {
    return AppUtils.validateField(input, errorId, message);
}

/**
 * Enlève l'erreur d'un champ
 * @param {HTMLInputElement} input - Champ à nettoyer
 * @param {string} errorId - ID de l'élément d'erreur
 */
function resetFieldError(input, errorId) {
    AppUtils.resetFieldError(input, errorId);
}

/**
 * Vérifie si le formulaire est valide
 * @returns {boolean} - True si valide, false sinon
 */
function isFormValid() {
    return validateForm();
}

/**
 * Récupère les données du formulaire
 * @returns {Object} - Données du formulaire
 */
function getFormData() {
    return {
        nom: nomInput ? nomInput.value.trim() : '',
        email: emailInput ? emailInput.value.trim() : ''
    };
}

/**
 * Met des données dans le formulaire
 * @param {Object} data - Données à mettre
 */
function setFormData(data) {
    if (nomInput && data.nom) {
        nomInput.value = data.nom;
    }
    if (emailInput && data.email) {
        emailInput.value = data.email;
    }
}

/**
 * Active ou désactive le formulaire
 * @param {boolean} enabled - True pour activer, false pour désactiver
 */
function setFormEnabled(enabled) {
    const inputs = form.querySelectorAll('input, button');
    inputs.forEach(input => {
        input.disabled = !enabled;
    });
}

/**
 * Ajoute une classe d'animation au formulaire
 * @param {string} className - Classe CSS à ajouter
 */
function animateForm(className) {
    if (form) {
        AppUtils.animateElement(form, className);
    }
}

/**
 * Enlève une classe d'animation du formulaire
 * @param {string} className - Classe CSS à enlever
 */
function deanimateForm(className) {
    if (form) {
        AppUtils.deanimateElement(form, className);
    }
}

// Rendre ces fonctions disponibles globalement
window.FormPage = {
    resetForm,
    validateField,
    resetFieldError,
    isFormValid,
    getFormData,
    setFormData,
    setFormEnabled,
    animateForm,
    deanimateForm
};
