import React, {useEffect, useState} from 'react'
import { GiTrophyCup } from 'react-icons/gi'
import Modal from '../Modal'

const QuizOver = React.forwardRef(({levelName,score,maxQuestion, quizLevel ,precent, loadlevelQuestion}, ref) => {
   
    const [asked, setAsked] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setAsked(ref.current)
    }, [ref])

    const showModal = id =>{
        setOpen(true)
    }

    const hideModal = () => {
        setOpen(false)
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
                <div className="modalHeader">
                    <h2>titre</h2>
                </div>
                <div className="modalBody">
                    <h3>titre 3</h3>
                </div>
                <div className="modalFooter">
                    <button className="modalBtn" onClick={() => setOpen(false)}>Fermer</button>
                </div>
            </Modal>
       </>
    )
})



export default QuizOver
