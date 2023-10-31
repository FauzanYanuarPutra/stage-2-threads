import { Box, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import {  useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsChatLeftText } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import { getThread } from "../../services/apiService";


export interface User {
  id?: number | undefined;
  username?: string;
  full_name?: string;
  email?: string;
  password?: string;
  profile_picture?: string;
  profile_description?: string;
}

export interface Replies {
  id?: number | undefined;
  content?: string;
  image?: string;
  user?: User;
}

export interface Thread {
  id?: number | undefined;
  content?: string;
  image?: string;
  user?: User;
  like?: User[];
  replies?: Replies[];
}


export default function Thread(props: Thread) {
  const { user }: any = useLoaderData();

  const user_id = user.id;
  const { id, content, image, like, replies } = props;
  const [thread, setThread] = useState<Thread>({
    id,
    content,
    image,
    user: props.user,
    like,
    replies, 
  });
  const [isLiked, setIsLiked] = useState<boolean | undefined>(false);

  useEffect(() => {
    if (like) {
      like.forEach((item) => {
        if (item.id === user_id) {
          setIsLiked(true);
        }
      })
    }
  }, [like])

  const pollData = async () => {
    try {
      const newThread = await getThread();

      setThread(newThread.find((item: any) => item.id === id));
    } catch (error) {
      console.error('Error polling data:', error);
    }
  };

  const handleLike = (id: number | undefined, user_id: number | undefined, isLiked: boolean | undefined) => {
    axios.post(`http://localhost:5000/api/v1/like/${user_id}`, {
      like: id,
      action: isLiked,
    })
      .then(() => {
        setIsLiked(isLiked);
        pollData()
      })
      .catch((error) => {
        console.error(error);
      })
  };

  return (
    <Flex px={7} key={id} gap={4} borderBottom=".02px solid #343434" py={10}>
      <Box backgroundColor="gray.200" minW={50} minH={50} w={50} h={50} borderRadius="full">
        <Image src={thread.user?.profile_picture} alt="" w="full" h="full" borderRadius="full" />
      </Box>
      <Flex direction="column" gap={2}>
        <Flex gap={1} alignItems="center">
          <Text fontSize="sm">{thread.user?.full_name}</Text>
          <Text fontSize="sm" color="#595959">
            @{thread.user?.username}
          </Text>
          <FaCircle fill="#595959" size={5} />
          <Text fontSize="sm" color="#595959">
            3h
          </Text>
        </Flex>
        <Text fontSize="xs">{content}</Text>
        {image && <Image src={image} alt="" width="50%" />}
        <Flex gap={3} color="#595959">
          <Flex gap={2} alignItems="center" cursor="pointer" onClick={() => handleLike(id, user_id, !isLiked)}>
            {isLiked ? <AiFillHeart size={15} fill="red" /> : <AiOutlineHeart size={15} />}
            <Text fontSize="xs">{thread.like?.length}</Text>
          </Flex>
          <Flex gap={2} alignItems="center" cursor="pointer">
            <BsChatLeftText size={15} />
            <Text fontSize="xs">{thread.replies?.length}</Text>
          </Flex>
          <Link to={`/replies/${id}`}>
            <Flex fontSize="xs" alignItems="center" gap={2} cursor="pointer">
              Replies
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
