import "./StepIndicator.css"
import React from "react"

function StepIndicator({currentStep, onStepClick}) {
    return (
        <div className="step-indicator">
            {[1,2,3,4].map((step, index) => (
                <React.Fragment key={step}>
                    {index > 0 && <div className={`step-line ${currentStep >= step ? 'active' : ''}`}/>}
                    <div
                        className={`step${currentStep >= step ? ' active' : ''}`}
                        onClick={() => onStepClick(step)}
                    >
                        {step}
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}

export default StepIndicator
