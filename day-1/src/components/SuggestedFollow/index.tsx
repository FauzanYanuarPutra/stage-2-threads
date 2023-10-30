import { Box, Flex, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { User } from "../../features/threads";
import DataSuggest from "./data";
import { useSelector } from "react-redux";
import { allUserFetch } from "../../store/slice/authSlice";
import { useDispatch } from "react-redux";


export default function SuggestedFollow() {
  const { dataUser }: any = useLoaderData();
  
  const data = useSelector((state: any) => state.auth);
  const dispatch = useDispatch()


  if (data.user.length === 0) {
    dispatch(allUserFetch(dataUser))
  } else {
    dispatch(allUserFetch(data.user))
  }


  return (
    <Box backgroundColor={'#262626'} color={'white'} borderRadius={'10px'} p={4} my={1}>
      <Text fontWeight={'bold'} fontSize={'md'}>Suggested for you</Text>
      <Flex flexDirection={'column'} gap={3} my={3} maxH={'200px'} overflow={'auto'}>
        {dataUser && dataUser.map((item: User) => (
          <DataSuggest key={item.id} item={item} user={data.user}  />
        ))}
      </Flex>
    </Box>
  )
}