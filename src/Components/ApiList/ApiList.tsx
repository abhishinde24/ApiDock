import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React, { useContext, useEffect, useState } from 'react'
import { getCookie, getResponse } from '../../utils'
import "./ApiList.css"
import { useNavigate } from "react-router-dom"
import { selectedAPIContext } from '../../App'
export default function ApiList() {
  const [selectedAPI, setSelectedAPI] = useContext(selectedAPIContext)
  const [apiList, setAPIList]: any = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const cookieApiList = getCookie("api_list")
    if (cookieApiList) {
      setAPIList(JSON.parse(cookieApiList))
    }
    const loadData = async () => {
      const response = await getResponse('../../../public/list_api.json');
      console.log("abhishek", response.apis);
      setAPIList(response.apis);
      console.log("jsfdl", apiList)
    };
    loadData();
  }, [])

  function addApi() {
    const newApiName = "UnNamed" // todo check for api name uniqueness

    setSelectedAPI(getEmptyAPI(newApiName))
    navigate('/edit/' + newApiName)
  }

  function selectedApi(id: any) {
    const selected_api = {
      name: "test_api",
      method: "post",
      id: "sjfkljskdfjslkf",
      url: "www.google.com",
      authenticationType: "OpenAuthentication",
      headers: [{ "key": "test", "value": "string" }, { "key": "test", "value": "string" }],
      query_parameters: [{ "key": "test", "value": "string" }, { "key": "test", "value": "string" }],
      request_body: [{ "name": "test", "regex": "lskdfjl", "parameter_type": "skdf", "required": "jsflk" }, { "name": "test", "regex": "lskdfjl", "parameter_type": "skdf", "required": "jsflk" }],
      response_body: [{ "status": 200, "body": [{ "key": "test", "value": "lsjfd" }] }],
    }
    // set value by calling api
    setSelectedAPI(selected_api)
    console.log('selected api', id)
  }

  return (
    <div className='api-list'>
      <button onClick={() => {
        addApi()
      }} >
        Add API
      </button>
      {apiList ?
        apiList.map((api: any, key: any) => {
          return <div >
            <ListItem key={key} component="div" disablePadding>
              <ListItemButton onClick={() => selectedApi(api.id)}>
                <ListItemText style={{ minWidth: '105px', maxWidth: '105px' }} primary={api.name} />
                <ListItemText primary={api.method} />
              </ListItemButton>
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
    method: null,
    id: null,
    url: null,
    authenticationType: null,
    headers: [],
    query_parameters: [],
    request_body: [],
    response_body: [],
  }
}