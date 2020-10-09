import React, {Fragment} from 'react'

const ProgressBar = ({maxQuestion, idQuestion}) => {

    const getWidth = (totalQuestion, questionId) => {
        return (100/ totalQuestion) * questionId
    }
    const actualQuestion = idQuestion + 1;
    const progress = getWidth(maxQuestion, actualQuestion)
       
    return (
        <Fragment>
        <div className="percentage">
            <div className="progressPercent">Question {idQuestion +1}/{maxQuestion}</div>
            <div className="progressPercent">Progression : {progress}%</div>
        </div>
        <div className="progressBar">
            <div className="progressBarChange"style={{
                width : `${progress}%`,
            }}> </div>
        </div>
        </Fragment>
    )
}

export default React.memo(ProgressBar)
