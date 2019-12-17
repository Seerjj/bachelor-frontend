import * as React from "react";
import { Form, Input, TextArea, Select, Button } from "semantic-ui-react";

const houseTypeOptions = [
  { key: "1", text: "Type 1", value: "type 1" },
  { key: "2", text: "Type 2", value: "type 2" },
  { key: "3", text: "Type 3", value: "type 3" },
  { key: "4", text: "Type 4", value: "type 4" },
  { key: "5", text: "Type 5", value: "type 5" },
  { key: "6", text: "Type 6", value: "type 6" },
  { key: "7", text: "Type 7", value: "type 7" }
];

const AddHousesForm: React.FC = () => {
  return (
    <div>
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            id="form-input-houses-id"
            control={Input}
            label="ID"
            placeholder="ID"
          />
          <Form.Field
            control={Select}
            options={houseTypeOptions}
            label={{
              children: "Type",
              htmlFor: "form-select-houses-type"
            }}
            placeholder="Type"
            search
            searchInput={{ id: "form-select-houses-type" }}
          />
          <Form.Field
            id="form-input-houses-sqm"
            control={Input}
            label="Square Meters"
            placeholder="Square Meters"
          />
        </Form.Group>
        <Form.Field
          id="form-button-control-public"
          control={Button}
          content="Add"
        />
      </Form>
    </div>
  );
};

export default AddHousesForm;
