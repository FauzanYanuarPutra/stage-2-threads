import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { LiaUserSolid } from "react-icons/lia";
import { TbUserSearch } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../store/slice/authSlice";

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <Box position={'sticky'} h={'100vh'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} top={0} left={0} bottom={0} p={4} px={5}>
      <Box display={'flex'} flexDirection={'column'} gap={4}>
        <Text color={'#04A51E'} fontSize={'4xl'} bg={'semibold'}>
          circle
        </Text>
        <Flex gap={4} flexDirection={'column'}>
          <Link
            href={'/'}
            display={'flex'}
            alignItems={'center'}
            borderRadius={'10px'}
            py={'6px'}
            px={'5px'}
            gap={2}
            // color={location.pathname === '/' ? 'red' : ''}
            bg={location.pathname === '/' ? '#262626' : ''}
            _hover={{ backgroundColor: '#262626' }}
          >
            <FaHome size={20} />
            <Text>Home</Text>
          </Link>
          <Link
            href={'/search'}
            display={'flex'}
            alignItems={'center'}
            borderRadius={'10px'}
            py={'6px'}
            px={'5px'}
            gap={2}
            // color={location.pathname === '/search' ? 'red' : ''}
            bg={location.pathname === '/search' ? '#262626' : ''}
            _hover={{ backgroundColor: '#262626' }}
          >
            <TbUserSearch size={20} />
            <Text>Search</Text>
          </Link>
          <Link
            href={'/follows'}
            display={'flex'}
            alignItems={'center'}
            borderRadius={'10px'}
            py={'6px'}
            px={'5px'}
            gap={2}
            // color={location.pathname === '/follows' ? 'red' : ''}
            bg={location.pathname === '/follows' ? '#262626' : ''}
            _hover={{ backgroundColor: '#262626' }}
          >
            <AiOutlineHeart size={20} />
            <Text>Follows</Text>
          </Link>
          <Link
            href={'/profile'}
            display={'flex'}
            alignItems={'center'}
            borderRadius={'10px'}
            py={'6px'}
            px={'5px'}
            gap={2}
            // color={location.pathname === '/profile' ? 'red' : ''}
            bg={location.pathname === '/profile' ? '#262626' : ''}
            _hover={{ backgroundColor: '#262626' }}
          >
            <LiaUserSolid size={20} />
            <Text>Profile</Text>
          </Link>
        </Flex>
        <Button size='md' padding={'10px'} width='100%' backgroundColor={"#04A51E"} color={'white'} borderRadius={'full'}>
          Button
        </Button>
      </Box>
      <Box display={'flex'} alignItems={'center'} gap={2} onClick={handleLogout}>
        <BiLogOut size={20} />
        Logout
      </Box>
    </Box>
  );
}
