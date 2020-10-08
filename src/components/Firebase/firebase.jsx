import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


const config = {
    apiKey: "AIzaSyBFWOxsfMHnuIYnNo58aeKi9_-TG9DKMGw",
    authDomain: "test-6f2d0.firebaseapp.com",
    databaseURL: "https://test-6f2d0.firebaseio.com",
    projectId: "test-6f2d0",
    storageBucket: "test-6f2d0.appspot.com",
    messagingSenderId: "276872746903",
    appId: "1:276872746903:web:dd1040598988d7856396d2"
}

class Firebase{
    constructor(){
        app.initializeApp(config)
        this.auth = app.auth()
        this.db = app.firestore()
    }
    // inscription
    signupUser = (email, password) => (
        this.auth.createUserWithEmailAndPassword(email, password)
    )

    //connexion
    loginUser = (email, password) => (
        this.auth.signInWithEmailAndPassword(email, password)
    )

    //deconnexion
    logOut = () => this.auth.signOut()

    //recuperation de mot de passe
    passwordReset = email => this.auth.sendPasswordResetEmail(email)
    
    user = uid => this.db.doc(`users/${uid}`)

    
}

export default Firebase