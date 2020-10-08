import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'


const ForgetPassword = props => {

    const firebase = useContext(FirebaseContext)
    const [email, setEmail] = useState('');
    const [succes, setSucces] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = e => {
        e.preventDefault()
        firebase.passwordReset(email)
        .then(() => {
            setError(null)
            setSucces(`Un message a été envoyé a ${email} consultez pour changer le mot de passe`)
            setEmail('')
            setTimeout(() =>{
                props.history.push('/login')
            },4000)
        })
        .catch(error => {
            setError(error)
            setEmail('')
        })
    }

    const disabled = email === "" ? true : false
    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
            <div className="formBoxLeftForget">
            </div>

            <div className="formBoxRight">
                    <div className="formContent">

                         { succes && <span 
                         style={{
                             border : "1px solid green",
                             background : "green",
                             color : "#ffffff"
                         }}>
                             {succes}
                             </span>}
                         {
                             error && <span>{error.message}</span>
                         }
                         <h2>Mot de pass oublié ?</h2>
                        <form onSubmit={handleSubmit} >
                            <div className="inputBox">
                                <input type="email" value={email} required autoComplete="off" id="email" onChange={(e => setEmail(e.target.value))}/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <button type="submit" disabled={disabled}>Recuperer</button>
                            
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink"to="/login">Déja inscrit? Connectez vous !</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
