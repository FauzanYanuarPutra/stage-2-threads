import { Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../../services/apiService";
import { useDispatch } from "react-redux";
import { userFetched } from "../../../store/slice/authSlice";

function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState({
    message: ''
  })



  const handleLogin = () => {
    axios.post('http://localhost:5000/api/v1/auth/login', user).then((res) => {
      localStorage.setItem('token', res.data.token)
      console.log(res.status)
      if (res.status === 401) {
        setError({
          message: res.data.message
        })
      }
      navigate('/')
      dispatch(userFetched(getUser(res.data.user.id)))
    }).catch((err) => {
      setError({
        message: err.response.data.message
      })
    })
  }

  return (
    <>
    <Flex direction="column" alignItems="center" my={'50px'}>
      <form onSubmitCapture={handleLogin} style={{ width: '100%', maxWidth: '500px' }} onSubmit={(e) => e.preventDefault()}>
        <Text fontSize="3xl" fontWeight={'semibold'} color={'#04A51E'}>Circle</Text>
        <Text fontSize="2xl" fontWeight={'semibold'} mb={2}>Login to Circle</Text>
          <Flex direction="column" gap={3}>
          <Input placeholder="Email *" py={4} px={3} bg={'transparent'} border={'2px solid #262626'} rounded={'10px'} onChange={(e) => setUser({...user, email: e.target.value})} required></Input>
          <Input placeholder="Password *" py={4} px={3} bg={'transparent'} border={'2px solid #262626'} rounded={'10px'} onChange={(e) => setUser({...user, password: e.target.value})} required></Input>
          <Text textAlign={'right'}>Forgot password?</Text>
          <Button type="submit" p={2} bg={'#04A51E'} color={'white'} borderRadius={'10px'} w={"100%"} >Login</Button>
          {error.message && <Text color={'red'}>{error.message}</Text>}
            
          <Flex  alignItems={'center'} gap={2}>
            <Text >Don't have an account yet? </Text>
            <Link to={'/register'}  style={{ color: '#04A51E' }}>Create account</Link>
            </Flex>
        </Flex>
      </form>
    </Flex>
    </>
  )
}

export default LoginPage

