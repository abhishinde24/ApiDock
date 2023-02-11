import React, { useContext } from 'react'
import { selectedAPIContext } from '../../App'

import "./ApiTemplate.css"

export default function ApiTemplate() {
    const [selectedAPI, setSelectedAPI] = useContext(selectedAPIContext)
    console.log('rerender')
    return (
        <>
            <form>
                <input type="text" id="name" onChange={(e) => {
                    const changedValue = e.currentTarget.value
                    console.log(e.currentTarget.value)
                    const updatedAPI = selectedAPI
                    updatedAPI.name = changedValue
                    setSelectedAPI({ ...updatedAPI })
                }} value={selectedAPI.name} />
                <input type="text" id="method" onChange={(e) => {
                    const changedValue = e.currentTarget.value
                    console.log(e.currentTarget.value)
                    const updatedAPI = selectedAPI
                    updatedAPI.method = changedValue
                    setSelectedAPI({ ...updatedAPI })
                }}
                    value={selectedAPI.method} />
                <input type="text" id="id" onChange={(e) => {
                    const changedValue = e.currentTarget.value
                    console.log(e.currentTarget.value)
                    const updatedAPI = selectedAPI
                    updatedAPI.id = changedValue
                    setSelectedAPI({ ...updatedAPI })
                }}
                    value={selectedAPI.id} />
                <input type="text" id="url" onChange={(e) => {
                    const changedValue = e.currentTarget.value
                    console.log(e.currentTarget.value)
                    const updatedAPI = selectedAPI
                    updatedAPI.url = changedValue
                    setSelectedAPI({ ...updatedAPI })
                }}
                    value={selectedAPI.url} />
                <input type="text" id="authentication_type" onChange={(e) => {
                    const changedValue = e.currentTarget.value
                    console.log(e.currentTarget.value)
                    const updatedAPI = selectedAPI
                    updatedAPI.authentication_type = changedValue
                    setSelectedAPI({ ...updatedAPI })
                }}
                    value={selectedAPI.authenticationType} />
                <div className='headers-array' >
                    {selectedAPI.headers.map((header: any, index: any) => {
                        return <div className='header-element' >
                            <input type="text" id="name" value={header.key} />
                            <input type="text" id="name" value={header.value} />
                        </div>
                    })}
                </div>

                <div className='query-params-array' >
                    {selectedAPI.query_parameters.map((query_parameter: any, index: any) => {
                        return <div className='query-param-element' >
                            <input type="text" id="name" value={query_parameter.key} />
                            <input type="text" id="name" value={query_parameter.value} />
                        </div>
                    })}
                </div>

                <div className='request-body-array' >
                    {selectedAPI.request_body.map((request_body: any, index: any) => {
                        return <div className='request-body-element' >
                            <input type="text" id="name" value={request_body.name} />
                            <input type="text" id="name" value={request_body.regex} />
                            <input type="text" id="name" value={request_body.parameter_type} />
                            <input type="text" id="name" value={request_body.boolean} />
                        </div>
                    })}
                </div>
                <div className='response-body-array' >
                    {selectedAPI.response_body.map((response_body: any, index: any) => {
                        return <div className='response-body-element' >
                            <input type="text" value={response_body.status} />
                            <div>
                                {
                                    response_body.body.map((body: any, index2: any) => {
                                        return <><input type="text" value={body.key} />
                                            <input type="text" value={body.value} />
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
