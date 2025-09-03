const express = require('express');
const path = require('path');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('./controllers/userController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON et les formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes pour les pages HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/formulaire', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'formulaire.html'));
});

app.get('/user/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user-detail.html'));
});

// API Routes - pour récupérer et manipuler les données
app.get('/api/users', (req, res) => {
    try {
        const users = getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

app.get('/api/users/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = getUserById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        
        res.json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

app.post('/api/users', (req, res) => {
    try {
        const { nom, email } = req.body;
        
        // Vérifier que les champs obligatoires sont remplis
        if (!nom || !email) {
            return res.status(400).json({ 
                message: 'Le nom et l\'email sont requis' 
            });
        }
        
        // Vérifier que l'email a un format valide
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: 'Format d\'email invalide' 
            });
        }
        
        // Vérifier que l'email n'existe pas déjà
        const users = getAllUsers();
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(409).json({ 
                message: 'Un utilisateur avec cet email existe déjà' 
            });
        }
        
        const newUser = createUser({ nom, email });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

app.put('/api/users/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { nom, email } = req.body;
        
        // Vérifier que les champs obligatoires sont remplis
        if (!nom || !email) {
            return res.status(400).json({ 
                message: 'Le nom et l\'email sont requis' 
            });
        }
        
        // Vérifier que l'email a un format valide
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: 'Format d\'email invalide' 
            });
        }
        
        // Vérifier que l'utilisateur existe
        const existingUser = getUserById(userId);
        if (!existingUser) {
            return res.status(404).json({ 
                message: 'Utilisateur non trouvé' 
            });
        }
        
        // Vérifier que l'email n'est pas déjà utilisé par un autre utilisateur
        const users = getAllUsers();
        const emailExists = users.find(user => 
            user.email === email && user.id !== userId
        );
        if (emailExists) {
            return res.status(409).json({ 
                message: 'Un autre utilisateur utilise déjà cet email' 
            });
        }
        
        const updatedUser = updateUser(userId, { nom, email });
        res.json(updatedUser);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

app.delete('/api/users/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        
        // Vérifier que l'utilisateur existe
        const existingUser = getUserById(userId);
        if (!existingUser) {
            return res.status(404).json({ 
                message: 'Utilisateur non trouvé' 
            });
        }
        
        const deleted = deleteUser(userId);
        if (deleted) {
            res.json({ message: 'Utilisateur supprimé avec succès' });
        } else {
            res.status(500).json({ message: 'Erreur lors de la suppression' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

// Page 404 pour les routes qui n'existent pas
app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'not-found.html'));
});

// Gestion globale des erreurs
app.use((error, req, res, next) => {
    console.error('Erreur non gérée:', error);
    res.status(500).json({ 
        message: 'Erreur interne du serveur',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur interne'
    });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`📱 Application accessible sur: http://localhost:${PORT}`);
    console.log(`🏠 Page d'accueil: http://localhost:${PORT}/`);
    console.log(`📝 Formulaire: http://localhost:${PORT}/formulaire`);
    console.log(`\n✨ Fonctionnalités disponibles:`);
    console.log(`   • Affichage de la liste des utilisateurs`);
    console.log(`   • Ajout d'un nouvel utilisateur`);
    console.log(`   • Modification d'un utilisateur existant`);
    console.log(`   • Suppression d'un utilisateur`);
    console.log(`   • Navigation entre les pages`);
    console.log(`   • Gestion des erreurs 404`);
    console.log(`\n💾 Données persistantes dans: ./data/users.json`);
});
