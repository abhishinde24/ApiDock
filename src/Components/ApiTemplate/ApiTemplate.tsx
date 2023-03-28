import { createMuiTheme, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import React, { useContext } from 'react'
import { selectedAPIContext } from '../../App'
import "./ApiTemplate.css"
import { useForm, SubmitHandler } from "react-hook-form";
import { selectedAPIInterface } from "../../interfaces"
const booleanOptions = [
    {
        value: 'true',
        label: 'true',
    }, {
        value: 'false',
        label: 'false',
    }
]
const authenticationOptions = [
    {
        value: 'Open',
        label: 'Open',
    },
    {
        value: 'X-Authencation',
        label: 'X-Authencation',
    }
];

const methodOptions = [
    {
        value: 'GET',
        label: 'GET',
    },
    {
        value: 'POST',
        label: 'POST',
    },
    {
        value: 'PUT',
        label: 'PUT',
    },
    {
        value: 'DELETE',
        label: 'DELETE',
    },
    {
        value: 'PATCH',
        label: 'PATCH',
    }
];

const valueOptions = [
    {
        value: 'String',
        label: 'String',
    },
    {
        value: 'number',
        label: 'number',
    },
    {
        value: 'boolean',
        label: 'boolean',
    },
    {
        value: 'dict',
        label: 'dict',
    },
    {
        value: 'PATCH',
        label: 'PATCH',
    }
];

const statusOptions = [
    {

    },
    {

    }
];
export default function ApiTemplate() {
    const [selectedAPI, setSelectedAPI] = useContext(selectedAPIContext)
    const { register, handleSubmit } = useForm<selectedAPIInterface>();
    const onSubmit: SubmitHandler<selectedAPIInterface> = data => console.log(data);
    return (
        <>
            <form>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div className='single-value-elements'>
                        <TextField variant="outlined" label="name" id="name"
                            onChange={(e) => {
                                const changedValue = e.currentTarget.value
                                const updatedAPI = selectedAPI
                                updatedAPI.name = changedValue
                                setSelectedAPI({ ...updatedAPI })
                            }}
                            required
                            value={selectedAPI.name}
                            error={!selectedAPI.name}
                        />
                        <TextField
                            id="outlined-select-method"
                            variant="outlined"
                            select
                            label="method"
                            defaultValue={selectedAPI.method}
                        >
                            {methodOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        const changedValue = option.value
                                        const updatedAPI = selectedAPI
                                        updatedAPI.method = changedValue
                                        setSelectedAPI({ ...updatedAPI })
                                    }}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField variant="outlined" id="id" label="id" onChange={(e) => {
                            const changedValue = e.currentTarget.value
                            const updatedAPI = selectedAPI
                            updatedAPI.id = changedValue
                            setSelectedAPI({ ...updatedAPI })
                        }}
                            value={selectedAPI.id} />
                        <TextField variant="outlined" label="url" id="url" onChange={(e) => {
                            const changedValue = e.currentTarget.value
                            const updatedAPI = selectedAPI
                            updatedAPI.url = changedValue
                            setSelectedAPI({ ...updatedAPI })
                        }}
                            value={selectedAPI.url} />
                        <TextField
                            id="outlined-select-authentication-type"
                            select
                            label="AuthenticationType"
                            defaultValue={selectedAPI.authenticationType}
                        >
                            {authenticationOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        const changedValue = option.value
                                        const updatedAPI = selectedAPI
                                        updatedAPI.authenticationType = changedValue
                                        setSelectedAPI({ ...updatedAPI })
                                    }}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </Box>
                <div className='headers-array' >
                    <p>Headers</p>
                    <Fab color="primary" aria-label="add"
                        onClick={(e) => {
                            e.preventDefault()
                            const emptyValues = { key: "", value: "" }
                            const updatedAPI = selectedAPI
                            updatedAPI.headers.push(emptyValues)
                            setSelectedAPI({ ...updatedAPI })
                        }}>
                        <AddIcon />
                    </Fab>
                    {selectedAPI.headers.map((header: any, index: any) => {
                        return <div className='header-element' >
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField variant="outlined" label="Key" className='header-key' value={header.key} onChange={(e) => {
                                    const changedValue = e.currentTarget.value
                                    const updatedAPI = selectedAPI
                                    updatedAPI.headers[index].key = changedValue
                                    setSelectedAPI({ ...updatedAPI })
                                }} />
                                <TextField
                                    id="outlined-select-value"
                                    select
                                    label="value"
                                    defaultValue={selectedAPI.headers[index].value ? selectedAPI.headers[index].value : ""}
                                >
                                    {valueOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                const changedValue = option.value
                                                const updatedAPI = selectedAPI
                                                updatedAPI.headers[index].value = changedValue
                                                setSelectedAPI({ ...updatedAPI })
                                            }}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <IconButton aria-label="delete" onClick={(e) => {
                                    e.preventDefault()
                                    const updatedAPI = selectedAPI
                                    updatedAPI.headers.splice(index, 1)
                                    setSelectedAPI({ ...updatedAPI })

                                }}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </Box>

                        </div>
                    })}
                </div>

                <div className='query-params-array' >
                    <p>Query Parameters</p>
                    <Fab color="primary" aria-label="add"
                        onClick={(e) => {
                            e.preventDefault()
                            const updatedAPI = selectedAPI
                            const emptyRequest = { key: "", value: "" }
                            updatedAPI.query_parameters.push(emptyRequest)
                            setSelectedAPI({ ...updatedAPI })
                        }}>
                        <AddIcon />
                    </Fab>
                    {selectedAPI.query_parameters.map((query_parameter: any, index: any) => {
                        return <div className='query-param-element' >
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField variant="outlined" label="key" className='query-param-key' value={query_parameter.key} onChange={(e) => {
                                    const changedValue = e.currentTarget.value
                                    const updatedAPI = selectedAPI
                                    updatedAPI.query_parameters[index].key = changedValue
                                    setSelectedAPI({ ...updatedAPI })
                                }} />
                                <TextField
                                    id="outlined-select-value"
                                    select
                                    label="value"
                                    defaultValue={selectedAPI.query_parameters[index].value ? selectedAPI.query_parameters[index].value : ""}
                                >
                                    {valueOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                const changedValue = option.value
                                                const updatedAPI = selectedAPI
                                                updatedAPI.query_parameters[index].value = changedValue
                                                setSelectedAPI({ ...updatedAPI })
                                            }}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <IconButton aria-label="delete" onClick={(e) => {
                                    e.preventDefault()
                                    const updatedAPI = selectedAPI
                                    updatedAPI.query_parameters.splice(index, 1)
                                    setSelectedAPI({ ...updatedAPI })

                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </div>
                    })}
                </div>

                <div className='request-body-array' >
                    <p>Add Request</p>
                    <Fab color="primary" aria-label="add"
                        onClick={(e) => {
                            e.preventDefault()
                            const updatedAPI = selectedAPI
                            const emptyRequest = { name: "", regex: "", parameter_type: "", boolean: false }
                            updatedAPI.request_body.push(emptyRequest)
                            setSelectedAPI({ ...updatedAPI })
                        }}>
                        <AddIcon />
                    </Fab>
                    {selectedAPI.request_body.map((request_body: any, index: any) => {
                        return <div className='request-body-element' >
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField variant="outlined" label="name" id="name" value={request_body.name} onChange={(e) => {
                                    const changedValue = e.currentTarget.value
                                    const updatedAPI = selectedAPI
                                    updatedAPI.request_body[index].name = changedValue
                                    setSelectedAPI({ ...updatedAPI })
                                }} />
                                <TextField variant="outlined" label="regex" id="regex" value={request_body.regex} onChange={(e) => {
                                    const changedValue = e.currentTarget.value
                                    const updatedAPI = selectedAPI
                                    updatedAPI.request_body[index].regex = changedValue
                                    setSelectedAPI({ ...updatedAPI })
                                }} />
                                <TextField
                                    id="outlined-select-value"
                                    select
                                    label="Parameter type"
                                    defaultValue={request_body.parameter_type ? selectedAPI.request_body[index].parameter_type : ""}
                                >
                                    {valueOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                const changedValue = option.value
                                                const updatedAPI = selectedAPI
                                                updatedAPI.request_body[index].parameter_type = changedValue
                                                setSelectedAPI({ ...updatedAPI })
                                            }}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="outlined-select-value"
                                    select
                                    label="Required"
                                    defaultValue={selectedAPI.request_body[index].boolean ? selectedAPI.request_body[index].boolean : ""}
                                >
                                    {booleanOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                const changedValue = option.value
                                                const updatedAPI = selectedAPI
                                                updatedAPI.request_body[index].boolean = changedValue
                                                setSelectedAPI({ ...updatedAPI })
                                            }}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <IconButton aria-label="delete" onClick={(e) => {
                                    e.preventDefault()
                                    const updatedAPI = selectedAPI
                                    delete updatedAPI.request_body[index]
                                    updatedAPI.request_body.splice(index, 1)
                                    setSelectedAPI({ ...updatedAPI })
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </div>
                    })}
                </div>
                <div className='response-body-array' >
                    <p>Response Body</p>
                    <Fab color="primary" aria-label="add"
                        onClick={(e) => {
                            e.preventDefault()
                            const updatedAPI = selectedAPI
                            const emptyStatus = { status: "", body: [] }
                            updatedAPI.response_body.push(emptyStatus)
                            setSelectedAPI({ ...updatedAPI })
                        }}>
                        <AddIcon />
                    </Fab>
                    {selectedAPI.response_body.map((response_body: any, index: any) => {
                        return <div className='response-body-element' >
                            <TextField variant="outlined" label="status" value={response_body.status} onChange={(e) => {
                                const changedValue = e.currentTarget.value
                                const updatedAPI = selectedAPI
                                updatedAPI.response_body[index].status = changedValue
                                setSelectedAPI({ ...updatedAPI })
                            }} />
                            <IconButton aria-label="delete" onClick={(e) => {
                                e.preventDefault()
                                const updatedAPI = selectedAPI
                                updatedAPI.response_body.splice(index, 1)
                                setSelectedAPI({ ...updatedAPI })
                            }}>
                                <DeleteIcon />
                            </IconButton>
                            <div>
                                <Fab color="primary" aria-label="add"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        const updatedAPI = selectedAPI
                                        updatedAPI.response_body[index].body.push({ key: "", value: "" })
                                        setSelectedAPI({ ...updatedAPI })
                                    }}>
                                    <AddIcon />
                                </Fab>
                                {
                                    response_body.body.map((body: any, index2: any) => {
                                        return <>

                                            <Box
                                                component="form"
                                                sx={{
                                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <TextField variant="outlined" label="key" value={body.key} onChange={(e) => {
                                                    const changedValue = e.currentTarget.value
                                                    const updatedAPI = selectedAPI
                                                    updatedAPI.response_body[index].body[index2].key = changedValue
                                                    setSelectedAPI({ ...updatedAPI })
                                                }} />
                                                <TextField
                                                    id="outlined-select-value"
                                                    select
                                                    label="value"
                                                    defaultValue={selectedAPI.response_body[index].body[index2].value ? selectedAPI.response_body[index].body[index2] : ""}
                                                >
                                                    {valueOptions.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                const changedValue = option.value
                                                                const updatedAPI = selectedAPI
                                                                updatedAPI.response_body[index].body[index2].value = changedValue
                                                                setSelectedAPI({ ...updatedAPI })
                                                            }}
                                                        >
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                                <IconButton aria-label="delete" onClick={(e) => {
                                                    e.preventDefault()
                                                    const updatedAPI = selectedAPI
                                                    updatedAPI.response_body[index].body.splice(index2, 1)
                                                    setSelectedAPI({ ...updatedAPI })
                                                }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </>
                                    })
                                }
                            </div>
                        </div>
                    })}
                </div>
            </form>
        </>
    )
}
