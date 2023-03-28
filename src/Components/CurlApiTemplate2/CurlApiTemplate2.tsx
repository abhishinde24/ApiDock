import { TextField } from '@material-ui/core';
import React from 'react'
import { useContext } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { curlApiDetailContext } from '../../App';
import { Box } from '@mui/system'

interface IFormInput {
    firstName: string;
    lastName: string;
    age: number;
}
export default function CurlApiTemplate2() {
    const [curlApiDetail, setcurlApiDetail] = useContext(curlApiDetailContext)
    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => { console.log(data, errors), console.log('submit button clicked') };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("firstName", { required: true, maxLength: 20 })} />
            <div className='curl-headers'>
                <p>Headers</p>
                {curlApiDetail.headers.map((header: any, index: any) => {
                    return <div className='header-element' >
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField variant="outlined" label={header.key} className='header-key' {...register(header.key)} required />
                        </Box>
                    </div>
                })}
            </div>
            <TextField {...register("lastName", { pattern: /^[A-Za-z]+$/i })} error={errors.lastName ? true : false} />
            <input type="number" {...register("age", { min: 18, max: 99 })} />
            <input type="submit" />
        </form>
    )
}
