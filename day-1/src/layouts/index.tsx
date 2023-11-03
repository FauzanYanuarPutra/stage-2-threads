import { Grid, GridItem } from "@chakra-ui/react";
import { MyProfile } from "../components/MyProfile";
import Navbar from "../components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' }} border={'1px solid #595959'} bg='#1D1D1D' color={'white'}>
      <GridItem colSpan={1} display={{ base: 'none', lg: 'block' }}>
        <Navbar></Navbar>
      </GridItem>
      <GridItem  colSpan={2}  border={'.02px solid #343434'}>
      {children}
      </GridItem>
      <GridItem colSpan={1}>
        <MyProfile></MyProfile>
      </GridItem>
    </Grid>
  )
}