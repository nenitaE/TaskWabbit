import { useHistory } from "react-router-dom";

function MainFormPage(){
    let history = useHistory();

    const handleContinueClick = () => {
        //Validate form

        //if form is valid, navigate to the taskers page
        history.push('/taskers')
    };

    return (
        <button onClick={handleContinueClick}>Continue</button>
    )

}

export default MainFormPage
