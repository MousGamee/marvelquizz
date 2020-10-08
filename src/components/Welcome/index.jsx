import React, {useState, useContext, useEffect} from 'react'
import LogOut from '../LogOut'
import Quiz from '../Quiz'
import { FirebaseContext } from '../Firebase'

const Welcome = props => {

    const [userSession, setUserSession] = useState(null)
    const [userData, setUserData] = useState({})

    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')
        })
        if (userSession !== null){
            firebase.user(userSession.uid)
            .get()
            .then(doc => {
                if(doc && doc.exists){
                  const myData =  doc.data()
                  setUserData(myData)
                }
            })
            .catch(error => {
                console.log(error)
            })
        }

        return () => {
            listener()
        }

    }, [userSession])

    return userSession === null ? (
        <>
            <div className="loader"></div>
            <p className="loaderText">Loading ...</p>
        </>
    ) : (
        <div className="quiz-bg">
        <div className="container">
            <LogOut />
            <Quiz userData={userData}/>
        </div>
    </div>
    )

     
        
    
}

export default Welcome
