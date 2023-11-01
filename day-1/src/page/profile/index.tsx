import { useLoaderData } from "react-router-dom";
import Layout from "../../layouts";
import {   Box,  Input} from "@chakra-ui/react";
import { userFetched } from "../../store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const { user }: any = useLoaderData();
  const data = useSelector((state: any) => state.auth);
  const dispatch = useDispatch()

  console.log(data.user)


  if (data.user.id === undefined) {
    dispatch(userFetched(user))
  } else {
    dispatch(userFetched(data.user))
  }

  const [updateUSer, setUpdateUSer] = useState(data.user)

  const handleProfile = (e: any) => {
    e.preventDefault()
    console.log(data.user.id)
    axios.patch(`http://localhost:5000/api/v1/user/${data.user.id}`, updateUSer).then((res: any) => {
      dispatch(userFetched({...data.user, ...res.data}))
    })
  }

  return (
    <>
      <Layout>
        <Box alignItems={'center'} gap={2} fontSize={'2xl'} marginTop={6} fontWeight={'bold'} px={7}>
          Profile
          <form onSubmit={handleProfile} style={{ display: 'grid',  gap: '10px'}}>
            <Input value={updateUSer.full_name} onChange={(e) => setUpdateUSer({...updateUSer, full_name: e.target.value})} color={'black'} p={'10px'} bg={'transparent'}></Input>
            <Input value={updateUSer.username} onChange={(e) => setUpdateUSer({...updateUSer, username: e.target.value})} color={'black'} p={'10px'} bg={'transparent'}></Input>
            <Input value={updateUSer.email} onChange={(e) => setUpdateUSer({...updateUSer, email: e.target.value})} color={'black'} p={'10px'} bg={'transparent'}></Input>
            <Input value={updateUSer.profile_description} onChange={(e) => setUpdateUSer({...updateUSer, profile_description: e.target.value})} color={'black'} p={'10px'} bg={'transparent'}></Input>
            <Input value={updateUSer.full_name} onChange={(e) => setUpdateUSer({ ...updateUSer, full_name: e.target.value })} color={'black'} p={'10px'} bg={'transparent'}></Input>
            <button type={"submit"}>Submit</button>
          </form>
        </Box>
      </Layout>
    </>
  );
}
