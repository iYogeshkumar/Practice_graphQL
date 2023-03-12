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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ADD_LOGIN_EMPLOYEE } from './Mutations/loginMutation';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [formData, setformData] = React.useState({});
  const [addlogin, { data, loading, error }] = useMutation(ADD_LOGIN_EMPLOYEE)

  const handleChange=(e)=>{
    setformData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  const handleLogin = (event) => {
    event.preventDefault();
    // console.log(formData)
    addlogin({
      variables:{
        new:formData,
      }
    });
    
    navigate("/employeeform")

    
  };
  if (loading) return <h1>Loading</h1>;
  return (
   
    <Box
    width={{ base: "90%", sm: "90%", md: "30%", lg: "30%" }}
        margin="auto"
        margin-top="200px"
        padding="30px"
        borderRadius="20px"
        textAlign="center"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
    
    >
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form action="" onSubmit={handleLogin}>
          <Box  noValidate sx={{ mt: 1 }}>
            <TextField
            onChange={handleChange}
            type="email"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
            onChange={handleChange}
            type="password"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
          </form>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </Box>
  );
}