const { readUsersFile, writeUsersFile, generateNewId } = require('../utils/fileUtils');

/**
 * Récupère tous les utilisateurs
 * @returns {Array} Liste des utilisateurs
 */
function getAllUsers() {
    try {
        return readUsersFile();
    } catch (error) {
        console.error('Erreur lors de la lecture des utilisateurs:', error);
        return [];
    }
}

/**
 * Récupère un utilisateur par son ID
 * @param {number} id - ID de l'utilisateur
 * @returns {Object|null} Utilisateur trouvé ou null
 */
function getUserById(id) {
    try {
        const users = readUsersFile();
        return users.find(user => user.id === id) || null;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        return null;
    }
}

/**
 * Crée un nouvel utilisateur
 * @param {Object} userData - Données de l'utilisateur (nom, email)
 * @returns {Object} Nouvel utilisateur créé
 */
function createUser(userData) {
    try {
        const users = readUsersFile();
        
        // Créer le nouvel utilisateur
        const newUser = {
            id: generateNewId(users),
            nom: userData.nom,
            email: userData.email,
            role: 'utilisateur' // Rôle par défaut
        };
        
        // Ajouter à la liste et sauvegarder
        users.push(newUser);
        writeUsersFile(users);
        
        console.log(`Nouvel utilisateur créé: ${newUser.nom} (${newUser.email})`);
        return newUser;
        
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        throw new Error('Impossible de créer l\'utilisateur');
    }
}

/**
 * Met à jour un utilisateur existant
 * @param {number} id - ID de l'utilisateur à modifier
 * @param {Object} updateData - Nouvelles données (nom, email)
 * @returns {Object} Utilisateur modifié
 */
function updateUser(id, updateData) {
    try {
        const users = readUsersFile();
        const userIndex = users.findIndex(user => user.id === id);
        
        if (userIndex === -1) {
            throw new Error('Utilisateur non trouvé');
        }
        
        // Mettre à jour les données
        users[userIndex] = {
            ...users[userIndex],
            nom: updateData.nom,
            email: updateData.email
        };
        
        // Sauvegarder les modifications
        writeUsersFile(users);
        
        console.log(`Utilisateur modifié: ${users[userIndex].nom} (${users[userIndex].email})`);
        return users[userIndex];
        
    } catch (error) {
        console.error('Erreur lors de la modification de l\'utilisateur:', error);
        throw new Error('Impossible de modifier l\'utilisateur');
    }
}

/**
 * Supprime un utilisateur
 * @param {number} id - ID de l'utilisateur à supprimer
 * @returns {boolean} True si supprimé, false sinon
 */
function deleteUser(id) {
    try {
        const users = readUsersFile();
        const userIndex = users.findIndex(user => user.id === id);
        
        if (userIndex === -1) {
            console.log(`Tentative de suppression d'un utilisateur inexistant: ${id}`);
            return false;
        }
        
        // Récupérer le nom avant suppression pour le log
        const userName = users[userIndex].nom;
        
        // Supprimer l'utilisateur
        users.splice(userIndex, 1);
        writeUsersFile(users);
        
        console.log(`Utilisateur supprimé: ${userName} (ID: ${id})`);
        return true;
        
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        return false;
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
