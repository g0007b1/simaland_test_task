import {formActionsTypes} from "./types";

export const formActions = {
    setFormValues: (formName, formValues) => ({type: formActionsTypes.SET_FORM_VALUES, formName, formValues}),
    setCurrentStep: (currentStep) => ({type: formActionsTypes.SET_CURRENT_STEP, currentStep})
}