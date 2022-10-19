import {formActionsTypes} from "./types";

const initialState = {
    form: {
        loginPasswordForm: {
            login: '',
            email: '',
            password: ''
        },
        locationForm: {
            country: '',
            city: '',
            street: '',
            house: ''
        },
        phoneNumberForm: {
            phoneNumber: ''
        }
    },
    currentStep: 0
}

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        //Универсальное решение для любых дополнительных этапов
        case formActionsTypes.SET_FORM_VALUES: {
            const newForm = {...state.form}
            newForm[action.formName] = action.formValues
            return {...state, form: newForm}
        }
        case formActionsTypes.SET_CURRENT_STEP: {
            return {...state, currentStep: action.currentStep}
        }
        default:
            return state
    }
}