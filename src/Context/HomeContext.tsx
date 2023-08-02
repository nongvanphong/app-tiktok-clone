import {createContext, useState} from 'react';

type homeContextType = {
  ishowcmt?: boolean;
  setIsCmtShown?: (value: boolean) => void;
  VideoID?: number;
  setVideoID?: (value: number) => void;
  myId?: number;
  setMyId?: (value: number) => void;
};

const HomeContext = createContext<homeContextType>({});

export default HomeContext;
