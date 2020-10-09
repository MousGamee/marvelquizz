import React, { useEffect, useState } from 'react'
import Stepper from 'react-stepper-horizontal'

const Levels = ({levelName, quizLevel}) => {

    const [level, setLevel] = useState([]);

    useEffect(() => {
        const quizSteps = levelName.map(level => (
            {title: level}
        ))  
        setLevel(quizSteps)
    }, [levelName]);
 

    return (
        <div className="levelsContainer" style={{ background : 'transparent'}}>
                <Stepper 
                steps={ level }
                activeStep={ quizLevel } 
                circleTop={24}
                activeColor={'#d31017'}
                activeTitleColor={'#d31017'}
                completeTitleColor={'#E0E0E0'}
                defaultTitleColor={'#E0E0E0'}
                completeColor={'#E0E0E0'}
                compleBarColor={'#E0E0E0'}
                />
        </div>
    )
}

export default React.memo(Levels)
