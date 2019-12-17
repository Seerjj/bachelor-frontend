import React, { useState, useCallback, useEffect } from "react";
import { Table } from "semantic-ui-react";
import { Material } from "../lib/definitions/types";
import { FMURL } from "../lib/definitions/enums";
import { doFetch } from "../lib/functions/general_funcs";
import { MaterialInformation } from "./MaterialInformation";

export const Materials: React.FC = () => {
  const [currentMaterial, setCurrentMaterial] = useState<Material>();

  const [materials, setMaterials] = useState<Material[]>([]);
  const [isFetchingMaterials, setIsFetchingMaterials] = useState<boolean>(
    false
  );
  const [popupText, setPopupText] = useState("");

  const [setupIsActive, setSetupIsActive] = useState(false);

  const fetchMaterials = useCallback(() => {
    const url = FMURL.Materials;
    setIsFetchingMaterials(true);
    doFetch(
      "GET",
      url,
      json => setMaterials(json),
      json => setPopupText(json.Message),
      message => {
        setPopupText(message);
        setMaterials([]);
      },
      "",
      () => setIsFetchingMaterials(false)
    );
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  function handleMaterialClick(material: Material) {
    setSetupIsActive(false);
    setCurrentMaterial(material);
    console.log(material);
  }
  return (
    <div>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>House Section</Table.HeaderCell>
            <Table.HeaderCell>Supplier</Table.HeaderCell>
            <Table.HeaderCell>Units</Table.HeaderCell>
            <Table.HeaderCell>Price Per Unit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {materials.map(material => (
          <Table.Body onClick={() => handleMaterialClick(material)}>
            <Table.Row>
              <Table.Cell>{material.name}</Table.Cell>
              <Table.Cell>{material.category}</Table.Cell>
              <Table.Cell>{material.houseSection}</Table.Cell>
              <Table.Cell>{material.supplier}</Table.Cell>
              <Table.Cell>{material.units}</Table.Cell>
              <Table.Cell>{material.pricePerUnit}</Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
      <MaterialInformation
        currentMaterial={currentMaterial}
        fetchMaterials={fetchMaterials}
        onNewCurrentMaterial={setCurrentMaterial}
        onSetupStateChange={setSetupIsActive}
        setupIsActive={setupIsActive}
      />
    </div>
  );
};
