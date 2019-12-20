import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { HouseType } from "../lib/definitions/types";
import { Table } from "semantic-ui-react";
//Used react-qr-reader

const QrCodeReader: React.FC = () => {
  const [state, setState] = useState("No Result");
  const [house, setHouse] = useState<HouseType>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>("");

  navigator.getUserMedia(
    { video: true },
    () => console.log("QR Scanner is active"),
    err => console.error(err)
  );

  // const response = await fetch(url, {
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     //mode: 'cors', // no-cors, *cors, same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       'Content-Type': 'application/json'
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: 'follow', // manual, *follow, error
  //     referrer: 'no-referrer', // no-referrer, *client
  //     body: JSON.stringify(data) // body data type must match "Content-Type" header
  //   });

  let handleScan = (data: any) => {
    if (data) {
      let url = `https://localhost:44310/api/v1/fmhousetypes/bytype/${data}`;
      fetchData(url);
    }
  };

  let handleError = (err: any) => {
    console.error(err);
  };

  async function fetchData(url: string) {
    setIsFetching(true);

    let token = window.localStorage.getItem("Authorization");

    console.log("TOKEN: " + token);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token + ""
      }
    });
    res.json().then(
      res => {
        setHouse(res);
        setIsFetching(false);
        let info = "";
        if (res.id != undefined) {
          info =
            "House ID: " +
            res.id +
            ", " +
            "House Type: " +
            res.houseType +
            ", " +
            "Materials: " +
            res.materialsOnHouse;
        } else {
          info = "undefined";
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

  // useEffect(() => {
  // fetchData(state);
  // },[]);

  let displayData = () => {
    if (house) {
      console.log(house);
      return (
        <div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Hosue ID</Table.HeaderCell>
                <Table.HeaderCell>House Type</Table.HeaderCell>
                <Table.HeaderCell>Materials</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{house.id}</Table.Cell>
                <Table.Cell>{house.houseType}</Table.Cell>
                <Table.Cell>{house.materialsOnHouse}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      );
    } else return "Result Not Found";
  };

  return (
    <div>
      <QrReader
        delay={1000}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "26%" }}
      />

      {displayData()}
      
    </div>
  );
};

export default QrCodeReader;
