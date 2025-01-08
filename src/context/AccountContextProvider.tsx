import React, { createContext, useEffect, useState } from 'react';
import { PwdArray } from '../types/pwdTypes';
import { ParamsInterface } from '../types/mainProcessTypes';
import { accountService } from '../services/account.service';

interface AccountContextInterface {
  passwordList: PwdArray,
  setPasswordList: (newPwdArray: PwdArray) => void,
  changedSinceLastUpdate: boolean,
  setLastFetchedList: (pwdArray: PwdArray) => void,
  fileParams: ParamsInterface,
  setFileParams: (params: ParamsInterface) => void
}

export const AccountContext = createContext<AccountContextInterface>(null);

export default function AccountContextProvider ({ children }: { children: React.ReactNode }) {

  // Password States
  const [passwordList, setPasswordList] = useState<PwdArray>([]);
  const [lastFetchedList, setLastFetchedList] = useState<PwdArray>([]);

  // Fetch Data
  async function fetchPwdData(){
    return await window.electronAPI.getUserPwdData(accountService.getToken());
  }

  useEffect(() => {
    try{
      fetchPwdData().then(fetchedData => {
        if(fetchedData !== null){
          setPasswordList(fetchedData);
          setLastFetchedList(fetchedData);
          setChangedSinceLastUpdate(false);
        }
      });
    }catch(err){
      console.log(`Error in Password Fetching Context: ${err.name} - ${err.message}`);
    }
  }, []);

  // Check if change have been made since last data fetch / save
  const [changedSinceLastUpdate, setChangedSinceLastUpdate] = useState<boolean>(false);
  
  const objectsAreEqual = (o1: object, o2: object): boolean => Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every(p => o1[p as keyof typeof o1] === o2[p as keyof typeof o2]);
  const arrayOfObjAreEqual = (arr1 : Array<object>, arr2: Array<object>): boolean => arr1.length === arr2.length && arr1.every((o, index) => objectsAreEqual(o, arr2[index]));

  useEffect(() => {
    arrayOfObjAreEqual(passwordList, lastFetchedList)? setChangedSinceLastUpdate(false) : setChangedSinceLastUpdate(true)
  }, [passwordList, lastFetchedList]);
  
  // Fetch Params
  const [fileParams, setFileParams] = useState<ParamsInterface>({ // DEFAULT_PARAMS
      length: 20,
      selectedSet: {
          setNumber: true,
          setUppercase: true,
          setLowercase: true,
          setMinus: false,
          setUnderline: false,
          setSpecial: false,
          setBrackets: false,
      }
  });

  async function fetchFileParams(){
    return await window.electronAPI.getFileParams(accountService.getToken());
  }

  useEffect(() => {
    try{
      fetchFileParams().then((fetchedParams) => {
        if(fetchedParams !== null){
          if(!(Object.keys(fetchedParams).length === 0 && fetchedParams.constructor === Object)){
            setFileParams(fetchedParams);
          }
        }
      })
    }catch(err){
      console.log(`Error in Params Fetching Context: ${err.name} - ${err.message}`);
    }
  }, []);

  return (
    <AccountContext.Provider value={{ passwordList, setPasswordList, changedSinceLastUpdate, setLastFetchedList, fileParams, setFileParams }}>
      { children }
    </AccountContext.Provider>
  )
}