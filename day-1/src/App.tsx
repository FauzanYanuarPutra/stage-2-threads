import { Button, Flex, Grid, Image,  InputRightElement, InputGroup, Text, Box, Textarea } from '@chakra-ui/react';
import {RiImageAddFill} from 'react-icons/ri'
import Thread from './features/threads';
import Layout from './layouts';
import { defer, useLoaderData } from 'react-router-dom';
import { allUser, checkToken, getThread, getUser } from './services/apiService';
import {  useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AiFillCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { incremented } from './store/slice/authSlice';


// interface Reply {
//   id: number;
//   author_picture: string;
//   author_name: string;
//   author_username: string;
//   author_badge: string;
//   posted_at: string;
//   content: string;
//   image: string;
//   likes_count: number;
//   replies_count: number;
//   is_liked: boolean;
// }


// eslint-disable-next-line react-refresh/only-export-components
// export async function loader() {
//   const hero = await getThread();

//   return hero;
// }

export const privateData = async () => {
  const thread = await getThread();
  const dataUser = await allUser();
  const token = await checkToken();
  let user: any = null;

  if (token && token.user) {
    user = await getUser(token.user.id);
  }

  // const AllUser = dataUser.filter((id: any, index: any) => index < 5 && id.id !== user?.id);

  return defer({ thread, user, dataUser, token });
};

function App() {
  // const hero = useLoaderData() as Reply[];
  const { thread, user, token }: any = useLoaderData();
  const [threadData, setThread] = useState(thread);
  const [modal, setModal] = useState(false)


  if(token.message === 'Unauthorized' && !user) {
    window.location.href = '/login'
    return
  }

  const [createThread, setCreateThread] = useState({
    content: '',
    image: null,
    userID: user.id,
  })

  const pollData = async () => {
    try {
      const newThread = await getThread();

      setThread(newThread);
    } catch (error) {
      console.error('Error polling data:', error);
    }
  };

  // const use = useSelector((state: any) => state.auth);

  const dispatch = useDispatch()


  const HandleModal = () => {
    setModal(!modal)
    dispatch(incremented())
  }

  const handleImageUpload = (e: any) => {
    const imageFile = e.target.files[0];
    setCreateThread({ ...createThread, image: imageFile });
  };
  
  

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("content", createThread.content);
    if (createThread.image) {
      formData.append("image", createThread.image);
    }
    formData.append("userID", user.id);
  
    try {
      await axios.post('http://localhost:5000/api/v1/thread', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setModal(false);
      pollData();
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
        <Layout>
          <Text fontSize={'2xl'} marginTop={6} fontWeight={'bold'} px={7}>Home</Text>
          <Flex alignItems={'center'} gap={4} py={6} borderBottom={'.02px solid #343434'} px={7}  onClick={() => HandleModal()} cursor={'pointer'}>
            <Image src={'https://source.unsplash.com/random/800x800'} alt="" minH={10} minW={10} w={10} h={10} borderRadius={'full'}></Image>
            <InputGroup>
              <Text w={'full'} fontSize={'xl'} color={'gray'}>
              What is happening?!
              </Text>
              <InputRightElement gap={2}>
                <RiImageAddFill fill={'#04A51E'} size={20} />
                <Button borderRadius={'full'} bg={'#005F0E'} px={5} py={'.5px'}>Post</Button>
              </InputRightElement>
            </InputGroup>
          </Flex>
          <Grid gap={4} position={'relative'}>
            {threadData && threadData.map((item: any) => (
              <Thread key={item.id}  {...item} />
            ))}
            {modal && (
              <motion.div
                initial={{ opacity: 0,y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{  width: '50%', position: 'fixed', top: 20  }}
              >
              <form action="" onSubmit={(e) => handleFormSubmit(e)}>
                <Box bg={'#262626'} color={'white'} borderRadius={'10px'} p={4} m={10} position={'relative'}>
                  <Button position={'absolute'} top={5} right={5}>
                    <AiFillCloseCircle onClick={() => HandleModal()} size={'30px'}></AiFillCloseCircle>
                  </Button>
                    <Flex alignItems={'center'} gap={2} fontSize={'2xl'}  fontWeight={'bold'} p={7} h={'150px'} w={'100%'}>
                      <Flex alignItems={'center'} gap={4}  w={'full'}>
                        <Image src={'https://source.unsplash.com/random/800x800'} alt="" minH={10} minW={10} w={10} h={10} borderRadius={'full'}></Image>
                        <Textarea placeholder='What is happening?!' fontSize={'xl'}  variant={'unstyled'} bg={'transparent'} _focusVisible={{ outline: 'none' }} w={'100%'} minH={'100px'} resize={'none'}  onChange={(e) => setCreateThread({...createThread, content: e.target.value})}    />
                      </Flex>
                    </Flex>
                    <hr style={{ borderColor: '#343434' }} />
                    <Flex alignItems={'center'} justify={'space-between'} gap={2} fontSize={'2xl'}  fontWeight={'bold'} p={7}>
                    <Box position={'relative'} cursor={'pointer'}>
                      <RiImageAddFill fill="#04A51E" size={25} />
                      <input
                        style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                      />
                    </Box>
                    <Button type='submit' borderRadius={'full'} bg={'#005F0E'} fontWeight={'semibold'} fontSize={'md'} px={7}  py={'3px'} >Post</Button>
                    </Flex>
                  </Box>
              </form>
              </motion.div>
            )}
          </Grid>
        </Layout>
    </>
  )
  
}

export default App

