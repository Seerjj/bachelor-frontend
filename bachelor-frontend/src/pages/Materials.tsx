import React, { useState, useCallback, useEffect } from 'react'
import { Table } from 'semantic-ui-react'
import {  Materials } from '../lib/definitions/types';
import { FMURL } from '../lib/definitions/enums';
import { doFetch } from '../lib/functions/general_funcs';

export const Material: React.FC = () => {

  const [materials, setMaterials] = useState<Materials[]>([]);
  const [isFetchingMaterials, setIsFetchingMaterials] = useState<boolean>(false);
  const [popupText, setPopupText] = useState("");

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


    return (
      <div id="tableContainer">
        
      </div>
    );
  };
  
  