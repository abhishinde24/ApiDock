import React, { useContext } from 'react'
import { selectedAPIContext } from '../../App'
import { Routes, Route } from "react-router-dom"
import EditApiForm from '../EditApiForm'
import ViewApiForm from '../ViewApiForm'
import AddApiForm from '../AddApiForm'
import { selectedAPIInterface } from '../../interfaces'

export default function ApiForm() {
    const [selectedAPI, setSelectedAPI] = useContext(selectedAPIContext)
    return (
        <>
            {<div>
                <Routes>
                    <Route path="/edit/:name" element={<EditApiForm />} />
                    <Route path="/view/:name" element={<ViewApiForm />} />
                    <Route path="/add/:name" element={<AddApiForm />} />
                </Routes>

            </div>
            }

        </>
    )
}
