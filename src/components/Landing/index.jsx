import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    const [btn, setBtn] = useState(false)

    const refWolverine = useRef(null)

    useEffect(() => {
        refWolverine.current.classList.add("startingImg")
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg")
            setBtn(true)
        },1000)
    }, []);

    const setLeftImg = () => {
        refWolverine.current.classList.add("leftImg")
    }

    const deleteLeftImg = () => {
        refWolverine.current.classList.remove("leftImg")
    }
    const setRightImg = () => {
        refWolverine.current.classList.add("rightImg")
    }

    const deleteRightImg = () => {
        refWolverine.current.classList.remove("rightImg")
    }

    const displayBtn = btn && (
       <>
        <div onMouseOver={setLeftImg}
            onMouseOut={deleteLeftImg}
         className="leftBox">
            <Link to="/signUp" className="btn-welcome">Insciption</Link>
        </div>
        <div className="rightBox"
        onMouseOver={setRightImg}
        onMouseOut={deleteRightImg}
        >
            <Link to="/login" className="btn-welcome">Connexion</Link>
        </div>
       </>
    )

    return (
        <main ref={refWolverine} className="welcomePage">
           {displayBtn}
        </main>
    )
}

export default Landing
