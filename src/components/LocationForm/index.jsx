import {Box, Button, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import {useEffect} from "react";

export const LocationForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const {setFormValues, setCurrentStep} = useActions()
    const {country, city, street, house} = useSelector((state) => state.formReducer.form.locationForm)

    useEffect(() => {
        localStorage.setItem('currentStep', '1');
    }, [])

    const onSubmit = handleSubmit((data) => {
        setFormValues('locationForm', data)
        localStorage.setItem('locationForm', JSON.stringify(data));
        setCurrentStep(2)
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
            <Typography component="h1" variant="h5">Где проживаешь?</Typography>
            <Box component="form" noValidate sx={{mt: 1}} onSubmit={onSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Страна"
                    id="country"
                    defaultValue={country ? country : ''}
                    error={!!errors.country}
                    helperText={errors.country ? errors.country.message : ''}
                    {...register('country',
                        {
                            required: 'Это обязательное поле!'
                        }
                    )}
                    autoComplete="country"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Город"
                    id="city"
                    defaultValue={city ? city : ''}
                    error={!!errors.city}
                    helperText={errors.city ? errors.city.message : ''}
                    {...register('city',
                        {
                            required: 'Это обязательное поле!'
                        }
                    )}
                    autoComplete="city"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Улица"
                    id="street"
                    defaultValue={street ? street : ''}
                    error={!!errors.street}
                    helperText={errors.street ? errors.street.message : ''}
                    {...register('street')}
                    autoComplete="street"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Дом"
                    id="house"
                    defaultValue={house ? house : ''}
                    error={!!errors.house}
                    helperText={errors.house ? errors.house.message : ''}
                    {...register('house')}
                    autoComplete="house"
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