import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDKZTTVcrlMu0e5hf0QBhNNwmx4x4WQyKI',
  authDomain: 'birthday-8aca0.firebaseapp.com',
  projectId: 'birthday-8aca0',
  storageBucket: 'birthday-8aca0.appspot.com',
  messagingSenderId: '575348274253',
  appId: '1:575348274253:web:f13e52e7348ec24d465804',
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
