import { useLoaderData } from "react-router-dom";
import Layout from "../../layouts";
import { Box,  Flex,  Input} from "@chakra-ui/react";
import DataSuggest from "../../components/SuggestedFollow/data";
import { userFetched } from "../../store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RiUserSearchLine } from "react-icons/ri";

export default function SearchPage() {
  const { user }: any = useLoaderData();
  const data = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  if (data.user.id === undefined) {
    dispatch(userFetched(user));
  } else {
    dispatch(userFetched(data.user));
  }

  const filteredUsers = data.allUser.filter((item: any) =>
    (item.username && item.username.toLowerCase().includes(search.toLowerCase())) ||
    (item.full_name && item.full_name.toLowerCase().includes(search.toLowerCase()))
  );




  return (
    <>
      <Layout>
        <Flex alignItems={'center'} gap={2} fontSize={'2xl'} marginTop={6} fontWeight={'bold'} px={7}>
        </Flex>
        <Flex alignItems={'center'} gap={4} py={2} rounded={'full'} px={7} bg={'#262626'} cursor={'pointer'} w={'95%'} mx={'auto'}>
          <RiUserSearchLine size={'20px'} color={'white'}  />
          <Input placeholder='What is happening?!' fontSize={'md'}  variant={'unstyled'} bg={'transparent'} _focusVisible={{ outline: 'none' }} w={'100%'}   onChange={(e) => setSearch(e.target.value)}    />
        </Flex>
        <Box display={'grid'} gap={5} px={7} py={6}>
          {filteredUsers.map((item: any) => (
            <DataSuggest key={item.id} item={item} user={data.user} />
          ))}
        </Box>
      </Layout>
    </>
  );
}
