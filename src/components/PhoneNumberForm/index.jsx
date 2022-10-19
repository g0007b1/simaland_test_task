import {Box, Button, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {useActions} from "../../hooks/useActions";
import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";

export const PhoneNumberForm = ({sendForm}) => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm()
    const {setFormValues} = useActions()
    const currPhoneNumber = useRef({});
    currPhoneNumber.current = watch('phoneNumber');
    const phoneNumber = useSelector((state) => state.formReducer.form.phoneNumberForm.phoneNumber)
    useEffect(() => {
        localStorage.setItem('currentStep', '2');
    }, [])

    const onSubmit = handleSubmit((data) => {
        const {phoneNumber} = data
        localStorage.setItem('phoneNumberForm', JSON.stringify({phoneNumber}));
        sendForm()
    })

    const sendCode = () => {
        alert('Предположим, произошла магия общения с сервером и на ваш телефон пришло смс с текстом: ваш код: 123')
        setFormValues('phoneNumberForm', {phoneNumber: currPhoneNumber.current})
    }
    return (
        <Box
            sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">Номер телефона</Typography>
            <Box component="form" noValidate sx={{mt: 1}} onSubmit={onSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Номер телефона"
                    id="phoneNumber"
                    defaultValue={phoneNumber}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
                    {...register('phoneNumber',
                        {
                            required: 'Это обязательное поле!'
                        }
                    )}
                    autoComplete="phoneNumber"
                />
                <Button
                    onClick={sendCode}
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Получить код
                </Button>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Код"
                    id="phoneCode"
                    error={!!errors.phoneCode}
                    helperText={errors.phoneCode ? errors.phoneCode.message : ''}
                    {...register('phoneCode',
                        {
                            required: 'Это обязательное поле!'
                        }
                    )}
                    autoComplete="phoneCode"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Зарегистрироваться
                </Button>
            </Box>
        </Box>
    )
}