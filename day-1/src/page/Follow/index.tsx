import {  useLoaderData } from "react-router-dom";
import Layout from "../../layouts";
import {  Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import DataSuggest from "../../components/SuggestedFollow/data";
import { userFetched } from "../../store/slice/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function FollowPage() {
  const { user }: any = useLoaderData();

  const data = useSelector((state: any) => state.auth);
  const dispatch = useDispatch()

  if (data.user.id === undefined) {
    dispatch(userFetched(user))
  } else {
    dispatch(userFetched(data.user))
  }
  

  if(!user) {
    window.location.href = '/login'
    return
  }
  return (
    <>
      <Layout>
        <Flex alignItems={'center'} gap={2} fontSize={'2xl'} marginTop={6} fontWeight={'bold'} px={7}>
          Follows
        </Flex>
        <Tabs>
          <TabList  display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'}>
            <Tab _selected={{ borderBottom: '1px solid #04A51E' }} p={3}>Followers</Tab>
            <Tab _selected={{ borderBottom: '1px solid #04A51E' }} p={3}>Following</Tab>
          </TabList> 
          <TabPanels p={10} >
            <TabPanel display={'grid'} gap={5}>
              {data.user.followers.map((item: any) => (
                  <DataSuggest key={item.id} item={item} user={user}  />
              ))}
            </TabPanel>
            <TabPanel display={'grid'} gap={5}>
            {data.user.following.map((item: any) => (
                <DataSuggest key={item.id} item={item} user={user}  />
            ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </>
  )
}