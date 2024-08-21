import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CircularProgress } from '@mui/material';

import { withCookies } from 'react-cookie';
import axios from 'axios';

import { CookieProps } from '../types/cookieProrsType';

import {
  START_FETCH,
  FETCH_SUCCESS,
  ERROR_CATCHED,
  INPUT_EDIT,
  TOGGLE_MODE,
} from "../types/actionTypes";


interface CredentialsLog {
    email: string;
    password: string;
}

interface LoginState {
    isLoading: boolean;
    isLoginView: boolean;
    error: string;
    credentialsLog: CredentialsLog;
}

const initialState: LoginState = {
    isLoading: false,
    isLoginView: true,
    error: '',
    credentialsLog: {
        email: '',
        password: ''
    },
};

type LoginAction =
    | { type: typeof START_FETCH }
    | { type: typeof FETCH_SUCCESS}
    | { type: typeof ERROR_CATCHED }
    | { type: typeof INPUT_EDIT; inputName: string; payload: String;}
    | { type: typeof TOGGLE_MODE };


const loginReducer = (state: LoginState, action: LoginAction): LoginState => {
    switch (action.type) {
        case START_FETCH: {
          return {
            ...state,
            isLoading: true,
          };
        }
        case FETCH_SUCCESS: {
          return {
            ...state,
            isLoading: false,
          };
        }
        case ERROR_CATCHED: {
          return {
            ...state,
            error: "Email or password is not correct !",
            isLoading: false,
          };
        }
        case INPUT_EDIT: {
          return {
            ...state,
            credentialsLog: {
              ...state.credentialsLog,
              [action.inputName]: action.payload,
            },
            error: "",
          };
        }
        case TOGGLE_MODE: {
          return {
            ...state,
            isLoginView: !state.isLoginView,
          };
        }
        default:
          return state;
    }
};

const SignUp: React.FC<CookieProps>  = (props) => {

  const [state, dispatch] = React.useReducer(loginReducer, initialState);

  const register = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        dispatch({type: START_FETCH});
        await axios.post(`http://127.0.0.1:8000/api/create/`, state.credentialsLog, {
            headers: { 'Content-Type': 'application/json' }
        });
        const res = await axios.post(`http://127.0.0.1:8000/authen/jwt/create/`, state.credentialsLog, {
            headers: { 'Content-Type': 'application/json' }
        });
        props.cookies.set('jwt-token', res.data.access);
        res.data.access ? window.location.href = '/youtube' : window.location.href = '/';
    } catch {
        dispatch({type: ERROR_CATCHED});
    }
  };

    const inputChangedlog = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = event.target.name as keyof CredentialsLog;
        const value = event.target.value;

        dispatch({
            type: INPUT_EDIT,
            inputName: name,
            payload: value,
        });
    };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {state.isLoading && <CircularProgress />}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={register} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={state.credentialsLog.email}
              onChange={inputChangedlog}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={state.credentialsLog.password}
              onChange={inputChangedlog}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            
            { !state.credentialsLog.email || !state.credentialsLog.password ?
                <Button
                    disabled
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Register
                </Button>
                :
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Register
                </Button>
            }

            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default withCookies(SignUp)