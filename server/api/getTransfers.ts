import { defineEventHandler } from 'h3';

// Simule une base de données en mémoire
let transfers = [];  // Stocke les virements en mémoire

export default defineEventHandler(async () => {
    try {
        // Retourner la liste des virements stockés en mémoire
        return transfers;
    } catch (error) {
        // En cas d'erreur (bien qu'il n'y ait pas vraiment de possibilité d'erreur ici), retourner une liste vide
        return [];
    }
});
