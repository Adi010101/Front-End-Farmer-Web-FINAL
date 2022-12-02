import axios from 'axios';
import React , {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
import {Container,
  FormHelperText,
  OutlinedInput,
} from '@mui/material'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import illustration from '../assets/login.png';
import { Image } from 'mui-image';
import { top100Films as data } from '../data/sampleData';

const theme = createTheme();

const classes = {
  registerbutton: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    backgroundColor: '#388E3C',
    borderRadius: 5,
    mt: 3, 
    mb: 2,
    "&:hover": {
      color: '#FFFF',
      backgroundColor: '#6FCF97',
      borderColor: '#FFFF',
    },
  },
  Header: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#388E3C',
  },
  SubHeader:{
    fontFamily: 'Poppins',
    color: '#6C6D6C',
  },
  TextField:{
    color: '#388E3C'
  },
  Text:{
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#388E3C',
    alignItems: 'center'
  },
  SubText:{
    fontFamily: 'Poppins',
    color: '#000000',
  },
  CustomTextField: {
    "& .MuiInputLabel-root": {color: '#5F5B5B'},//styles the label
    "& .MuiOutlinedInput-root": {
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
      '& label.Mui-focused': {
        color: 'grey',
      },
    }
  },
  CustomOutlineTextField: {
    marginTop: 2,
    "& .MuiOutlinedInput-root": {
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
      '& label.Mui-focused': {
        color: 'green',
      },
    }
  },
  Texts:{
    color: '#5F645F',
    fontFamily: 'Poppins',
  }
}

const Register = () => {

    /*const [firstname, setFirstname]=useState("")
    const [middlename, setMiddlename]=useState("")
    const [lastname, setLastname]=useState("")
    const [username, setUsername]=useState("")
    const [mobilephone, setPhone]=useState("")
    const [email, setEmail]=useState("")
    const [orgName, setOrgname]=useState("")
    const [password, setPassword]=useState("")
    const [verified, setVerified] = useState('false');
    const history = useNavigate();

    async function signUp()
    {
        let item={firstname, middlename, lastname, username, mobilephone, email, orgName, password, verified}
        console.warn(item)

        let result = await fetch("http://localhost:8000/api/register",
        {
            method: 'POST',
            body: JSON.stringify(item),
            headers:{
                "Content-Type": 'application/json',
                "Accept": 'application/json',
            }
        })
        
        result = await result.json()
        localStorage.setItem("user-info", JSON.stringify(result));
        history("/login-seller")
    }*/
    const history = useNavigate();
    const [userInput, setUser] = useState({
      firstname: '',
      middlename: '',
      lastname: '',
      username: '',
      email: '',
      mobilephone: '',
      password: '',
      verified: 'false',
    });

    const options = data.map((option) => {
      const firstLetter = option.title[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
      };
    });

    const [proof, setProof] = useState([]);
    const [errorList, setError] = useState([]);

    const handleInput = (e) => {
      e.persist();
      setUser({...userInput, [e.target.name]:e.target.value});
    }

    const handleImage = (e) => {
      setProof({image:e.target.files[0]});
    }

    const signUp = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('image', proof.image);
      formData.append('firstname', userInput.firstname);
      formData.append('middlename', userInput.middlename);
      formData.append('lastname', userInput.lastname);
      formData.append('username', userInput.username);
      formData.append('email', userInput.email);
      formData.append('mobilephone', userInput.mobilephone);
      formData.append('password', userInput.password);
      formData.append('verified', userInput.verified);

      axios.post(`http://localhost:8000/api/register`,formData,
      {headers: { "Content-Type": "multipart/form-data" },})
      .then(res=>{
        if(res.data.status === 200)
        {
            swal('Success', res.data.message,'success');
            setError([]);
            history('/seller/login');
        }
        else if(res.data.status === 422)
        {
            swal('All fields are required', 'error');
            setError(res.data.errors);
        }
      });
    }

    return (
      <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#4DA351',
            backgroundPosition: 'center',
          }}
        >
          <Container maxWidth="sm" sx={{alignItems: 'center',marginTop:15}}>
          <Image duration = {0} src={illustration} height= {'auto'} width= {'auto'}></Image>
          </Container>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography sx={classes.Header} component="h1" variant="h5">
              CREATE ACCOUNT
            </Typography>
            <Typography sx={classes.SubHeader} component="h1" variant="h6">
              Sign-up as a seller
            </Typography>
              <Box component="form" onSubmit={signUp} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  autoFocus
                  onChange={handleInput} 
                  value={userInput.firstname}
                  sx={classes.CustomTextField}
                >
                <small className='text-danger'>{errorList.firstname}</small>
                </TextField>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="middlename"
                  label="Middle Name"
                  name="middlename"
                  autoFocus
                  onChange={handleInput} 
                  value={userInput.middlename}
                  sx={classes.CustomTextField}
                >
                <small className='text-danger'>{errorList.middlename}</small>
                </TextField>
                <TextField
                  margin="normal"
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoFocus
                  onChange={handleInput} 
                  value={userInput.lastname}
                  sx={classes.CustomTextField}
                >
                <small className='text-danger'>{errorList.lastname}</small>
                </TextField>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                  onChange={handleInput} 
                  value={userInput.username}
                  sx={classes.CustomTextField}
                >
                <small className='text-danger'>{errorList.username}</small>
                </TextField>
                <OutlinedInput
                id="upload-script"
                type="file"
                fullWidth
                name='image'
                onChange={handleImage}
                sx={classes.CustomOutlineTextField}
                >
                <small className='text-danger'>{errorList.image}</small>
                </OutlinedInput>
                <Typography sx={classes.Texts}>Upload a photo of you holding your VALID ID.</Typography>
                <TextField
                  margin="normal"
                  fullWidth
                  onChange={handleInput} 
                  value={userInput.email}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  sx={classes.CustomTextField}
                >
                <small className='text-danger'>{errorList.email}</small>
                </TextField>
                <TextField
                  margin="normal"
                  fullWidth
                  onChange={handleInput} 
                  value={userInput.mobilephone}
                  id="mobilephone"
                  label="Phone Number"
                  name="mobilephone"
                  autoFocus
                  sx={classes.CustomTextField}
                >
                <small className='text-danger'>{errorList.mobilephone}</small>
                </TextField>
                <TextField
                  margin="normal"
                  fullWidth
                  onChange={handleInput} 
                  value={userInput.password}
                  id="password"
                  label="Password"
                  name="password"
                  type='password'
                  autoFocus
                  sx={classes.CustomTextField}
                >
                <small className='text-danger'>{errorList.password}</small>
                </TextField>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={classes.registerbutton}
                >
                  REGISTER
                </Button>
              </Box>
              <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
              >
                <Typography sx={classes.SubText}>
                Already have an account?
                <Link sx={classes.Text} href="/seller/login" variant="body1">
                          {" Login here"}
                        </Link>
                </Typography>
            </Box>
            </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
    );

}

export default Register;