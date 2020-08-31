import { AppActionTypes } from '../types';

export type AppState = {
  isSidePanelOpen: boolean;
  isModalVisible: boolean;
};

export function appReducer(state: AppState, action: AppActionTypes): AppState {
  switch (action) {
    case 'togglesidepanel': {
      return { ...state, isSidePanelOpen: !state.isSidePanelOpen };
    }
    case 'togglemodal': {
      return { ...state, isModalVisible: !state.isModalVisible };
    }
    default: {
      return state;
    }
  }
}
