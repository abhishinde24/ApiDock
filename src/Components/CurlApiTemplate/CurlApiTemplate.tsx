import { Box } from '@mui/system'
import { TextField } from '@mui/material'
import React, { useContext } from 'react'
import { curlApiDetailContext } from '../../App'
import { useForm, SubmitHandler } from "react-hook-form";
import { curlApiInterface } from '../../interfaces';
import "./CurlApiTemplate.css"

export default function CurlApiTemplate() {
    const [curlApiDetail, setcurlApiDetail] = useContext(curlApiDetailContext)
    const { register, handleSubmit } = useForm<curlApiInterface>();
    const onSubmit: SubmitHandler<curlApiInterface> = data => console.log(data);
    return (
        <form >
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
                            <TextField variant="outlined" label={header.key} className='header-key' value={header.inputValue} onChange={(e) => {
                                const changedValue = e.currentTarget.value
                                const updatedAPI = curlApiDetail
                                curlApiDetail.headers[index].inputValue = changedValue
                                setcurlApiDetail({ ...updatedAPI })
                            }} />
                        </Box>
                    </div>
                })}
            </div>
            <div className='curl-queryparameters'>
                <p>Query Parameters</p>
                {curlApiDetail.query_parameters.map((query_parameter: any, index: any) => {
                    return <div className='queryparameters-element' >
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField variant="outlined" label={query_parameter.key} className='queryparameters-inputvalue' value={query_parameter.inputValue} onChange={(e) => {
                                const changedValue = e.currentTarget.value
                                const updatedAPI = curlApiDetail
                                curlApiDetail.query_parameters[index].inputValue = changedValue
                                setcurlApiDetail({ ...updatedAPI })
                            }} />
                        </Box>

                    </div>
                })}
            </div>
            <div className='request-body'>
                <p>Request body</p>
                {curlApiDetail.request_body.map((request_body: any, index: any) => {
                    return <div className='request-body-element' >
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField variant="outlined" label={request_body.name} className='request-inputvalue' value={request_body.inputValue} onChange={(e) => {
                                const changedValue = e.currentTarget.value
                                const updatedAPI = curlApiDetail
                                curlApiDetail.request_body[index].inputValue = changedValue
                                setcurlApiDetail({ ...updatedAPI })
                            }} />
                        </Box>
                    </div>
                })}
            </div>
        </form>
    )
}
