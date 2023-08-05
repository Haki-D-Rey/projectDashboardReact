import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAppState {
  isVisibleMenu: boolean;
  isExtendedMenu: boolean;
  showVerificationEmail: boolean;
}

const initialState: IAppState = {
  isVisibleMenu: false,
  isExtendedMenu: false,
  showVerificationEmail: true,
};

export const counterSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toogleVisibleMenu: (state: IAppState) => {
      state.isVisibleMenu = !state.isVisibleMenu;
    },
    toogleExtendedMenu: (state: IAppState) => {
      state.isExtendedMenu = !state.isExtendedMenu;
    },
    setExtendMenuItemDown: (state: IAppState, action: PayloadAction<boolean>) => {
      state.isExtendedMenu = action.payload;
    },
    setShowVerificationEmail: (state: IAppState, action: PayloadAction<boolean>) => {
      state.showVerificationEmail = action.payload;
    },
  },
});

export const { toogleVisibleMenu, toogleExtendedMenu, setShowVerificationEmail, setExtendMenuItemDown } = counterSlice.actions;

export const getVisibleMenu = (state: RootState) => state.app.isVisibleMenu;
export const getExtendedMenu = (state: RootState) => state.app.isExtendedMenu;
export const getShowVerificationEmail = (state: RootState) => state.app.showVerificationEmail;

export default counterSlice.reducer;
