import { selectClasses } from '@mui/material'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectedAPIContext, saveButtonContext } from '../../App'
import { PostResponse } from '../../utils'
import ApiTemplate from '../ApiTemplate'
import "./EditApiForm.css"

export default function EditApiForm() {
    const [saveButton, setsaveButton] = useContext(saveButtonContext)
    const [selectedAPI, setSelectedAPI] = useContext(selectedAPIContext)
    const navigate = useNavigate()
    function saveApiDetail() {
        const postapidetail = async () => {
            const body = {
                id: selectedAPI.id,
                name: selectedAPI.name,
                url: selectedAPI.url,
                method: selectedAPI.method,
                authenticationType: selectedAPI.authenticationType,
                headers: selectedAPI.headers,
                query_parameters: selectedAPI.query_parameters,
                request_body: selectedAPI.request_body,
                response_body: selectedAPI.response_body
            }
            const response = await PostResponse("http://localhost:8000/api/api-detail", body);
        }
        postapidetail()
        setsaveButton(true)
        navigate("/view/" + selectedAPI.name)
    }

    return (
        <div>

            {
                selectedAPI ?
                    <>
                        <div className="edit-buttons">
                            <Stack direction="row" spacing={2}>
                                <Button variant='contained'
                                    onClick={(e) => {
                                        saveApiDetail()
                                    }}
                                    startIcon={<SaveIcon />}
                                >
                                    Save
                                </Button>
                                <Button variant='contained' startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </Stack>
                        </div>
                        <ApiTemplate /> </> : ""
            }
        </div>
    )
}
