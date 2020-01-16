POUR LANCER L'APPLICATION 
cd td3/lecellier
node index.js

Réussite de la premire partie : Mise en place d’un ChatBot
En lançant le navigateur sur l’adresse de l'API : http://localhost:3000, une page contenant un chat vous propose à répondre aux questions suivantes:
- Quel est votre nom ?
- Quel est votre prénom ?
- Quel est votre numero SSN ?
Après la saisie de informations sur le numero de sécurité sociale, l'API devra :
- Verifier la validité de son format, extraire et afficher les informations que le 
numéro SSN comporte!

Numéro d'exemple: 
SSN : 180079938020602  | 298069152102373  | 173119206201448 | 173119300705974

Après avoir récupérer toutes ses informations, l'application propose de les sauvegarder dans la base de données MongoDB! --> ne fonctionne plus

Docker fonctionnel
Commande pour créer et activer
cd /c/Users/laeti/Documents/Master\ M1\ MIAGE/Technolog/Socket_Io/td3/lecellier/
docker-compose.exe up
docker-compose.exe down
docker-compose.exe rm -f 
docker rmi lecellier_nodejs 

Sur Internet, taper :
http://localhost:3000/ --> pour l'appli 
http://localhost:8081  --> pour mongoDB soit http://localhost:8081/db/test/people
ou alors sur la base test puis la collection people


Ajout sur le github :
git init
git add *
git commit -m "comm"
git remote add origin git@github.com:LaetitiaFF/Socket_Io.git
git push -u origin master