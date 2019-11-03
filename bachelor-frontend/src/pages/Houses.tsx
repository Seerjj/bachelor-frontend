import React from "react";
import { Table } from "semantic-ui-react";

const Houses: React.FC = () => {
  return (
    <div>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>House Type</Table.HeaderCell>
            <Table.HeaderCell>Square Meters</Table.HeaderCell>
            <Table.HeaderCell>Rents</Table.HeaderCell>
            <Table.HeaderCell>Production Price</Table.HeaderCell>
            <Table.HeaderCell>Production Date</Table.HeaderCell>
            <Table.HeaderCell>Additional Costs</Table.HeaderCell>
            <Table.HeaderCell>Full Price</Table.HeaderCell>
            <Table.HeaderCell>Last Updated</Table.HeaderCell>
            <Table.HeaderCell>Note</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row textAlign="left">
            <Table.Cell> 'HOUSE TYPE HERE (1/2/3/4/5/6/7)' </Table.Cell>
            <Table.Cell>
              {" "}
              'SQ METERS (12m<sup> 2 </sup>)'{" "}
            </Table.Cell>
            <Table.Cell> 'LIST OF RENTED PLACES / CUSTOMERS' </Table.Cell>
            <Table.Cell> 'PRODUCTION PRICE OF THE HOUSE' </Table.Cell>
            <Table.Cell>
              {" "}
              'PRODUCTION DATE OF THE HOUSE (11.02.2017)'{" "}
            </Table.Cell>
            <Table.Cell>
              {" "}
              'ADDITIONAL COSTS (i.e. A FEATURE REQUEST)'{" "}
            </Table.Cell>
            <Table.Cell> 'FULL PRICE / FINAL' </Table.Cell>
            <Table.Cell> 'LAST MODIFIED HOUSE (31.01.2018)' </Table.Cell>
            <Table.Cell>
              {" "}
              'A NOTE FOR THE HOUSE BY THE EMPLOYEES (ANY INFORMATION REGARDING
              THE HOUSE THAT IS NOT SPECIFIED IN THE PREVIOUS FIELDS)'{" "}
            </Table.Cell>
          </Table.Row>

          <Table.Row textAlign="left">
            <Table.Cell> Type 5 </Table.Cell>
            <Table.Cell>13m<sup> 2 </sup>
            </Table.Cell>
            <Table.Cell>
              <ul>
                <li>VIA Univesity College</li>
              </ul>
            </Table.Cell>
            <Table.Cell> 130,000 DKK </Table.Cell>
            <Table.Cell> 07/07/2014 </Table.Cell>
            <Table.Cell> 2,380 DKK </Table.Cell>
            <Table.Cell> 132,380 DKK </Table.Cell>
            <Table.Cell>
              <ul>
                <li>17/05/2016</li>
                <li>28/08/2017</li>
                <li>4/10/2018</li>
              </ul>
            </Table.Cell>
            <Table.Cell>Aasf ncaoi lkajsca sgih ascoplk numes kavilar pos ramos kokos.</Table.Cell>
          </Table.Row>

          <Table.Row textAlign="left">
            <Table.Cell> Type 1 </Table.Cell>
            <Table.Cell>11m<sup> 2 </sup></Table.Cell>
            <Table.Cell>
              <ul>
                <li>Feljerg A/C</li>
                <li>Kombude AJ</li>
              </ul>
            </Table.Cell>
            <Table.Cell> 254,000 DKK </Table.Cell>
            <Table.Cell> 07/07/2014 </Table.Cell>
            <Table.Cell> 1,219 DKK </Table.Cell>
            <Table.Cell> 255,219 DKK </Table.Cell>
            <Table.Cell>
              <ul>
                <li>1/08/2017</li>
                <li>14/02/2019</li>
              </ul>
            </Table.Cell>
            <Table.Cell>Aasf ncaoi lkajsca sgih ascoplk numes kavilar pos ramos kokos.</Table.Cell>
          </Table.Row>


        </Table.Body>
      </Table>
    </div>
  );
};

export default Houses;
