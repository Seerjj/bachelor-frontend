import React from 'react'
import { Table } from 'semantic-ui-react'

const Production: React.FC = () => {
    return (
      <div>
        <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>House ID</Table.HeaderCell>
            <Table.HeaderCell>Exterior Walls</Table.HeaderCell>
            <Table.HeaderCell>Ventilation</Table.HeaderCell>
            <Table.HeaderCell>Production Price</Table.HeaderCell>
            <Table.HeaderCell>Production Date</Table.HeaderCell>
            <Table.HeaderCell>Additional Costs</Table.HeaderCell>
            <Table.HeaderCell>Full Price</Table.HeaderCell>
            <Table.HeaderCell>Last Updated</Table.HeaderCell>
            <Table.HeaderCell>Note</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Row textAlign='left'>
            <Table.Cell>1517</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>NONE</Table.Cell>
            <Table.Cell>32,000 DKK</Table.Cell>
            <Table.Cell>12/06/2017</Table.Cell>
            <Table.Cell>465.12 DKK</Table.Cell>
            <Table.Cell id="RedText">32,465.12 DKK</Table.Cell>
            <Table.Cell>12/06/2017</Table.Cell>
            <Table.Cell>Brand new flexmodul house</Table.Cell>
        </Table.Row>

        <Table.Row textAlign='left'>
            <Table.Cell>1819</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>YES</Table.Cell>
            <Table.Cell>38,540 DKK</Table.Cell>
            <Table.Cell>23/01/2019</Table.Cell>
            <Table.Cell>823.10 DKK</Table.Cell>
            <Table.Cell id="RedText">39,363.10 DKK</Table.Cell>
            <Table.Cell>16/09/2019</Table.Cell>
            <Table.Cell>Repaired ventilation</Table.Cell>
        </Table.Row>

        </Table>
      </div>
    );
  };
  
  export default Production;
  