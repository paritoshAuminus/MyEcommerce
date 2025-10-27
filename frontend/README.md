## SOME IMPORTANT PIECES OF CODE

- User registration

``` 
 useEffect(() => {
    const registerUser = async () => {
      const response = await authService.signup({
        name: 'Champa',
        email: 'champa@gmail.com',
        password: 'somepassword'
      })
      console.log(response)
    }
    registerUser()
  }, [])
```

- User login

```
  useEffect(() => {
    const fetchLogin = async() => {
      const response = await authService.login({
        email: 'champa@gmail.com',
        password: 'somepassword'
      })
      console.log(response)
    }
    fetchLogin()
  }, [])
```

- get logged-in user

```
  useEffect(() => {
    const token = localStorage.getItem('ecommerceToken')
    console.log(token)
    const fetchUser = async () => {
      const response = await authService.getUser({
        token: token
      })
      console.log(response)
    }
    fetchUser()
  }, [])
```