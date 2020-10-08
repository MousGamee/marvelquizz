import React, { Component } from 'react';
import Levels from '../Levels'
import ProgressBar from '../ProgressBar';
import {QuizMarvel} from '../QuizMarvel'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

class Quiz extends Component {


    state = {
         levelName : ['debutant', 'confirme', 'expert'],
         quizLevel : 0,
         maxQuestion : 10,
         storeQuestion : [],
         question : null,
         options : [],
         idQuestion : 0,
         disablad : true,
         userAnswer : null,
         score : 0,
         showWelcomMsg : false
    }

   storeDataRef =  React.createRef()


    loadQuestion = quizz => {
        const fetchedArray = QuizMarvel[0].quizz[quizz];
        if(fetchedArray.length >= this.state.maxQuestion){

            this.storeDataRef.current = fetchedArray;
            
            const newArray = fetchedArray.map( ({answer, ...keepRest}) => keepRest)
            this.setState({ storeQuestion : newArray })

        } else console.log('pas assez de question')
    }


    showWelcomMsg = pseudo => {
        if(!this.state.showWelcomMsg){
            this.setState({showWelcomMsg : true})
        
        toast.warn(`🦄 Bienvenu ${pseudo}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
    }

        componentDidMount() {
            this.loadQuestion(this.state.levelName[this.state.quizLevel])
        }

        componentDidUpdate(prevProps, prevState) {
            if(this.state.storeQuestion !== prevState.storeQuestion){
                this.setState({
                    question : this.state.storeQuestion[this.state.idQuestion].question ,
                    options : this.state.storeQuestion[this.state.idQuestion].options
                })
                console.log(this.state.options)
            }

            if(this.state.idQuestion !== prevState.idQuestion){
                this.setState({
                    question : this.state.storeQuestion[this.state.idQuestion].question ,
                    options : this.state.storeQuestion[this.state.idQuestion].options,
                    userAnswer : null,
                    disablad : true
                })
            }

            if(this.props.userData.pseudo){
                this.showWelcomMsg(this.props.userData.pseudo)
            }
        }

        submitAnswer = selectdAnswer => {
            this.setState({
                 userAnswer : selectdAnswer,
                 disablad : false
                })
        }

        nextQuestion = () => {
            if (this.state.idQuestion ===  this.state.maxQuestion -1) {
                //end
            } else this.setState(prevState => ({
                idQuestion : prevState.idQuestion +1
            }))

           const goodAnswer=  this.storeDataRef.current[this.state.idQuestion].answer
           if(this.state.userAnswer === goodAnswer){
                this.setState(prevState => ({
                    score : prevState.score +1
                }))

                toast.success('Good Job!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    bodyClassName : "toastify-color",
                    });
           } else {
            toast.error('Bad Answer !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
           }
        }
    render() {
         const displyaOption = this.state.options.map((option, index) => {

           return <p 
           key={index} 
           onClick={() => this.submitAnswer(option)}
           className={`answerOptions ${this.state.userAnswer === option ? 'selected' : null}`}
           >
               {option}
            </p>
            
        })
        return (
            <div>
                <Levels />
                <ProgressBar curentQuestion={this.state.idQuestion} />
                <h2> {this.state.question}</h2>
                    {displyaOption} 
                <button 
                disabled={this.state.disablad} 
                onClick={this.nextQuestion}
                className="btnSubmit"
                >Suivant</button>
            </div>
        );
    }
}

export default Quiz;
