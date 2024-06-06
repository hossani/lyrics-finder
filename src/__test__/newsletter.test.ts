import request from 'supertest';
import app from '../app'; // Assurez-vous d'importer votre application express ici
import User from '../models/userModels';
import { generateToken } from "../helpers/jwt";

describe('end1', () => {
  it('devrait retourner une réponse 200 OK et désabonner l\'utilisateur', async () => {
    // Créez un utilisateur fictif avec newsletter true
    const id='666194c0f8d1d001a689581c';
    const user:any = await User.findById(id);

    // Générer un token JWT valide pour l'utilisateur
    const token = generateToken(user);

    // Envoyer une demande avec le token JWT dans l'en-tête Authorization
    const response = await request(app)
      .post('/newsletter/unsubscribe')
      .set('Authorization', `Bearer ${token}`);
console.log(response.body.message);
    // Vérifier si la réponse est 200 OK
    expect(response.status).toBe(200);
    // Vérifier si l'utilisateur est désabonné de la newsletter
    expect(response.body.message).toBe('Unsubscribed from newsletter');
  });

});

describe('end2', () => {
   
    it('devrait retourner une réponse 200 OK et abonner l\'utilisateur', async () => {
      // Chercher un utilisatuer dans la BD
      const id='666194c0f8d1d001a689581c';
      const user:any = await User.findById(id);
  
      // Générer un token JWT valide pour l'utilisateur
      const token = generateToken(user);
  
      // Envoyer une demande avec le token JWT dans l'en-tête Authorization
      const response = await request(app)
        .post('/newsletter/subscribe')
        .set('Authorization', `Bearer ${token}`);
  console.log(response.body.message);
      // Vérifier si la réponse est 200 OK
      expect(response.status).toBe(200);
      // Vérifier si l'utilisateur est désabonné de la newsletter
      expect(response.body.message).toBe('Subscribed to newsletter');
    });
  });