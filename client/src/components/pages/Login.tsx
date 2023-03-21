import { Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  form: {
    minWidth: 250,
    maxWidth: 350,
    heigth: 400,
  },
}))

interface User {
  username: string
  password: string
}

const Login = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const logIn = async () => {
    try {
      const user: User = {
        username: username,
        password: password,
      }
      if (username === '' || password === '') {
        enqueueSnackbar('Empty fields', {
          variant: 'error',
        })
        return
      }
      const { data } = await axios.post('/api/userByLogin', user, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      if (data) {
        const token: any = jwtDecode(data)
        localStorage.setItem('user', token.data.username)
        enqueueSnackbar('Login successfuly', {
          variant: 'success',
        })
        navigate('/projects', { replace: true })
      } else {
        enqueueSnackbar('Username/Password incorrect', {
          variant: 'error',
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const create = async () => {
    try {
      const user = {
        username: 'administrator',
        password: 'admin1234',
      }
      const { data } = await axios.post('/api/createUser', user, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      console.log('Result create:', data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Stack
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <div className={classes.form}>
        <Stack
          width="100%"
          height={100}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5">Login</Typography>
          <Divider color="blue" sx={{ height: 2, width: '50%' }} />
        </Stack>
        <Stack
          width="100%"
          height={300}
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <TextField
            label="Username"
            variant="filled"
            type="text"
            autoFocus
            fullWidth
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            variant="filled"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button variant="contained" color="primary" onClick={logIn}>
            Sign in
          </Button>
          <Button variant="contained" color="primary" onClick={create} disabled>
            Create
          </Button>
        </Stack>
      </div>
    </Stack>
  )
}
export default Login
