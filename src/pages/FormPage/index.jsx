import {Button, Container, Step, StepLabel, Stepper} from "@mui/material";
import {LoginPasswordForm} from "../../components/LoginPasswordForm";
import {LocationForm} from "../../components/LocationForm";
import {PhoneNumberForm} from "../../components/PhoneNumberForm";
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";

export const FormPage = () => {
    const steps = ['Давай знакомиться', 'Где проживаешь', 'Номер телефона']
    const currentStep = useSelector((state) => state.formReducer.currentStep)
    const {setCurrentStep} = useActions()

    const form = useSelector((state) => state.formReducer.form)
    const sendForm = () => {
        alert(JSON.stringify(form, undefined, 1))
    }
    const clearHistory = () => {
        //При добавлении новых этапов, тут нужно добавить строчку
        localStorage.removeItem('currentStep');
        localStorage.removeItem('loginPasswordForm');
        localStorage.removeItem('locationForm');
        localStorage.removeItem('phoneNumberForm');
        window.location.reload()
    }
    // clearHistory()
    return (
        <Container maxWidth="xs"
                   sx={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20}}>
            <Stepper activeStep={currentStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel onClick={() => setCurrentStep(index)}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/*В дальнейшем, при добавлении этапов, достаточно будет просто прописать case*/}
            {/*Также можно менять их местами*/}
            {/*Для последнего элемента необходимо закинуть проп для отправки формы*/}
            {(() => {
                switch (currentStep) {
                    case 0:
                        return <LoginPasswordForm setCurrentStep={setCurrentStep}/>
                    case 1:
                        return <LocationForm setCurrentStep={setCurrentStep}/>
                    case 2:
                        return <PhoneNumberForm sendForm={sendForm} setCurrentStep={setCurrentStep}/>
                    default:
                        return <>Loading</>
                }
            })()}
            <Button onClick={clearHistory}>Очистить историю</Button>
        </Container>)
}