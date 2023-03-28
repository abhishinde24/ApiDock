import { Button } from '@mui/material';
import React, { useContext } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CodeIcon from '@mui/icons-material/Code';
import { useNavigate } from 'react-router-dom';
import { selectedAPIContext, codeDialogContext, saveButtonContext } from '../../App'
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { DeleteRequest } from '../../utils';
import { curlApiDetailContext } from '../../App';

function PrettyPrint(props: any) {
    return JSON.stringify(props.jsonObj, null, 2);
}
function stringify(obj_from_json: any) {
    if (typeof obj_from_json === "object" || Array.isArray(obj_from_json)) {
        return JSON.stringify(obj_from_json);
    }
    return obj_from_json
}
function isObject(obj_from_json: any) {
    if (typeof obj_from_json === "object" || Array.isArray(obj_from_json)) {
        return true;
    }
    return false;
}


export default function ViewApiForm() {
    const [selectedAPI, setSelectedAPI] = useContext(selectedAPIContext)
    const [codeDialog, setcodeDialog] = useContext(codeDialogContext)
    const [curlApiDetail, setcurlApiDetail] = useContext(curlApiDetailContext)
    const [saveButton, setsaveButton] = useContext(saveButtonContext)
    const navigate = useNavigate()
    function deleteApi(id: any) {
        const deleteapidetail = async (id: any) => {
            const response = await DeleteRequest("http://localhost:8000/api/api-details/" + id);
        }
        deleteapidetail(id)
        setSelectedAPI(null)
        navigate("/")
    }
    function loadDataIntoCurlApi() {
        const curlApiDetailJson = {
            url: selectedAPI.url,
            method: selectedAPI.method,
            authenticationType: selectedAPI.authenticationType,
            headers: Array(),
            query_parameters: Array(),
            request_body: Array()
        }
        // appending headers

        selectedAPI.headers.map((header: any, index: any) => {
            const tempheader = { ...header, inputValue: "" }
            curlApiDetailJson.headers.push(tempheader)
        })

        // appending queryParameters

        selectedAPI.query_parameters.map((query_parameter: any, index: any) => {
            const tempQueryParameters = { ...query_parameter, inputValue: "" }
            curlApiDetailJson.query_parameters.push(tempQueryParameters)
        })

        // apppending request_body

        selectedAPI.request_body.map((request_body: any, index: any) => {
            const tempRequestBody = { ...request_body, inputValue: "" }
            curlApiDetailJson.request_body.push(tempRequestBody)
        })
        setcurlApiDetail({ ...curlApiDetailJson })
    }
    return (
        <div>
            <Typography variant="h6" component="div">View Api Form</Typography>
            {selectedAPI ?
                <>
                    <div className="edit-buttons">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Button
                                variant="contained"
                                onClick={(e) => {
                                    setsaveButton(false)
                                    navigate("/edit/" + selectedAPI.name)
                                }}
                                startIcon={<EditIcon />}
                            >
                                Edit
                            </Button>
                            <Button variant='contained' startIcon={<DeleteIcon />}
                                onClick={(e) => { deleteApi(selectedAPI.id) }}
                            >
                                Delete
                            </Button>
                            <Button variant='contained' startIcon={<CodeIcon />}
                                onClick={(e) => { setcodeDialog(true), loadDataIntoCurlApi() }}
                            >
                                cURL
                            </Button>

                        </Stack>
                    </div>
                    <div>
                        <ApiView
                            data={selectedAPI}
                            key={selectedAPI.id}
                        />
                    </div>
                </> :
                <p>Please Select Api</p>
            }
        </div >
    )
}

const ApiView = (data: any) => {
    if (!data) return <div>{data}</div>;
    return (
        <>
            {
                Object.keys(data.data).map((key: any, index: any) => {
                    return (
                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flexWrap: "wrap", padding: "0 10px" }}>
                            <span style={{ width: "15%" }}>{key}: </span>
                            {isObject(stringify(data.data[key])) == false ?
                                <p style={{ wordWrap: "break-word", width: "80%", margin: "8px", backgroundColor: "#DCDCDC", borderRadius: "2%", padding: "10px" }}>{stringify(data.data[key])}</p> :
                                <pre style={{ wordWrap: "break-word", width: "80%", margin: "8px", backgroundColor: "#DCDCDC", borderRadius: "2%", padding: "10px" }}>{stringify(data.data[key])}</pre>
                            }
                        </div>
                    )
                })
            }
        </>
    );
};