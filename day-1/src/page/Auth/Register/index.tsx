import { Link, defer,  useNavigate } from "react-router-dom";
import { checkToken, getThread, getUser } from "../../../services/apiService";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userFetched } from "../../../store/slice/authSlice";
import useToast from "../../../hooks/useToast";

export const publicData = async () => {
  const thread = await getThread();
  // const dataUser = await allUser();
  const token = await checkToken();
  let user: any = null

  if(token && token.user) {
    user = await getUser(token.user.id);
  }

  if (token && token.user && user) {
    window.location.href = '/'
  }


  return defer({ thread, user, token });
};


function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

  const [userData, setUser] = useState({
    username: '',
    email: '',
    password: ''
  })


  
  const handleRegister = (e: any) => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/v1/auth/register', userData).then((res) => {
      localStorage.setItem('token', res.data.token)
      navigate('/')
      dispatch(userFetched(getUser(res.data.user.id)))
      toast("Success", "Register Success", "success");

    })
  }

  return (
    <>
      <Flex direction="column" alignItems="center" my={'50px'}>
        <form style={{ width: '100%', maxWidth: '500px' }} onSubmitCapture={handleRegister}>
          <Text fontSize="3xl" fontWeight={'semibold'} color={'#04A51E'}>Circle</Text>
          <Text fontSize="2xl" fontWeight={'semibold'} mb={2}>Create account Circle</Text>
          <Flex direction="column" gap={3}>
            <Input type="text" placeholder="Full Name *" py={4} px={3} bg={'transparent'} border={'2px solid #262626'} rounded={'10px'} onChange={(e) => setUser({...userData, username: e.target.value})}></Input>
            <Input type="email" placeholder="Email *" py={4} px={3} bg={'transparent'} border={'2px solid #262626'} rounded={'10px'} onChange={(e) => setUser({...userData, email: e.target.value})}></Input>
            <Input type="password" placeholder="Password *" py={4} px={3} bg={'transparent'} border={'2px solid #262626'} rounded={'10px'} onChange={(e) => setUser({...userData, password: e.target.value})}></Input>
            <Button type="submit" p={2} bg={'#04A51E'} color={'white'} borderRadius={'10px'} w={"100%"} >Create</Button>
            <Flex  alignItems={'center'} gap={2}>
              <Text >Already have an account? </Text>
              <Link to={'/login'}  style={{ color: '#04A51E' }}>Login</Link>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </>
  )
}

export default RegisterPage

