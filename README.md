# Instalando Firebase Emulator  

npm i firebase

npm install -g firebase-tools

firebase projects:list

firebase init
firebase init emulators


# Subindo o servidor Firebase Emulator  
firebase emulators:start

firebase serve

# É possível associar mais de um Firebase project ao diretório

firebase use --add


# Publicando para o Firebase server

firebase deploy

firebase deploy --only functions


firestore.rules

firestore indexes


# Firebase functions

é lenta na primeira chamada

pode criar uma que redireciona para outro site

functions são disparadas por algum evento, por exemplo, evento de authentication, access database, 

é possível criar callable functions que podem ser chamadas diretamente pelo client.