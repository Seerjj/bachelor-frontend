import React from 'react'
import { Table } from 'semantic-ui-react'

const Materials: React.FC = () => {
    return (
      <div>
        <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Supplier</Table.HeaderCell>
            <Table.HeaderCell>Price Per Unit</Table.HeaderCell>
            <Table.HeaderCell>Units</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Row textAlign='left'>
            <Table.Cell>Wafertex 8 "</Table.Cell>
            <Table.Cell>PLATES</Table.Cell>
            <Table.Cell>NaN</Table.Cell>
            <Table.Cell>64.25 DKK</Table.Cell>
            <Table.Cell>m<sup>2</sup></Table.Cell>
        </Table.Row>

        <Table.Row textAlign='left'>
            <Table.Cell>25x125mm cedar clinker</Table.Cell>
            <Table.Cell>PLATES</Table.Cell>
            <Table.Cell>NaN</Table.Cell>
            <Table.Cell>250 DKK</Table.Cell>
            <Table.Cell>m<sup>2</sup></Table.Cell>
        </Table.Row>

        <Table.Row textAlign='left'>
            <Table.Cell>50mm insolation</Table.Cell>
            <Table.Cell>INSOLATION</Table.Cell>
            <Table.Cell>NaN</Table.Cell>
            <Table.Cell>9.25 DKK</Table.Cell>
            <Table.Cell>m<sup>2</sup></Table.Cell>
        </Table.Row>

        <Table.Row textAlign='left'>
            <Table.Cell>75mm insolation</Table.Cell>
            <Table.Cell>INSOLATION</Table.Cell>
            <Table.Cell>NaN</Table.Cell>
            <Table.Cell>13.90 DKK</Table.Cell>
            <Table.Cell>m<sup>2</sup></Table.Cell>
        </Table.Row>

        <Table.Row textAlign='left'>
            <Table.Cell>R 95 regler</Table.Cell>
            <Table.Cell>STEEL</Table.Cell>
            <Table.Cell>NaN</Table.Cell>
            <Table.Cell>11.15 DKK</Table.Cell>
            <Table.Cell>m</Table.Cell>
        </Table.Row>

        <Table.Row textAlign='left'>
            <Table.Cell>SKB Top and Bottom</Table.Cell>
            <Table.Cell>STEEL</Table.Cell>
            <Table.Cell>NaN</Table.Cell>
            <Table.Cell>14.20 DKK</Table.Cell>
            <Table.Cell>m</Table.Cell>
        </Table.Row>

        </Table>
      </div>
    );
  };
  
  export default Materials;
  