import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userFetched } from "../../../store/slice/authSlice";
import { getUser } from "../../../services/apiService";

export default function DataSuggest({ item, user }: any) {

  const [isLiked, setIsLiked] = useState<boolean | undefined>(false);
  const dispatch = useDispatch()
  

  useEffect(() => {
    if (user.following) {
      user.following.forEach((items: any) => {
        if(items.id === item.id) {
          setIsLiked(true);
        }
      })
    }
  }, [item])

  const handleLike = async (id: number | undefined, user_id: number | undefined, isLiked: boolean | undefined) => {
    axios.post(`http://localhost:5000/api/v1/follow/`, {
      id_following: user_id,
      id_followed: id,
      action: isLiked,
    })
      .then(async () => {
        setIsLiked(isLiked);
        dispatch(userFetched(await getUser(user.id)));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  

  return (
    <Flex key={item.id} justifyContent={'space-between'} alignItems={'center'} gap={2}>
        <Flex gap={2} alignItems={'center'}>
          <Image src={'https://source.unsplash.com/random/400x400'} alt="" w={'30px'} h={'30px'} borderRadius={'full'}></Image>
          <Box>
            <Text fontSize={'11px'}>{item.full_name}</Text>
            <Text fontSize={'11px'} color={'#797979'}>@{item.username}</Text>
          </Box>
      </Flex>
      <Button border={!isLiked ? '1px solid white' : '1px solid #797979'} fontSize={'11px'} color={!isLiked ? 'white' : '#797979'} px={3} py={'1.5px'} borderRadius={'full'} onClick={() => handleLike(item.id, user.id, !isLiked )}>{ !isLiked ? 'Follow' : 'unfollow' }</Button>
    </Flex>
  )
}