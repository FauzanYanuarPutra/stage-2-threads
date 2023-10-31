import { Box, Button, Flex, Image, Text } from "@chakra-ui/react"
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai"
import { FaCircle, FaFacebook, FaGithub } from "react-icons/fa"
import SuggestedFollow from "../SuggestedFollow"
import { useLoaderData } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { userFetched } from "../../store/slice/authSlice"

export const MyProfile = () => {
  const { user }: any = useLoaderData();
  const data = useSelector((state: any) => state.auth);
  const dispatch = useDispatch()

  if (data.user.id === undefined) {
    dispatch(userFetched(user))
  } else {
    dispatch(userFetched(data.user))
  }

  return (
    <Box position={'sticky'} h={'100vh'} display={'flex'} flexDirection={'column'} top={0} left={0} bottom={0} p={4} px={5} gap={3}>
      <Box backgroundColor={'#262626'} color={'white'} borderRadius={'10px'} p={4} >
        <Text fontWeight={'bold'} fontSize={'md'}>My Profile</Text>
        <Box position={'relative'} mb={'40px'} mt={'10px'}>
          <Image src={'https://source.unsplash.com/random/500x500'} alt="" w={'full'} h={'50px'} objectFit={'cover'} borderRadius={'5px'} />
          <Image src={'https://source.unsplash.com/random/1000x1000'} alt="" w={'60px'} objectFit={'cover'} borderRadius={'full'} position={'absolute'} bottom={'-30px'} left={'10px'} />
          <Button border={'1px solid white'} fontSize={'10px'} px={'15px'} fontWeight={'semibold'} textAlign={'center'} color={'white'} borderRadius={'full'} position={'absolute'} bottom={'-30px'} right={'10px'} >Edit Profile</Button>
        </Box>
        <Text fontSize={'xl'} fontWeight={'bold'}>{data.user.full_name}</Text>
        <Box fontSize={'xs'}>
          <Text color={"#797979"}>@{  data.user.username }</Text>
          <Text>picked over by the community</Text>
          <Flex gap={2}>
            <Flex gap={1}>
              <Text>{data.user.following && data.user.following.length}</Text>
              <Text color={'#797979'}>Following</Text>
            </Flex>
            <Flex gap={1}>
              <Text>{data.user.following && data.user.followers.length}</Text>
              <Text color={'#797979'}>Followers</Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
      <SuggestedFollow></SuggestedFollow>
      <Box backgroundColor={'#262626'} color={'white'} borderRadius={'10px'} p={4} >
        <Flex  alignItems={'center'}flexWrap={'wrap'} >
          <Text fontSize={'xs'} fontWeight={'semibold'}>Developed by Fauzan</Text>
          <FaCircle size={'6px'} color={'#797979'} style={{marginLeft: '5px', marginRight: '5px'}} />
          <Flex gap={1}>
            <FaGithub />
            <AiFillLinkedin />
            <FaFacebook />
            <AiFillInstagram />
          </Flex>
        </Flex>
        <Flex fontSize={'xs'} flexWrap={'wrap'} alignItems={'center'} color={'#797979'} fontWeight={'semibold'}>Powered By DU Dumbways Indonesia <FaCircle size={'6px'} color={'#797979'} style={{marginLeft: '5px', marginRight: '5px'}} /> #1Coding Bootcamp</Flex>
      </Box>
    </Box>
  )
}

