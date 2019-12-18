import React, { useState, useCallback, useEffect } from "react";
import { Table, Icon } from "semantic-ui-react";
import { FMURL } from "../lib/definitions/enums";
import { doFetch } from "../lib/functions/general_funcs";
import { Production } from "../lib/definitions/types";
import { Link } from "react-router-dom";

import { ProductionInformation } from "../pages/ProductionInformation";

export const ProductionInformations: React.FC = () => {
  
  const [currentProduction, setCurrentProduction] = useState<Production>();
  const [productions, setProductions] = useState<Production[]>([]);
  const [isFetchingProductions,setIsFetchingProductions] = useState<boolean>(false);
  const [popupText, setPopupText] = useState("");

  
  const [setupIsActive, setSetupIsActive] = useState(false);

  const fetchProductions = useCallback(() => {
    const url = FMURL.Production;
    setIsFetchingProductions(true);
    doFetch(
      "GET",
      url,
      json => setProductions(json),
      json => setPopupText(json.Message),
      message => {
        setPopupText(message);
        setProductions([]);
      },
      "",
      () => setIsFetchingProductions(false)
    );
  }, []);

  useEffect(() => {
    fetchProductions();
  }, [fetchProductions]);


  function handleProductionClick(production: Production) {
    setSetupIsActive(false);
    setCurrentProduction(production);
    console.log(production);
  }
  return (
    <div>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>exteriorWalls</Table.HeaderCell>
            <Table.HeaderCell>ventilation</Table.HeaderCell>
            <Table.HeaderCell>productionPrice</Table.HeaderCell>
            <Table.HeaderCell>productionDate</Table.HeaderCell>
            <Table.HeaderCell>additionalCosts</Table.HeaderCell>
            <Table.HeaderCell>lastUpdatedBy</Table.HeaderCell>
            <Table.HeaderCell>lastUpdatedDate</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {productions.map(function(production, i) { return (
          <Table.Body
          onClick={() => handleProductionClick(production)} key={i}>
            <Table.Row>
              <Table.Cell>
                <Link
                  style={{
                    textDecoration: "inherit",
                    color: "inherit",
                    fontSize: 14
                  }}
                  to={"/customers"}
                >
                  {production.customer.companyName}
                  <Icon name="arrow alternate circle right"></Icon>
                </Link>
              </Table.Cell>
              <Table.Cell>{production.exteriorWalls}</Table.Cell>
              <Table.Cell>{production.ventilation}</Table.Cell>
              <Table.Cell>{production.productionPrice}</Table.Cell>
              <Table.Cell>{production.productionDate}</Table.Cell>
              <Table.Cell>{production.additionalCosts}</Table.Cell>
              <Table.Cell>{production.lastUpdatedBy}</Table.Cell>
              <Table.Cell>{production.lastUpdatedDate}</Table.Cell>
            </Table.Row>
          </Table.Body>
        )} )}
      </Table>
      <ProductionInformation
        currentProduction={currentProduction}
        fetchProductions={fetchProductions}
        onNewCurrentProduction={setCurrentProduction}
        onSetupStateChange={setSetupIsActive}
        setupIsActive={setupIsActive}
      />
    </div>
  );
};
