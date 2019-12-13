import React, { useState, useCallback, useEffect } from "react";
import { Table } from "semantic-ui-react";
import { FMURL } from "../lib/definitions/enums";
import { doFetch } from "../lib/functions/general_funcs";
import { RentalOverviews } from "../lib/definitions/types";

export const RentalOverview: React.FC = () => {
  const [rentalOverviews, setRentalOverviews] = useState<RentalOverviews[]>([]);
  const [isFetchingRentalOverviews, setIsFetchingRentalOverviews] = useState<boolean>(false);
  const [popupText, setPopupText] = useState("");

  const fetchRentalOverviews = useCallback(() => {
    const url = FMURL.RentalOverviews;
    setIsFetchingRentalOverviews(true);
    doFetch(
      "GET",
      url,
      json => setRentalOverviews(json),
      json =>setPopupText(json.Message),
      message =>{
        setPopupText(message);
        setRentalOverviews([]);
      },
      "",
      () => setIsFetchingRentalOverviews(false)
    );
  },[])

  useEffect(()=>{
    fetchRentalOverviews();
  },[fetchRentalOverviews]);
  return (
    <div id="tableContainer">
     
    </div>
  );
};