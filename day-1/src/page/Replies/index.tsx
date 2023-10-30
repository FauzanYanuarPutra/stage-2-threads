import { Box, Button, Flex, Grid, Image, Input, InputGroup, InputRightElement, Text, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { RiImageAddFill } from 'react-icons/ri';
import Layout from '../../layouts';
import axios from 'axios';
import Thread from '../../features/threads';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom'
import { AiFillCloseCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';

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
  const { user }: any = useLoaderData();
  const [data, setData] = useState<ThreadData | null>(null);
  const [modal, setModal] = useState(false)
  const [createThread, setCreateThread] = useState<{ content : string, image : File | null, user : number, thread : number }>({
    content: '',
    image: null,
    user: user.id,
    thread: params.id
  })


  if(!user) {
    window.location.href = '/login'
    return
  }

  const HandleModal = () => {
    setModal(!modal)
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/thread/${params.id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [params.id]);


    // const pollData = async () => {
    //     try {
    //       const newThread = await get();
    
    //       setThread(newThread);
    //     } catch (error) {
    //       console.error('Error polling data:', error);
    //     }
    // };
  
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
    formData.append("user", user.id);
    formData.append("thread", params.id);

    try {
      await axios.post('http://localhost:5000/api/v1/replie', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
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
          <Thread  {...data} />
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
      {data && data.replies && data.replies.map((item) => (
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
                <Button type='submit' borderRadius={'full'} bg={'#005F0E'} fontWeight={'semibold'} fontSize={'md'} px={7}  py={'3px'} >Post</Button>
                </Flex>
              </Box>
          </form>
        </motion.div>
      )}
        
    </Layout>
  )
}

export default Replies

