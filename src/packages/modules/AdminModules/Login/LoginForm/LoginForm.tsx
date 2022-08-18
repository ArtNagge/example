import { ChangeEvent, useState, VFC } from 'react'

import { fetchAuthLogin } from '@store/auth'
import { useAppDispatch } from '@store/store'

import Button from '@components/Button'
import Input from '@components/Input'
import Typography from '@components/Typography'

import { AuthDto } from '@services/auth/types'

import styles from './login-form.module.scss'

const LoginForm: VFC = () => {
  const dispatch = useAppDispatch()
  const [auth, setAuth] = useState<AuthDto>({
    login: '',
    password: '',
  })

  const handleAuthData = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e

    setAuth((prevAuth) => ({ ...prevAuth, [name]: value }))
  }

  const handleAuth = (evt: React.FormEvent) => {
    evt.preventDefault()

    dispatch(fetchAuthLogin(auth))
  }

  return (
    <div className={styles.login}>
      <form className={styles.login_form} onSubmit={handleAuth}>
        <Typography
          className={styles.login_head}
          component="h1"
          color="label-secondary">
          Login form
        </Typography>
        <Input
          label="Login"
          name="login"
          placeholder="Enter login"
          onChange={handleAuthData}
          value={auth.login}
        />
        <Input
          label="Password"
          name="password"
          placeholder="Enter password"
          onChange={handleAuthData}
          value={auth.password}
          type="password"
        />
        <Button type="submit">Sign in</Button>
      </form>
    </div>
  )
}

export default LoginForm
