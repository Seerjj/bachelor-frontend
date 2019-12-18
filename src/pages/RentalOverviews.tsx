import React, { useEffect, useState, useReducer, useCallback } from "react";
import { RentalOverview } from "../lib/definitions/types";
import { FMURL } from "../lib/definitions/enums";
import { doFetch } from "../lib/functions/general_funcs";
import { Table } from "semantic-ui-react";
import { RentalOverviewInformation } from "./RentalOverviewsInformation";

export const RentalOverviews: React.FC = () => {
    
  const [currentRental, setCurrentRental] = useState<RentalOverview>();

  const [rentals, setRentals] = useState<RentalOverview[]>([]);
  const [isFetchingRentals, setIsFetchingRentals] = useState<boolean>(
    false
  );
  const [popupText, setPopupText] = useState("");

  const [setupIsActive, setSetupIsActive] = useState(false);
    

  const fetchRentals = useCallback(() => {
    const url = FMURL.RentalOverviews;
    setIsFetchingRentals(true);
    doFetch(
      "GET",
      url,
      json => setRentals(json),
      json => setPopupText(json.Message),
      message => {
        setPopupText(message);
        setRentals([]);
      },
      "",
      () => setIsFetchingRentals(false)
    );
  }, []);

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  function handleRentalClick(rental: RentalOverview) {
    setSetupIsActive(false);
    setCurrentRental(rental);
    console.log(rental);
  }

    return(
        <div>
<Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Production Information</Table.HeaderCell>
            <Table.HeaderCell>Purchase Status</Table.HeaderCell>
            <Table.HeaderCell>Setup Address Town</Table.HeaderCell>
            <Table.HeaderCell>Setup Address Street</Table.HeaderCell>
            <Table.HeaderCell>Setup Address Postal Code</Table.HeaderCell>
            <Table.HeaderCell>Estimated Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {rentals.map(function(rental, i) {
          return (
          <Table.Body key={i} onClick={() => handleRentalClick(rental)}>
          <Table.Row>
            <Table.Cell>{rental.productionInformation}</Table.Cell>
            <Table.Cell>{rental.purchaseStatus}</Table.Cell>
            <Table.Cell>{rental.setupAddressTown}</Table.Cell>
            <Table.Cell>{rental.setupAddressStreet}</Table.Cell>
            <Table.Cell>{rental.setupAddressPostalCode}</Table.Cell>
            <Table.Cell>{rental.estimatedPrice}</Table.Cell>
          </Table.Row>
        </Table.Body>)
        } )}
      </Table>
      <RentalOverviewInformation
        currentRental={currentRental}
        fetchRentals={fetchRentals}
        onNewCurrentRental={setCurrentRental}
        onSetupStateChange={setSetupIsActive}
        setupIsActive={setupIsActive}
      />
        </div>
    )
}