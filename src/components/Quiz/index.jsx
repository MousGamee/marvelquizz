import React, { Component } from 'react';
import Levels from '../Levels'
import ProgressBar from '../ProgressBar';
import QuizOver from '../QuizOver'
import {QuizMarvel} from '../QuizMarvel'
import {  toast } from 'react-toastify';
import { FaChevronRight } from 'react-icons/fa'
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

class Quiz extends Component {
constructor(props) {
    super(props)

    this.initialeState = {
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
        showWelcomMsg : false,
        quizEnd : false
   }

    this.state = this.initialeState
    this.storeDataRef =  React.createRef()
}

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
            if((this.state.storeQuestion !== prevState.storeQuestion) && this.state.storeQuestion.length){
                this.setState({
                    question : this.state.storeQuestion[this.state.idQuestion].question ,
                    options : this.state.storeQuestion[this.state.idQuestion].options
                })
                console.log(this.state.options)
            }

            if((this.state.idQuestion !== prevState.idQuestion) && this.state.storeQuestion.length){
                this.setState({
                    question : this.state.storeQuestion[this.state.idQuestion].question ,
                    options : this.state.storeQuestion[this.state.idQuestion].options,
                    userAnswer : null,
                    disablad : true
                })
            }

            if(this.state.quizEnd !== prevState.quizEnd){
                const gradepercent = this.getPercent(this.state.maxQuestion, this.state.score)
                this.gameOver(gradepercent)
            }

            if(this.props.userData.pseudo !== prevProps.userData.pseudo){
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
               // this.gameOver()
               this.setState({
                   quizEnd : true
                })
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

        getPercent = (maxQuestion, ourScore) => (ourScore / maxQuestion) * 100

        gameOver = percent => {
         
            if(percent >=50 ){
                this.setState({
                    quizLevel : this.state.quizLevel + 1,
                    percent 
                }) 
            } else {
                this.setState({ percent }) 
            }
        }

        loadlevelQuestion = param =>{
            this.setState({...this.initialeState, quizLevel : param})
            this.loadQuestion(this.state.levelName[param])
        }

    render() {
         const displyaOption = this.state.options.map((option, index) => {

           return <p 
           key={index} 
           onClick={() => this.submitAnswer(option)}
           className={`answerOptions ${this.state.userAnswer === option ? 'selected' : null}`}
           >
              <FaChevronRight /> {option}
            </p>
            
        })

       return this.state.quizEnd ? (
            <QuizOver 
                ref={this.storeDataRef}
                levelName={this.state.levelName}
                score={this.state.score}
                maxQuestion={this.state.maxQuestion}
                quizLevel={this.state.quizLevel}
                precent={this.state.percent} 
                loadlevelQuestion={this.loadlevelQuestion}               
            />
        )
        :
        (
            <>
                <Levels 
                    levelName={this.state.levelName}
                    quizLevel={this.state.quizLevel}
                />

                <ProgressBar 
                idQuestion={this.state.idQuestion}
                maxQuestion={this.state.maxQuestion} 
                />
                <h2> {this.state.question}</h2>
                    {displyaOption} 
                <button 
                disabled={this.state.disablad} 
                onClick={this.nextQuestion}
                className="btnSubmit"
                >

                {this.state.idQuestion < this.state.maxQuestion - 1 ? 'Suivant' : 'Terminer'}

                </button>
            </>
        )
    }
}

export default Quiz;
