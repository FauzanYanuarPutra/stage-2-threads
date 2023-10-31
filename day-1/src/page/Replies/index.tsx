import { Box, Button, Flex, Grid, Image, InputGroup, InputRightElement, Spinner, Text, Textarea } from '@chakra-ui/react';
import {  useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { RiImageAddFill } from 'react-icons/ri';
import Layout from '../../layouts';
import axios from 'axios';
import Thread from '../../features/threads';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom'
import { AiFillCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { detailFetched } from '../../store/slice/authSlice';
import { useDispatch } from 'react-redux';
import { TbDisabled } from 'react-icons/tb';

export interface User {
  id: number;
  username: string;
  full_name: string;
  email: string;
  profile_picture: string;
  profile_description: string;
}

export interface RepliesData {
  id: number;
  content: string;
  image: string;
  user: User;
}

export interface ThreadData {
  id: number;
  content: string;
  image: string;
  user: User;
  like: User[];
  replies: RepliesData[];
}

function Replies() {
  const params: any = useParams();
  const { user, detailThread }: any = useLoaderData();
  const [loading, setLoading] = useState(false);


  const datas = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();


  if (datas.detailThreads.id === undefined) {
    dispatch(detailFetched(detailThread));
  } else {
    dispatch(detailFetched(datas.detailThreads));
  }


  const [modal, setModal] = useState(false)
  const [createThread, setCreateThread] = useState<{ content : string, image : File | null, user : number, thread : number }>({
    content: '',
    image: null,
    user: user.id,
    thread: params.id
  })


  const HandleModal = () => {
    setModal(!modal)
  }
  
  const handleImageUpload = (e: any) => {
    const imageFile = e.target.files[0];
    setCreateThread({ ...createThread, image: imageFile });
  };
  

  const handleFormSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("content", createThread.content);
    if (createThread.image) {
      formData.append("image", createThread.image);
    }
    formData.append("user", user.id);
    formData.append("thread", params.id);

    try {
      await axios.post('http://localhost:5000/api/v1/replie', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        console.log(res.data.thread)
          dispatch(detailFetched(res.data.thread));
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        setLoading(false);
      });
      setModal(false);
      // pollData();
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Layout>
      <Link to='/' >
        <Flex alignItems={'center'} gap={2} fontSize={'2xl'} marginTop={6} fontWeight={'bold'} px={7}>
          <IoArrowBackOutline />
          Status
        </Flex>
      </Link>

      <Grid gap={4} >
          <Thread  {...datas.detailThreads} />
      </Grid>
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
      <Grid gap={4} >
      {datas.detailThreads.replies && datas.detailThreads.replies && datas.detailThreads.replies.map((item: any) => (
          <Thread key={item.id} {...item} />
      ))}
      </Grid>

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
        
    </Layout>
  )
}

export default Replies

