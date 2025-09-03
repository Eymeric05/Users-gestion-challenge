// ========================================
// FONCTIONS UTILES POUR TOUTE L'APPLICATION
// ========================================

/**
 * Affiche un message de succès
 * @param {string} message - Message à afficher
 * @param {number} duration - Durée d'affichage en ms (défaut: 3000)
 */
function showSuccessMessage(message, duration = 3000) {
    const successElement = document.getElementById('successMessage');
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
        setTimeout(() => {
            successElement.style.display = 'none';
        }, duration);
    }
}

/**
 * Affiche un message d'erreur
 * @param {string} message - Message à afficher
 * @param {number} duration - Durée d'affichage en ms (défaut: 5000)
 */
function showErrorMessage(message, duration = 5000) {
    const errorElement = document.getElementById('errorMessage');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, duration);
    }
}

/**
 * Valide un champ de formulaire
 * @param {HTMLInputElement} input - Champ à valider
 * @param {string} errorId - ID de l'élément d'erreur
 * @param {string} message - Message d'erreur
 * @returns {boolean} - True si valide, false sinon
 */
function validateField(input, errorId, message) {
    const errorElement = document.getElementById(errorId);
    const isValid = input.value.trim() !== '';
    
    if (input.type === 'email') {
        // Vérifier que c'est un email valide
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(input.value);
        
        if (!isValid || !isValidEmail) {
            input.classList.add('error');
            errorElement.style.display = 'block';
            errorElement.textContent = message;
            return false;
        }
    } else {
        // Vérifier que le champ n'est pas vide
        if (!isValid) {
            input.classList.add('error');
            errorElement.style.display = 'block';
            errorElement.textContent = message;
            return false;
        }
    }
    
    // Tout va bien, on enlève l'erreur
    input.classList.remove('error');
    errorElement.style.display = 'none';
    return true;
}

/**
 * Enlève l'erreur d'un champ
 * @param {HTMLInputElement} input - Champ à nettoyer
 * @param {string} errorId - ID de l'élément d'erreur
 */
function resetFieldError(input, errorId) {
    input.classList.remove('error');
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

/**
 * Fait une requête vers l'API
 * @param {string} url - URL de l'API
 * @param {Object} options - Options de la requête
 * @returns {Promise} - Promesse de la réponse
 */
async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        // Si la réponse n'est pas ok, on lance une erreur
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
        }
        
        return response;
    } catch (error) {
        console.error('Erreur API:', error);
        throw error;
    }
}

/**
 * Demande confirmation à l'utilisateur
 * @param {string} message - Message de confirmation
 * @returns {boolean} - True si confirmé, false sinon
 */
function confirmAction(message) {
    return confirm(message);
}

/**
 * Redirige vers une autre page
 * @param {string} url - URL de destination
 */
function redirectTo(url) {
    window.location.href = url;
}

/**
 * Retourne à la page précédente
 */
function goBack() {
    history.back();
}

/**
 * Formate un message d'erreur pour l'affichage
 * @param {Error} error - Erreur à formater
 * @returns {string} - Message formaté
 */
function formatErrorMessage(error) {
    if (error.message.includes('Erreur HTTP:')) {
        return error.message;
    }
    return 'Une erreur inattendue s\'est produite. Veuillez réessayer.';
}

/**
 * Désactive un bouton et change son texte
 * @param {HTMLButtonElement} button - Bouton à désactiver
 * @param {string} loadingText - Texte à afficher pendant le chargement
 */
function setButtonLoading(button, loadingText) {
    button.disabled = true;
    button.textContent = loadingText;
}

/**
 * Réactive un bouton et restaure son texte
 * @param {HTMLButtonElement} button - Bouton à réactiver
 * @param {string} originalText - Texte original du bouton
 */
function resetButton(button, originalText) {
    button.disabled = false;
    button.textContent = originalText;
}

/**
 * Ajoute une classe CSS avec un délai optionnel
 * @param {HTMLElement} element - Élément à animer
 * @param {string} className - Classe CSS à ajouter
 * @param {number} delay - Délai en ms avant l'ajout
 */
function animateElement(element, className, delay = 0) {
    setTimeout(() => {
        element.classList.add(className);
    }, delay);
}

/**
 * Enlève une classe CSS avec un délai optionnel
 * @param {HTMLElement} element - Élément à animer
 * @param {string} className - Classe CSS à enlever
 * @param {number} delay - Délai en ms avant la suppression
 */
function deanimateElement(element, className, delay = 0) {
    setTimeout(() => {
        element.classList.remove(className);
    }, delay);
}

/**
 * Vérifie si un élément est visible
 * @param {HTMLElement} element - Élément à vérifier
 * @returns {boolean} - True si visible, false sinon
 */
function isElementVisible(element) {
    return element.style.display !== 'none' && 
           element.offsetParent !== null;
}

/**
 * Bascule la visibilité d'un élément
 * @param {HTMLElement} element - Élément à basculer
 * @param {string} displayType - Type d'affichage (défaut: 'block')
 */
function toggleElement(element, displayType = 'block') {
    if (isElementVisible(element)) {
        element.style.display = 'none';
    } else {
        element.style.display = displayType;
    }
}

/**
 * Ajoute un écouteur d'événement avec gestion d'erreur
 * @param {HTMLElement} element - Élément cible
 * @param {string} event - Type d'événement
 * @param {Function} handler - Gestionnaire d'événement
 * @param {Object} options - Options de l'écouteur
 */
function safeAddEventListener(element, event, handler, options = {}) {
    try {
        element.addEventListener(event, handler, options);
    } catch (error) {
        console.error(`Erreur lors de l'ajout de l'écouteur d'événement ${event}:`, error);
    }
}

/**
 * Enlève un écouteur d'événement avec gestion d'erreur
 * @param {HTMLElement} element - Élément cible
 * @param {string} event - Type d'événement
 * @param {Function} handler - Gestionnaire d'événement
 * @param {Object} options - Options de l'écouteur
 */
function safeRemoveEventListener(element, event, handler, options = {}) {
    try {
        element.removeEventListener(event, handler, options);
    } catch (error) {
        console.error(`Erreur lors de la suppression de l'écouteur d'événement ${event}:`, error);
    }
}

// Rendre toutes ces fonctions disponibles globalement
window.AppUtils = {
    showSuccessMessage,
    showErrorMessage,
    validateField,
    resetFieldError,
    apiRequest,
    confirmAction,
    redirectTo,
    goBack,
    formatErrorMessage,
    setButtonLoading,
    resetButton,
    animateElement,
    deanimateElement,
    isElementVisible,
    toggleElement,
    safeAddEventListener,
    safeRemoveEventListener
};
