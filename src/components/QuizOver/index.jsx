import React, {useEffect, useState} from 'react'
import { GiTrophyCup } from 'react-icons/gi'
import axios from 'axios'
import Modal from '../Modal'

const QuizOver = React.forwardRef(({levelName,score,maxQuestion, quizLevel ,precent, loadlevelQuestion}, ref) => {
   
    const [asked, setAsked] = useState([])
    const [open, setOpen] = useState(false)
    const [characterData, setCharacterData] = useState([])
    const [isloading, setIsloading] = useState(true)

    const API_PUBLIC = process.env.REACT_APP_MARVEL_KEY_API;
    
    const hash = '19864724975fde7186c7028558d3d4e3'

    
    useEffect(() => {
        setAsked(ref.current)
        if(localStorage.getItem('marvelStorageDate')){
            const date = localStorage.getItem('marvelStorageDate')
            checkDataAge(date)
        }
    }, [ref])

    const checkDataAge = date => {
        const today = Date.now()
        const timeDiff = today - date
        const daysDiff = timeDiff / (1000 * 3600 * 24)

        if (daysDiff >= 15){
            localStorage.clear()
            localStorage.setItem('marvelStorageDate', Date.now())
        }
    }

    const showModal = id =>{
        setOpen(true)

        if(localStorage.getItem(id)){
            setCharacterData(JSON.parse(localStorage.getItem(id)))
            setIsloading(false)
        } else{
            axios.get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC}&hash=${hash}`)
            .then(res => {
                setCharacterData(res.data)
                setIsloading(false)
                localStorage.setItem(id, JSON.stringify(res.data))
                if(!localStorage.getItem('marvelStorageDate')){
                 localStorage.setItem('marvelStorageDate', Date.now())
                }
            })
            .catch(error => {
                console.log(error)
            })
        }
        
    }

    const hideModal = () => {
        setOpen(false)
        setIsloading(true)
    }

    const averageGrade = maxQuestion/2

    if(score < averageGrade){
        setTimeout(()=> {
            loadlevelQuestion(quizLevel)
        },3000)
    }


    const decision = score >= averageGrade ? (
        <>
        <div className="stepsBtnContainer">
       { 

       quizLevel < levelName.length ? (
        <>
        <p className="successMsg">Bravo, passez au niveau suivant</p>
        <button 
            className="btnResult success"
            onClick={() => loadlevelQuestion(quizLevel)}            
            > Niveau suivant !</button>  
        </>
       ):
       (
        <>
        <p className="successMsg"><GiTrophyCup size='50px'/> Bravo, vous etes un expert</p>
        <button 
            className="btnResult gameOver"
            onClick={() => loadlevelQuestion(0)} 
            > Retour a l'acceuil</button>  
        </>
       )

       }
       </div>
       <div className="percentage">
        <div className="progressPercent">Reussite : {precent}%</div>
        <div className="progressPercent">Note : {score}/{maxQuestion}</div>
        </div>
        </>
    ) : (
            <>
                <div className="stepsBtnContainer">
                  <p className="failureMsg">Dommage... vous avez echoué</p>  
                
                </div>
                <div className="percentage">
                    <div className="progressPercent">Reussite : {precent}%</div>
                    <div className="progressPercent">Note : {score}/{maxQuestion}</div>
                </div>
            </>
    )
    const questionAnswer = score >= averageGrade ? (
           asked.map(question => (
        <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
            <td>
                <button 
                    className="btnInfo"
                    onClick={() => showModal(question.heroId) }
                    >infos</button>
            </td>
        </tr>
    ))
        ) : (
            <tr >
                <td colSpan="3">
                    <div className="loader"></div>
                    <p style={{textAlign : 'center, color : "red'}}>Pas de reponses !</p>
                </td>  
            </tr>
        )

    const resultInModal = !isloading ? (
        <>
        <div className="modalHeader">
            <h2>{characterData.data.results[0].name}</h2>
        </div>
        <div className="modalBody">
            <div className="comicImage">
            <img 
                src={characterData.data.results[0].thumbnail.path+'.'+characterData.data.results[0].thumbnail.extension} 
                alt={characterData.data.results[0].name}
            />
            <p>{characterData.attributionText}</p>
            </div>

            <div className="comicDetails">
               <h3>Description</h3>
               {
                   characterData.data.results[0].description ?
                   <p>{characterData.data.results[0].description}</p>
                    : <p> Description non disponible </p>
               }
               <h3> Plus d'infos</h3>
               {
                   characterData.data.results[0].urls && 
                   characterData.data.results[0].urls.map((url, index) => (
                       <a 
                       key={index}
                       href={url.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       >
                        {url.type}
                    </a>
                   ))
               }
            </div>
        </div>
        <div className="modalFooter">
            <button className="modalBtn" onClick={() => setOpen(false)}>Fermer</button>
        </div>
   </>
    ) :
    (
    <>
        <div className="modalHeader">
            <h2>En attente</h2>
        </div>
        <div className="modalBody">
            <div className="loader"></div>
                <p className="loaderText">Loading ...</p>
            </div>
       </>
    )

    return (
        <>
            {decision}
            <hr />
            <p>Les reponses aux questions</p>
            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Reponses</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                       {questionAnswer}
                    </tbody>
                </table>
            </div>
            <Modal 
            showModal={open}
            hideModal={hideModal}
            >
                {resultInModal}
            </Modal>
       </>
    )
})



export default QuizOver
