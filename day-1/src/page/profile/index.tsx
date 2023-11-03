import { useLoaderData } from "react-router-dom";
import Layout from "../../layouts";
import { Box, Button, FormLabel, Image, Input, Spinner, Text } from "@chakra-ui/react";
import { userFetched } from "../../store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useToast from "../../hooks/useToast";

export default function ProfilePage() {
  const { user }: any = useLoaderData();
  const toast = useToast();

  const data = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  if (data.user.id === undefined) {
    dispatch(userFetched(user));
  } else {
    dispatch(userFetched(data.user));
  }

  const [updateUser, setUpdateUser] = useState(data.user);
  const [previewImage, setPreviewImage] = useState(data.user.profile_picture);

  const handleProfile = (e: any) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("full_name", updateUser.full_name);
    formData.append("username", updateUser.username);
    formData.append("email", updateUser.email);
    formData.append("profile_description", updateUser.profile_description);
    formData.append("image", updateUser.profile_picture);

    axios
      .patch(`http://localhost:5000/api/v1/user/${data.user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res: any) => {
        dispatch(userFetched({ ...data.user, ...res.data }));
        setLoading(false);
        toast("Success", "Profile Updated", "success");
      });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setUpdateUser({ ...updateUser, profile_picture: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <>
      <Layout>
      {/* <ToastContainer autoClose={2000} position="top-center" hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"  /> */}
        <Box alignItems={"center"} gap={2} fontSize={"2xl"} marginTop={6} fontWeight={"bold"} px={7} mb={'100px'}>
          <Text mb={"20px"}>Profile</Text>
          <form onSubmit={handleProfile} style={{ display: "grid", gap: "10px" }}>
            <FormLabel fontSize={"15px"} fontWeight={"medium"}>
              Full Name
            </FormLabel>
            <Input
              value={updateUser.full_name}
              onChange={(e) => setUpdateUser({ ...updateUser, full_name: e.target.value })}
              color={"black"}
              p={"20px"}
              rounded={"xl"}
              bg={"#262626"}
              textColor={"white"}
              fontSize={"16px"}
            ></Input>
            <FormLabel fontSize={"15px"} fontWeight={"medium"}>
              Username
            </FormLabel>
            <Input
              value={updateUser.username}
              onChange={(e) => setUpdateUser({ ...updateUser, username: e.target.value })}
              color={"black"}
              p={"20px"}
              rounded={"xl"}
              bg={"#262626"}
              textColor={"white"}
              fontSize={"16px"}
            ></Input>
            <FormLabel fontSize={"15px"} fontWeight={"medium"}>
              Email
            </FormLabel>
            <Input
              value={updateUser.email}
              onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
              color={"black"}
              p={"20px"}
              rounded={"xl"}
              bg={"#262626"}
              textColor={"white"}
              fontSize={"16px"}
            ></Input>
            <FormLabel fontSize={"15px"} fontWeight={"medium"}>
              Profile Deskription
            </FormLabel>
            <Input
              value={updateUser.profile_description}
              onChange={(e) => setUpdateUser({ ...updateUser, profile_description: e.target.value })}
              color={"black"}
              p={"20px"}
              rounded={"xl"}
              bg={"#262626"}
              textColor={"white"}
              fontSize={"16px"}
            ></Input>
            <FormLabel fontSize={"15px"} fontWeight={"medium"}>
              Profile Image
            </FormLabel>

            <Box
              bg={"black"}
              cursor={"pointer"}
              color={"white"}
              p={"10px"}
              position={"relative"}
              h={"400px"}
              w={"400px"}
              _hover={{
                "& .update-text": {
                  opacity: 0.6,
                },
              }}
            >
              <Box
                position={"absolute"}
                top={0}
                left={0}
                right={0}
                bottom={0}
                zIndex={2}
                opacity={0}
                cursor={"pointer"}
                className="update-text"
                bg={"black"}
                transition="opacity 0.3s"
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
              >
                Update Gambar
              </Box>
              <Image src={previewImage} objectFit={"cover"} w={"full"} h={"full"} position={"absolute"} top={0} left={0} right={0} bottom={0}></Image>
              <Input
                id="fileInput"
                w={"full"}
                h={"full"}
                opacity={0}
                cursor={"pointer"}
                position={"absolute"}
                zIndex={5}
                top={0}
                left={0}
                right={0}
                bottom={0}
                type="file"
                onChange={handleFileChange}
              ></Input>
            </Box>
            <Button
              borderRadius={'full'}
              fontWeight={'semibold'}
              type={"submit"}
              fontSize={"18px"}
              rounded={"xl"}
              p={'14px'}
              color={'white'}
              isDisabled={loading}
              cursor={loading ? 'not-allowed' : 'pointer'}
              bg={loading ? 'gray.400' : '#04A51E'}
            >
              {loading ? (
                <Spinner w={'20px'} h={'20px'}>
                  <AiOutlineLoading3Quarters />
                </Spinner>
              ) : (
                'Edit Profile'
              )}
            </Button>
          </form>
        </Box>
      </Layout>
    </>
  );
}
