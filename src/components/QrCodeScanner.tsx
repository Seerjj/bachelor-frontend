import React, { useState } from 'react'
import QrReader from 'react-qr-reader'
import { House } from "../lib/definitions/types"
 
const QrCodeReader: React.FC = () => {

    const [state, setState] = useState('No Result');
    const [house, setHouse] = useState<House>();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalText, setModalText] = useState<string>("");

    navigator.getUserMedia({video: true}, () => console.log("QR Scanner is active"), err => console.error(err));

    let handleScan = (data:any) => {
        if (data){
            let url = `http://localhost:54263/api/v1/fmhousetypes/bytype/${data}`;
            fetchData(url);
        }
    }

    let handleError = (err: any) => {
        console.error(err)
    }
    
    async function fetchData(url: string) {
        setIsFetching(true);
        
        let token = window.localStorage.getItem("token")
        
        console.log("TOKEN: " + token)
        const res = await fetch(url, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },            
        });
        res.json().then(
            res => {
            setHouse(res);
            setIsFetching(false);
            let info = "";
            if(res.id !== undefined){
                info = "House ID: " + res.id + ", " +
                "House Type: " + res.houseType + ", " +
                "Materials: " + res.materialsOnHouse;
            }
            else{
                info = "undefined"
            }

            setState(info);
            },
            res => {
            setModalText(res.Message);
            setShowModal(true);
            setIsFetching(false);
            }
        );
    }

    let displayData = () =>
    {
        if(state !== "undefined")
            return state;
        else return "Result Not Found"
    }

    return (
    <div>
        <QrReader
        delay={1000}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%'}}
        />
        <div>
            <p style={{fontSize: '20px', width: "18em"}}> {displayData()} </p>
        </div>
    </div>
    )
}
  
export default QrCodeReader;