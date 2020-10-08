import React ,{useState, useEffect, useContext} from 'react'
import { FirebaseContext } from '../Firebase'

const LogOut = () => {
    const firebase = useContext(FirebaseContext)
    const [cheked, setCheked] = useState(false)

    useEffect(() => {
        if(cheked){
            firebase.logOut()
        } 
    }, [cheked])

    return (
        <div className="logoutContainer">
          <label className="switch">
                <input 
                    type="checkbox"
                    checked={cheked}
                    onChange={() => setCheked(!cheked)}
                    />
                    <span className="slider round"></span>
            </label>
        </div>
    )
}

export default LogOut
