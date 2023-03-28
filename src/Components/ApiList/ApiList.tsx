import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import React, { useContext, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { getCookie, getResponse, PostResponse } from '../../utils'
import "./ApiList.css"
import { useNavigate } from "react-router-dom"
import { selectedAPIContext, saveButtonContext } from '../../App'
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';

export default function ApiList() {
  const [selectedAPI, setSelectedAPI] = useContext(selectedAPIContext)
  const [saveButton, setsaveButton] = useContext(saveButtonContext)
  const [apiList, setAPIList]: any = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const cookieApiList = getCookie("api_list")
    if (cookieApiList) {
      setAPIList(JSON.parse(cookieApiList))
    }
    const loadData = async () => {
      const response = await getResponse("http://localhost:8000/api/list-api");
      setAPIList(response.data);
    };
    loadData();
  }, [saveButton])

  function addApi() {
    const newApiName = "Unnamed" // todo check for api name uniqueness
    setSelectedAPI(getEmptyAPI(newApiName))
    navigate('/edit/' + newApiName)
  }

  function selectedApi(id: any) {
    if (saveButton === false) {
      alert("Please,save api to select")
      return;
    }
    const loadapidetail = async (id: any) => {
      const response = await PostResponse("http://localhost:8000/api/api-details/" + id, {});
      const selected_api = {
        name: response['name'],
        method: response['method'],
        id: response['id'],
        url: response['url'],
        authenticationType: response['authenticationType'],
        headers: response['headers'],
        query_parameters: response['query_parameters'],
        request_body: response['request_body'],
        response_body: response['response_body'],
      }
      setSelectedAPI({ ...selected_api })
    }
    // set value by calling api
    loadapidetail(id)
    navigate('/view/' + selectedAPI.name)
  }

  return (
    <div className='api-list'>
      <Button style={{ marginTop: "8px" }} onClick={() => { addApi() }} variant="contained" startIcon={<AddIcon />}>Add API</Button>
      {apiList ?
        apiList.map((api: any, key: any) => {
          return <div key={key} style={{ width: "100%" }}>
            <ListItem component="div" disablePadding>
              <ListItemButton style={{ width: "90%" }} onClick={() => selectedApi(api.id)}>
                <ListItemText style={{ margin: "2px", minWidth: '75%', maxWidth: '75%' }} primary={api.name} />
                <Chip label={api.method} color="primary" />
              </ListItemButton>
              <Divider light />
            </ListItem>
          </div>
        })
        : ""}
    </div>
  )
}

function getEmptyAPI(name: any) {
  return {
    name: name,
    method: "",
    id: uuidv4(),
    url: "",
    authenticationType: "",
    headers: [],
    query_parameters: [],
    request_body: [],
    response_body: [],
  }
}