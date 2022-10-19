import {Box, Button, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {useEffect, useRef} from "react";
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";

export const LoginPasswordForm = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm()
    const {email, login, password} = useSelector((state) => state.formReducer.form.loginPasswordForm)

    const currPassword = useRef({});
    const {setFormValues, setCurrentStep} = useActions()
    currPassword.current = watch('password');
    useEffect(() => {
        localStorage.setItem('currentStep', '0');
    }, [])
    const onSubmit = handleSubmit((data) => {
        //Да, небезопасно, предположим, тут супер-крутой метод шифрования
        const {email, login, password} = data
        setFormValues('loginPasswordForm', {email, login, password})
        localStorage.setItem('loginPasswordForm', JSON.stringify({email, login, password}));
        setCurrentStep(1)
    })
    return (
        <Box
            sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">Давай знакомиться</Typography>
            <Box component="form" noValidate sx={{mt: 1}} onSubmit={onSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Логин"
                    id="login"
                    error={!!errors.login}
                    defaultValue={login}
                    helperText={errors.login ? errors.login.message : ''}
                    {...register('login',
                        {
                            required: 'Это обязательное поле!'
                        }
                    )}
                    autoComplete="login"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="email"
                    autoFocus
                    label={'Email'}
                    defaultValue={email}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                    {...register('email',
                        {
                            required: 'Это обязательное поле!'
                        }
                    )}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Пароль"
                    type="password"
                    id="password"
                    defaultValue={password}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                    {...register('password',
                        {
                            required: 'Это обязательное поле!'
                        }
                    )}
                    autoComplete="current-password"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Повторите пароль"
                    type="password"
                    id="repeatedPassword"
                    error={!!errors.repeatedPassword}
                    helperText={errors.repeatedPassword ? errors.repeatedPassword.message : ''}
                    {...register("repeatedPassword",
                        {
                            required: 'Это обязательное поле!',
                            validate: value =>
                                value === currPassword.current || "Пароли не совпадают!"
                        })}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Дальше
                </Button>

            </Box>
        </Box>
    )
}