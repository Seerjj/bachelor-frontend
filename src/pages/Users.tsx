import React, { useEffect, useState, useReducer, useCallback } from "react";
import { User } from "../lib/definitions/types";
import { FMURL } from "../lib/definitions/enums";
import { doFetch } from "../lib/functions/general_funcs";
import { Table, Dropdown, Select, Icon } from "semantic-ui-react";
import { Field } from "react-final-form";

export const Users: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>();

  const [users, setUsers] = useState<User[]>([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState<boolean>(false);
  const [popupText, setPopupText] = useState("");

  const [setupIsActive, setSetupIsActive] = useState(false);

  const fetchUsers = useCallback(() => {
    const url = FMURL.Users;
    setIsFetchingUsers(true);
    doFetch(
      "GET",
      url,
      json => setUsers(json),
      json => setPopupText(json.Message),
      message => {
        setPopupText(message);
        setUsers([]);
      },
      "",
      () => setIsFetchingUsers(false)
    );
  }, []);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  return (
    <div>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {users.map(function(user,i) {
          return (
            <Table.Body key={i}>
              <Table.Row>
                <Table.Cell>{user.userName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <Select
                    placeholder="Select role"
                    selection
                    options={users.map(function(user,i) {
                      return (
                        <option value={user.roles[0]}>{user.roles[0]}</option>
                      )
                    } )}
                  ></Select>
                  <Icon size="large" name="save"></Icon>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          )
        } )}
      </Table>
    </div>
  );
};
