import * as React from 'react';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { codeDialogContext, curlApiDetailContext, selectedAPIContext } from '../../App';
import Typography from '@mui/material/Typography/Typography';
import useCopyToClipboard from './copy_to_clip'
import CurlApiTemplate from '../CurlApiTemplate';
import CurlApiTemplate2 from '../CurlApiTemplate2';
import "./Modal.css"

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    margin: '16px',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function ChildModal() {
    const [value, copy] = useCopyToClipboard()
    const [open, setOpen] = React.useState(false);
    const [curlApiDetail, setcurlApiDetail] = useContext(curlApiDetailContext);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const temp: JSON = {} as JSON;
    function generateCurl() {
        const request_body: any = {}
        const query_parameters: any = {}
        const headers: any = {}
        curlApiDetail.request_body.map((requestbody: any, index: any) => {
            request_body[requestbody.name] = requestbody.inputValue
        })
        curlApiDetail.query_parameters.map((queryparameter: any, index: any) => {
            query_parameters[queryparameter.key] = queryparameter.inputValue
        })
        curlApiDetail.headers.map((header: any, index: any) => {
            headers[header.key] = header.inputValue
        })
        var url = curlApiDetail.url
        if (JSON.stringify(query_parameters) !== '{}') {
            url = url + '?'
            for (var pro in query_parameters) {
                url = url + pro + '=' + query_parameters[pro] + '&'
            }
            url = url.slice(0, -1);
            query_parameters
        }
        var curl_request = 'curl --location --request ' + curlApiDetail.method + " '" + url + "'"
        Object.keys(headers).forEach(key => {
            curl_request = curl_request + " --header " + String(key) + ':' + String(headers[key])
        })
        curl_request = curl_request + " --data-raw '" + JSON.stringify(request_body) + "'"
        return curl_request
    }
    return (
        <React.Fragment>
            <Button onClick={handleOpen}>Next</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h5 id="parent-modal-title">Generated CURL request</h5>
                    <div className="generate-curl-modal">
                        {generateCurl()}
                        <IconButton style={{ position: 'absolute', right: '8%', top: '18%' }} color="primary" aria-label="add to shopping cart" onClick={() => copy(generateCurl())}>
                            <ContentCopyIcon />
                        </IconButton>
                    </div>
                    <Button onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default function NestedModal() {
    const [codeDialog, setcodeDialog] = useContext(codeDialogContext)
    const [selectedAPI, setSelectedAPI] = useContext(selectedAPIContext)
    const handleOpen = () => {
        setcodeDialog(true);
    };
    const handleClose = () => {
        setcodeDialog(false);
    };
    return (
        <div>
            <Modal
                open={codeDialog}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400, }}>
                    <Typography>Enter value of parameters</Typography>
                    {/* <CurlApiTemplate /> */}
                    <CurlApiTemplate2 />
                    <ChildModal />
                </Box>
            </Modal>
        </div>
    );
}