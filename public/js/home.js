// ========================================
// LOGIQUE DE LA PAGE D'ACCUEIL
// ========================================

// Éléments de la page qu'on va utiliser
let usersGrid;

// Quand la page est chargée, on initialise tout
document.addEventListener('DOMContentLoaded', () => {
    initializeHomePage();
});

/**
 * Initialise la page d'accueil
 */
function initializeHomePage() {
    usersGrid = document.getElementById('usersGrid');
    if (usersGrid) {
        loadUsers();
    }
}

/**
 * Charge et affiche la liste des utilisateurs
 */
async function loadUsers() {
    try {
        const response = await AppUtils.apiRequest('/api/users');
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
        showUsersError('Erreur lors du chargement des utilisateurs');
    }
}

/**
 * Affiche la liste des utilisateurs
 * @param {Array} users - Liste des utilisateurs
 */
function displayUsers(users) {
    if (!usersGrid) return;
    
    if (users.length === 0) {
        usersGrid.innerHTML = '<div class="no-users">Aucun utilisateur trouvé</div>';
        return;
    }
    
    usersGrid.innerHTML = users.map(user => createUserCard(user)).join('');
}

/**
 * Crée une carte utilisateur
 * @param {Object} user - Données de l'utilisateur
 * @returns {string} - HTML de la carte
 */
function createUserCard(user) {
    return `
        <div class="user-card" onclick="viewUser(${user.id})">
            <div class="user-name">${escapeHtml(user.nom)}</div>
            <div class="user-email">${escapeHtml(user.email)}</div>
            <div class="user-role role-${user.role.toLowerCase()}">${escapeHtml(user.role)}</div>
            <div class="actions">
                <button class="btn btn-small btn-edit" onclick="event.stopPropagation(); editUser(${user.id})">
                    Modifier
                </button>
                <button class="btn btn-small btn-delete" onclick="event.stopPropagation(); deleteUser(${user.id})">
                    Supprimer
                </button>
            </div>
        </div>
    `;
}

/**
 * Affiche une erreur dans la grille des utilisateurs
 * @param {string} message - Message d'erreur
 */
function showUsersError(message) {
    if (usersGrid) {
        usersGrid.innerHTML = `<div class="no-users">${escapeHtml(message)}</div>`;
    }
}

/**
 * Va sur la page de détail d'un utilisateur
 * @param {number} id - ID de l'utilisateur
 */
function viewUser(id) {
    AppUtils.redirectTo(`/user/${id}`);
}

/**
 * Modifie un utilisateur via des prompts simples
 * @param {number} id - ID de l'utilisateur
 */
function editUser(id) {
    const newName = prompt('Nouveau nom:');
    if (newName === null) return; // L'utilisateur a annulé
    
    const newEmail = prompt('Nouvel email:');
    if (newEmail === null) return; // L'utilisateur a annulé
    
    updateUser(id, { nom: newName, email: newEmail });
}

/**
 * Met à jour un utilisateur
 * @param {number} id - ID de l'utilisateur
 * @param {Object} userData - Nouvelles données
 */
async function updateUser(id, userData) {
    try {
        const response = await AppUtils.apiRequest(`/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
        
        if (response.ok) {
            alert('Utilisateur mis à jour avec succès!');
            loadUsers(); // Recharger la liste pour voir les changements
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        alert('Erreur lors de la mise à jour: ' + AppUtils.formatErrorMessage(error));
    }
}

/**
 * Supprime un utilisateur
 * @param {number} id - ID de l'utilisateur
 */
async function deleteUser(id) {
    if (!AppUtils.confirmAction('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        return; // L'utilisateur a annulé
    }
    
    try {
        const response = await AppUtils.apiRequest(`/api/users/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Utilisateur supprimé avec succès!');
            loadUsers(); // Recharger la liste
        }
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression: ' + AppUtils.formatErrorMessage(error));
    }
}

/**
 * Protège contre les injections XSS en échappant le HTML
 * @param {string} text - Texte à échapper
 * @returns {string} - Texte sécurisé
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Recharge la liste des utilisateurs
 */
function refreshUsers() {
    loadUsers();
}

/**
 * Filtre les utilisateurs par rôle (pour plus tard)
 * @param {string} role - Rôle à filtrer
 */
function filterUsersByRole(role) {
    // À implémenter plus tard
    console.log(`Filtrage par rôle: ${role}`);
}

/**
 * Trie les utilisateurs par nom (pour plus tard)
 * @param {string} order - Ordre de tri ('asc' ou 'desc')
 */
function sortUsersByName(order = 'asc') {
    // À implémenter plus tard
    console.log(`Tri par nom: ${order}`);
}

// Rendre ces fonctions disponibles globalement
window.HomePage = {
    loadUsers,
    refreshUsers,
    filterUsersByRole,
    sortUsersByName,
    viewUser,
    editUser,
    updateUser,
    deleteUser
};
