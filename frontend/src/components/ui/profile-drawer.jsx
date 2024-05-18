import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
  Box,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import DropFile from "../form/dropFile";
import { showToast } from "../toast-alert";

function ProfileDrawer() {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userID = localStorage.getItem("userID");
  const [formData, setFormData] = useState({
    avatar: null,
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
  });
  const toast = useToast();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userID}`)
      .then((response) => {
        setFormData({
          avatar: response.data.data.avatar,
          firstname: response.data.data.firstname,
          lastname: response.data.data.lastname,
          email: response.data.data.email,
          telephone: response.data.data.telephone,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [userID]);

  const handleChange = (e) => {
    if (e.target.id === "avatar") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.files[0],
      });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = () => {
    const formDataSubmit = new FormData();
    formDataSubmit.append("avatar", formData.avatar);
    formDataSubmit.append("firstname", formData.firstname);
    formDataSubmit.append("lastname", formData.lastname);
    formDataSubmit.append("email", formData.email);
    formDataSubmit.append("telephone", formData.telephone);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/user/${userID}`, formDataSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        showToast(
          toast,
          response.data.message,
          "success",
          "Success"
        );
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button
        leftIcon={<EditIcon color={"white"} />}
        colorScheme="telegram"
        onClick={onOpen}
      >
        {t("profile.editProfile")}
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader borderBottomWidth="1px">
            {t("profile.modifyProfile")}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="firstname">Avatar</FormLabel>
                <DropFile refe="avatar" handleChange={handleChange} />
              </Box>
              <Box>
                <FormLabel htmlFor="firstname">
                  {t("profile.firstname")}
                </FormLabel>
                <Input
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="lastname">
                  {t("profile.lastname")}
                </FormLabel>
                <Input
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="telephone">
                  {t("profile.phoneNumber")}
                </FormLabel>
                <Input
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              {t("profile.cancel")}
            </Button>
            <Button colorScheme="green" px={7} onClick={handleSubmit}>
              {t("profile.save")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ProfileDrawer;
