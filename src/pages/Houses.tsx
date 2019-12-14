import React, { useState, useEffect, useCallback } from "react";
import { Table } from "semantic-ui-react";
import { Houses } from "../lib/definitions/types";
import { FMURL } from "../lib/definitions/enums";
import { async } from "q";
import { doFetch } from "../lib/functions/general_funcs";

export const House: React.FC = () => {
  const [houses, setHouses] = useState<Houses[]>([]);
  const [isFetchingHouses, setIsFetchingHouses] = useState(false);
  const [popupText, setPopupText] = useState("");


  const fetchHouses = useCallback(() => {
    const url = FMURL.Houses;
    setIsFetchingHouses(true);
    doFetch(
      "GET",
      url,
      json => setHouses(json.houses), // vezi ce nume are json-ul
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

  return <div>
    <Table>

    </Table>
  </div>;
};
