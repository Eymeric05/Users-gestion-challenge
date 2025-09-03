const fs = require('fs');
const path = require('path');

// Chemin vers le fichier des utilisateurs
const USERS_FILE_PATH = path.join(__dirname, '..', 'data', 'users.json');

/**
 * Lit le fichier des utilisateurs
 * @returns {Array} Liste des utilisateurs
 */
function readUsersFile() {
    try {
        // Vérifier si le fichier existe
        if (!fs.existsSync(USERS_FILE_PATH)) {
            console.log('Fichier users.json non trouvé, création d\'un fichier vide');
            // Créer le dossier data s'il n'existe pas
            const dataDir = path.dirname(USERS_FILE_PATH);
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }
            // Créer un fichier avec des utilisateurs par défaut
            const defaultUsers = [
                { id: 1, nom: "Jean Dupont", email: "jean.dupont@email.com", role: "admin" },
                { id: 2, nom: "Marie Martin", email: "marie.martin@email.com", role: "modérateur" },
                { id: 3, nom: "Pierre Durand", email: "pierre.durand@email.com", role: "utilisateur" },
                { id: 4, nom: "Sophie Bernard", email: "sophie.bernard@email.com", role: "utilisateur" },
                { id: 5, nom: "Lucas Petit", email: "lucas.petit@email.com", role: "utilisateur" },
                { id: 6, nom: "Emma Roux", email: "emma.roux@email.com", role: "utilisateur" },
                { id: 7, nom: "Thomas Moreau", email: "thomas.moreau@email.com", role: "utilisateur" },
                { id: 8, nom: "Julie Simon", email: "julie.simon@email.com", role: "utilisateur" },
                { id: 9, nom: "Nicolas Michel", email: "nicolas.michel@email.com", role: "utilisateur" },
                { id: 10, nom: "Camille Garcia", email: "camille.garcia@email.com", role: "utilisateur" }
            ];
            writeUsersFile(defaultUsers);
            return defaultUsers;
        }
        
        // Lire et parser le fichier
        const fileContent = fs.readFileSync(USERS_FILE_PATH, 'utf8');
        const users = JSON.parse(fileContent);
        
        // Vérifier que c'est bien un tableau
        if (!Array.isArray(users)) {
            console.error('Le fichier users.json ne contient pas un tableau valide');
            return [];
        }
        
        return users;
        
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier users.json:', error);
        return [];
    }
}

/**
 * Écrit dans le fichier des utilisateurs
 * @param {Array} users - Liste des utilisateurs à sauvegarder
 */
function writeUsersFile(users) {
    try {
        // Vérifier que c'est bien un tableau
        if (!Array.isArray(users)) {
            throw new Error('Les données doivent être un tableau');
        }
        
        // Créer le dossier data s'il n'existe pas
        const dataDir = path.dirname(USERS_FILE_PATH);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        
        // Écrire le fichier avec une indentation lisible
        fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2), 'utf8');
        
    } catch (error) {
        console.error('Erreur lors de l\'écriture du fichier users.json:', error);
        throw new Error('Impossible de sauvegarder les utilisateurs');
    }
}

/**
 * Génère un nouvel ID unique
 * @param {Array} users - Liste des utilisateurs existants
 * @returns {number} Nouvel ID
 */
function generateNewId(users) {
    if (!users || users.length === 0) {
        return 1;
    }
    
    // Trouver l'ID le plus élevé et ajouter 1
    const maxId = Math.max(...users.map(user => user.id));
    return maxId + 1;
}

module.exports = {
    readUsersFile,
    writeUsersFile,
    generateNewId
};
