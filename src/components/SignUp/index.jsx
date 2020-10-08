import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'


const SignUp = (props) => {
    
    const firebase = useContext(FirebaseContext)
    
    
    const data = {
        pseudo : '',
        email : '',
        password : '',
        confirmPassword : ''
    }

    const [userData, setUserData] = useState(data);
    const [error, setError] = useState('')

    const {pseudo, email, password, confirmPassword} = userData;

    const handleChange = e =>{
        setUserData({...userData, [e.target.id]: e.target.value})
    }

    const handleSubmit = e =>{
        e.preventDefault()
        const { email, password, pseudo} = userData;
        firebase.signupUser(email, password)
        .then(authUser => {
            console.log(authUser)
            return firebase.user(authUser.user.uid).set({
                pseudo,
                email
            })
        })        
        .then(() =>{
            setUserData({...data})
            props.history.push('/welcome')
        })
        .catch(error => {
            setError(error)
            setUserData({...data})
        })
    }
     //gestion erreur

        const errorMsg = error !== '' && <span>{error.message}</span>
    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {errorMsg}
                         <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input type="text" value={pseudo} required autoComplete="off" id="pseudo" onChange={handleChange}/>
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>

                            <div className="inputBox">
                                <input type="text" value={email} required autoComplete="off" id="email" onChange={handleChange}/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input type="password" value={password} required autoComplete="off" id="password" onChange={handleChange}/>
                                <label htmlFor="password">Mot de Passe</label>
                            </div>

                            <div className="inputBox">
                                <input type="password" value={confirmPassword} required autoComplete="off" id="confirmPassword" onChange={handleChange}/>
                                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            </div>
                            <button type="submit">S'inscrire</button>
                        </form>
                        <div className="linkContainer">
                            <Link  className="simpleLink"to="/login">Déja inscrit? Connectez vous !</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
