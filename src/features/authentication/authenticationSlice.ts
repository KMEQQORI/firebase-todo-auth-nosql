import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { RootState } from "../../app/store";
import { auth, provider } from "../../firebase/firebaseConfig";

export interface AuthenticationState {
  user?: User | null;
  status: "idle" | "pending" | "failed";
}

export const registerUserWithEmailAndPassword = createAsyncThunk(
  "authentication/registerUserWithEmailAndPassword",
  async ({ email, password }: { email: string; password: string }) => {
    const userCredentiels = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentiels;
  }
);

export const loginUserWithEmailAndPassword = createAsyncThunk(
  "authentication/loginUserWithEmailAndPassword",
  async ({ email, password }: { email: string; password: string }) => {
    const userCredentiels = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentiels;
  }
);

export const loginUserWithGoogle = createAsyncThunk(
  "authentication/loginUserWithGoogle",
  async () => {
    const result = await signInWithPopup(auth, provider);
    return result;
  }
);

export const logoutUser = createAsyncThunk(
  "authentication/logoutUser",
  async () => {
    await signOut(auth);
  }
);

const initialState: AuthenticationState = {
  user: null,
  status: "idle",
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthenticationUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    resetAuthenticationUser: (state) => {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserWithEmailAndPassword.pending, (state) => {
        state.status = "pending";
      })
      .addCase(registerUserWithEmailAndPassword.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
      })
      .addCase(registerUserWithEmailAndPassword.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(loginUserWithEmailAndPassword.pending, (state) => {
        state.status = "pending";
      })
      .addCase(loginUserWithEmailAndPassword.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
      })
      .addCase(loginUserWithEmailAndPassword.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(loginUserWithGoogle.pending, (state) => {
        state.status = "pending";
      })
      .addCase(loginUserWithGoogle.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
      })
      .addCase(loginUserWithGoogle.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setAuthenticationUser, resetAuthenticationUser } =
  authenticationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.authentication?.user;

export const selectUserEmail = (state: RootState) =>
  state.authentication?.user?.email;

export default authenticationSlice.reducer;
