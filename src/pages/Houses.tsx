import React, { useState, useEffect, useCallback } from "react";
import { Table } from "semantic-ui-react";
import { House } from "../lib/definitions/types";
import { FMURL } from "../lib/definitions/enums";
import { doFetch } from "../lib/functions/general_funcs";
import { HouseInformation } from "./HouseInformation";

export const Houses: React.FC = () => {

  
  const [currentHouse, setCurrentHouse] = useState<House>();
  const [houses, setHouses] = useState<House[]>([]);
  const [isFetchingHouses, setIsFetchingHouses] = useState(false);
  const [popupText, setPopupText] = useState("");

  const [setupIsActive, setSetupIsActive] = useState(false);


  const fetchHouses = useCallback(() => {
    const url = FMURL.Houses;
    setIsFetchingHouses(true);
    doFetch(
      "GET",
      url,
      json => setHouses(json), 
      json => setPopupText(json.Message),
      message => {
        setPopupText(message); 
        setHouses([]);
      },
      "",
      () => setIsFetchingHouses(false)
    );
  }, []);

  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]);

  
  function handleHouseClick(house: House) {
    setSetupIsActive(false);
    setCurrentHouse(house);
    console.log(house);
  }
  return <div>
    <Table celled selectable>
    <Table.Header>
          <Table.Row>
            <Table.HeaderCell>House type</Table.HeaderCell>
            <Table.HeaderCell>Square meters</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {houses.map(function(house, i) {
          return (
            <Table.Body onClick={() => handleHouseClick(house)} key = {i}>
              <Table.Row>
                <Table.Cell>{house.houseType}</Table.Cell>
                <Table.Cell>{house.squareMeters}</Table.Cell>
              </Table.Row>
            </Table.Body>
          )
        })}
    </Table>
    <HouseInformation
        currentHouse={currentHouse}
        fetchHouses={fetchHouses}
        onNewCurrentHouse={setCurrentHouse}
        onSetupStateChange={setSetupIsActive}
        setupIsActive={setupIsActive}
      />
  </div>;
};
