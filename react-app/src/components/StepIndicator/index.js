import "./StepIndicator.css"

function StepIndicator({currentStep, onStepClick}){
    return (
        <div className="step-indicator">
            {[1,2,3,4].map((step) => (
                <div key={step} className={`step${currentStep === step ? ' active' : ''}`}
                onClick={() => onStepClick(step)}

                >
                    {step}
                </div>
            ))}
        </div>
    )

}

export default StepIndicator
