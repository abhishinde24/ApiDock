import React, { useContext } from 'react'
import { selectedAPIContext } from '../../App'

function PrettyPrint(props: any) {
    return JSON.stringify(props.jsonObj, null, 2);
}
function stringify(obj_from_json: any) {
    if (typeof obj_from_json === "object" || Array.isArray(obj_from_json)) {
        return JSON.stringify(obj_from_json);
    }
    return obj_from_json
}
export default function ViewApiForm() {
    const [selectedAPI, setSelectedAPI] = useContext(selectedAPIContext)
    return (
        <div>

            ViewApiForm
            {selectedAPI ?
                <>
                    <div className="edit-buttons">
                        <button>
                            Edit
                        </button>
                        <button>
                            Delete
                        </button>
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
                            <p style={{ wordWrap: "break-word", width: "80%", margin: "8px", backgroundColor: "gray", borderRadius: "2%", padding: "10px" }}>{stringify(data.data[key])}</p>
                        </div>
                    )
                })
            }
        </>
    );
};