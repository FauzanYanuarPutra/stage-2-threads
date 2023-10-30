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

  if (data.allUSer === undefined) {
    dispatch(allUserFetch(dataUser))
  } else {
    dispatch(allUserFetch(data.allUser))
  }

  return (
    <Box backgroundColor={'#262626'} color={'white'} borderRadius={'10px'} p={4} my={1}>
      <Text fontWeight={'bold'} fontSize={'md'}>Suggested for you</Text>
      <Flex flexDirection={'column'} gap={3} my={3} maxH={'200px'} overflow={'auto'}>
        {data.allUser && data.allUser.map((item: User) => (
          <DataSuggest key={item.id} item={item} user={data.user}  />
        ))}
      </Flex>
    </Box>
  )
}