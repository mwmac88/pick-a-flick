import React, { createContext, useReducer } from 'react';
import { AppState, appReducer } from '../reducers/appReducer';
import { AppActionTypes } from '../types';

type Dispatch = (action: AppActionTypes) => void;

const defaultAppStatus = {
  isSidePanelOpen: false,
  isModalVisible: false,
};

const AppStateContext = createContext<AppState | undefined>(undefined);
const AppDispatchContext = createContext<Dispatch | undefined>(undefined);

function AppProvider({ children }: any) {
  const [state, dispatch] = useReducer(appReducer, defaultAppStatus);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider');
  }

  return context;
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider');
  }

  return context;
}

export { AppProvider, useAppState, useAppDispatch };
