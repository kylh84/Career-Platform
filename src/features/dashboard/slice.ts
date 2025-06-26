import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CheckoutData {
  amount: number;
  orderId: string;
  qrCode: string;
  expiryTime: number;
}

interface DashboardState {
  checkoutData: CheckoutData | null;
}

const initialState: DashboardState = {
  checkoutData: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setCheckoutData(state, action: PayloadAction<CheckoutData | null>) {
      state.checkoutData = action.payload;
    },
  },
});

export const { setCheckoutData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
