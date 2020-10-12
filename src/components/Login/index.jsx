import React from 'react'
import { useState, useContext } from 'react'
import { FirebaseContext } from '../Firebase'
import { Link } from 'react-router-dom'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const firebase = useContext(FirebaseContext)
    
    const handleSubmit = e => {
        e.preventDefault();
        firebase.loginUser(email, password)
        .then(user => {
            setPassword('')
            setEmail('')
            props.history.push('/welcome')
        })
        .catch(error => {
            setError(error)
            setPassword('')
            setEmail('')
        })
    }

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
            <div className="formBoxLeftLogin">
            </div>

            <div className="formBoxRight">
                    <div className="formContent">
                       {error !== '' && <span>{error.message}</span>}
                         <h2>Connexion</h2>
                        <form onSubmit={handleSubmit} >
                            <div className="inputBox">
                                <input type="text" value={email} required autoComplete="off" id="email" onChange={(e => setEmail(e.target.value))}/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input type="password" value={password} required autoComplete="off" id="password" onChange={(e => setPassword(e.target.value))}/>
                                <label htmlFor="password">Mot de Passe</label>
                            </div>

                            <button type="submit">Connexion</button>
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink"to="/signup">Nouveau sur marvel quiz? incrivez vous maintenant !</Link>
                            <br/>
                            <br/>
                            <Link className="simpleLink"to="/forgetpassword"><em>Mot de passe oublié ?</em></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
