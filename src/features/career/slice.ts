import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CodeState {
  currentCode: string | null;
  currentFile: File | null;
  analysis: {
    issues?: Array<{
      type: string;
      message: string;
      line: number;
    }>;
    score?: number;
    suggestions?: Array<{
      type: string;
      text: string;
      priority: string;
    }>;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: CodeState = {
  currentCode: null,
  currentFile: null,
  analysis: null,
  loading: false,
  error: null,
};

const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    analyzeCode: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
      state.currentCode = action.payload;
    },
    analyzeCodeSuccess: (state, action: PayloadAction<CodeState['analysis']>) => {
      state.loading = false;
      state.analysis = action.payload;
    },
    analyzeCodeFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    uploadFile: (state, action: PayloadAction<File>) => {
      state.loading = true;
      state.error = null;
      state.currentFile = action.payload;
    },
    formatCode: (state) => {
      state.loading = true;
      state.error = null;
    },
    resetState: () => initialState,
  },
});

export const { analyzeCode, analyzeCodeSuccess, analyzeCodeFailure, uploadFile, formatCode, resetState } = codeSlice.actions;

export default codeSlice.reducer;
