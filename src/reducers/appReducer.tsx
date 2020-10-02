export type AppState = {
  searchInput: string;
  isSidePanelOpen: boolean;
  isModalVisible: boolean;
};

export type AppActions =
  | { type: 'searchterm'; payload: string }
  | { type: 'togglemodal' }
  | { type: 'togglesidepanel' };

export function appReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case 'searchterm': {
      return { ...state, searchInput: action.payload };
    }
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
