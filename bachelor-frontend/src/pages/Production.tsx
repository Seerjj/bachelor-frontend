import React, { useState, useCallback, useEffect } from 'react'
import { Table } from 'semantic-ui-react'
import { FMURL } from '../lib/definitions/enums';
import { doFetch } from '../lib/functions/general_funcs';
import { Production } from '../lib/definitions/types';

 export const ProductionInformation: React.FC = () => {
  
  const [productionInformation, setProductionInformation] = useState<Production[]>([]);
  const [isFetchingProductionInformation, setIsFetchingProductionInformation] = useState<boolean>(false);
  const [popupText, setPopupText] = useState("");


  const fetchProductionInformation = useCallback(() => {
    const url = FMURL.Production;
    setIsFetchingProductionInformation(true);
    doFetch(
      "GET",
      url,
      json => setProductionInformation(json), 
      json => setPopupText(json.Message),
      message => {
        setPopupText(message); 
        setProductionInformation([]);
      },
      "",
      () => setIsFetchingProductionInformation(false)
    );
  }, []);

  useEffect(() => {
    fetchProductionInformation();
  }, [fetchProductionInformation]);

    return (
      <div id="tableContainer">
       
      </div>
    );
  };