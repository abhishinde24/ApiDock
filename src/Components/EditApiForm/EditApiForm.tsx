import React, { useContext } from 'react'
import { selectedAPIContext } from '../../App'
import ApiTemplate from '../ApiTemplate'

export default function EditApiForm() {
    const [selectedAPI, setSelectedAPI] = useContext(selectedAPIContext)
    return (
        <div>

            {
                selectedAPI ?
                    <>
                        <div className="edit-buttons">
                            <button>
                                Save
                            </button>
                            <button>
                                Delete
                            </button>
                        </div>

                        <ApiTemplate /> </> : ""
            }
        </div>
    )
}
