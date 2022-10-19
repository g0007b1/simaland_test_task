import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store";
import {formActions} from "./store/reducers/form/actions";

const root = ReactDOM.createRoot(document.getElementById('root'));
// Для сохранения прогресса новых этапов достаточно добавить пару строк, аналогичных этим
const currentStep = localStorage.getItem('currentStep');
const loginPasswordForm = localStorage.getItem('loginPasswordForm');
const locationForm = localStorage.getItem('locationForm');
const phoneNumberForm = localStorage.getItem('phoneNumberForm');

if (currentStep) store.dispatch(formActions.setCurrentStep(+currentStep))
if (loginPasswordForm) store.dispatch(formActions.setFormValues('loginPasswordForm', JSON.parse(loginPasswordForm)));
if (loginPasswordForm) store.dispatch(formActions.setFormValues('locationForm', JSON.parse(locationForm)));
if (phoneNumberForm) store.dispatch(formActions.setFormValues('phoneNumberForm', JSON.parse(phoneNumberForm)));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            {store ? <App/> : <>Loading</>}
        </Provider>
    </React.StrictMode>
);

