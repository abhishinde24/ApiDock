import React, { useState } from "react";
import ApiForm from "./Components/ApiForm";
import ApiList from "./Components/ApiList";
import { selectedAPIInterface } from "./interfaces";

export const selectedAPIContext = React.createContext<any>(null);

export default function App() {
    const [selectedAPI, setSelectedAPI] = useState<any>(null)
    return (
        <selectedAPIContext.Provider value={[selectedAPI, setSelectedAPI]}>
            <>
                <div className="left-pane">
                    <ApiList />
                </div>
                <div className="right-pane">
                    <ApiForm />
                </div>
            </>
        </selectedAPIContext.Provider>
    )

}