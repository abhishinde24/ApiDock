import React, { useState } from "react";
import ApiForm from "./Components/ApiForm";
import ApiList from "./Components/ApiList";
import Modal from "./Components/Modal";
import { selectedAPIInterface, curlApiInterface } from "./interfaces";
export const selectedAPIContext = React.createContext<any>(null);
export const codeDialogContext = React.createContext<any>(null);
export const curlApiDetailContext = React.createContext<any>(null);
export const saveButtonContext = React.createContext<any>(true);

export default function App() {
    const [selectedAPI, setSelectedAPI] = useState<selectedAPIInterface | null>(null)
    const [codeDialog, setcodeDialog] = useState<boolean>(false)
    const [curlApiDetail, setcurlApiDetail] = useState<curlApiInterface | null>(null)
    const [saveButton, setsaveButton] = useState<boolean | null>(true);
    return (
        <selectedAPIContext.Provider value={[selectedAPI, setSelectedAPI]}>
            <codeDialogContext.Provider value={[codeDialog, setcodeDialog]}>
                <curlApiDetailContext.Provider value={[curlApiDetail, setcurlApiDetail]}>
                    <saveButtonContext.Provider value={[saveButton, setsaveButton]}>
                        <>
                            <div className="left-pane">
                                <ApiList />
                            </div>
                            <div className="right-pane">
                                <ApiForm />
                            </div>
                            <Modal />
                        </>
                    </saveButtonContext.Provider>
                </curlApiDetailContext.Provider>
            </codeDialogContext.Provider>
        </selectedAPIContext.Provider>
    )

}