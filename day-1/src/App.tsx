import { Button, Flex, Grid, Image,  InputRightElement, InputGroup, Text, Box, Textarea, Spinner } from '@chakra-ui/react';
import {RiImageAddFill} from 'react-icons/ri'
import Thread from './features/threads';
import Layout from './layouts';
import {  defer, useLoaderData,  } from 'react-router-dom';
import { allUser, checkToken, getThread, getThreadDetail, getUser } from './services/apiService';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AiFillCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { incremented, threadsFetched } from './store/slice/authSlice';
import { useSelector } from 'react-redux';

export const privateData: any = async ({ params }: { params: { id: string | null | number| any } }) => {
  const id = params.id | 0
  const thread = await getThread();
  const dataUser = await allUser();
  const token = await checkToken();

  let detailThread: any = null
  if (id !== 0) {
    detailThread = await getThreadDetail(id);
  }
  
  let user: any = null;

  if (token && token.user) {
    user = await getUser(token.user.id);
  }

    return defer({ thread, user, dataUser, token, detailThread });
};

function App() {
  const { thread, user }: any = useLoaderData();
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const data = useSelector((state: any) => state.auth);

  const dispatch = useDispatch()

  if (data.threads.length <= 0) {
    dispatch(threadsFetched(thread));
  } else {
    dispatch(threadsFetched(data.threads));
  }


  const [createThread, setCreateThread] = useState({
    content: '',
    image: null,
    userID: user.id,
  })


  const HandleModal = () => {
    setModal(!modal)
    dispatch(incremented())
  }

  const handleImageUpload = (e: any) => {
    const imageFile = e.target.files[0];
    setCreateThread({ ...createThread, image: imageFile });
  };

  const fetchData = () => {
    axios.get('http://localhost:5000/api/v1/threads', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then((res) => {
      dispatch(threadsFetched(res.data));
    })
  }

  
  
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true)
  
    const formData = new FormData();
    formData.append("content", createThread.content);
    if (createThread.image) {
      formData.append("image", createThread.image);
    }
    formData.append("userID", user.id);
  
    try {
      setLoading(false)
      await axios.post('http://localhost:5000/api/v1/thread', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).finally(() => {
        setTimeout(() => {
          fetchData()
          setLoading(false)
        }, 3500)
      });
      setModal(false);
      

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
            {data.threads && data.threads.map((item: any) => (
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
                    <Button
                        type='submit'
                        borderRadius={'full'}
                        fontWeight={'semibold'}
                        fontSize={'md'}
                        px={7}
                        py={'3px'}
                        isDisabled={loading}
                        cursor={loading ? 'not-allowed' : 'pointer'}
                        bg={loading ? 'gray.400' : '#005F0E'}
                      >
                        {loading ? (
                          <Spinner w={'20px'} h={'20px'}>
                            <AiOutlineLoading3Quarters />
                          </Spinner>
                        ) : (
                          'Post'
                        )}
                      </Button>
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

