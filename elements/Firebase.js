// firebaseDb.js

import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: ' AIzaSyDNKMFfGnHZ9jANyVN0QJyD93lb35Q7Awo',
    authDomain: 'gotnxt.firebaseapp.com ',
  	databaseURL: "https://gotnxt.firebaseio.com",
  	projectId: "gotnxt",
  	storageBucket: "gotnxt.appspot.com",

};

firebase.initializeApp(firebaseConfig);

export default firebase;

// messagingSenderId: (harder to find, but in my case, I just downloaded the JSON config fieldworker for my android app. I assume it works the same for iOS's .plist, thats where I found this ID)


