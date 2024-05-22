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
  Select,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import DropFile from "../form/dropFile";
import { t } from "i18next";
import { showToast } from "../toast-alert";
import { DataContext } from "../../Contexts/DataContext";

function CreateItemDrawer({ dataType, onUpdate }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const toast = useToast();

  const [formData, setFormData] = useState({});
  const { setAction } = useContext(DataContext)

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [id]: e.target.files[0],
      });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async () => {
    // add post requests to the backend
    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/${dataType}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => { 
        setAction(true);
        showToast(toast, response.data.message, "success", "Success");

        onClose();
      })
      .catch((error) => {
        console.log(error);
        showToast(toast, error.response.data.message, "error", "Error");
      });
  };

  const renderInputFields = () => {
    if (dataType === "homes") {
      return (
        <>
          <Box>
            <FormLabel htmlFor="photo1">Photo 1</FormLabel>
            <DropFile refe="photo1" handleChange={handleChange} />
          </Box>
          <Box>
            <FormLabel htmlFor="photo2">Photo 2</FormLabel>
            <DropFile refe="photo2" handleChange={handleChange} />
          </Box>
          <Box>
            <FormLabel htmlFor="type">Type</FormLabel>
            <Select
              id="type"
              variant="outline"
              defaultValue="apartment"
              onChange={handleChange}
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="condo">Condo</option>
              <option value="bungalow">Bungalow</option>
            </Select>
          </Box>

          <Box>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input id="address" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input id="city" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input id="country" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="sqft">Sqft</FormLabel>
            <Input id="sqft" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="bedrooms">bedrooms</FormLabel>
            <Input id="bedrooms" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="bathrooms">bathrooms</FormLabel>
            <Input id="bathrooms" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="furnished">Furnished</FormLabel>
            <Select
              id="furnished"
              variant="outline"
              defaultValue={1}
              onChange={handleChange}
            >
              <option value={1}>{t('homeCard.yes')}</option>
              <option value={0}>{t('homeCard.no')}</option>
            </Select>
          </Box>

          <Box>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Input id="price" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="available">Availability</FormLabel>
            <Select
              id="available"
              variant="outline"
              defaultValue={1}
              onChange={handleChange}
            >
              <option value={1}>{t('homeCard.yes')}</option>
              <option value={0}>{t('homeCard.no')}</option>
            </Select>
          </Box>
        </>
      );
    } else if (dataType === "users") {
      return (
        <>
          <Box>
            <FormLabel htmlFor="avatar">Avatar</FormLabel>
            <DropFile refe="avatar" handleChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="firstname">Firstname</FormLabel>
            <Input ref={firstField} id="firstname" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="lastname">Lastname</FormLabel>
            <Input id="lastname" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="telephone">Telephone</FormLabel>
            <Input id="telephone" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" onChange={handleChange} />
          </Box>
        </>
      );
    } else if (dataType === "rents") {
      return (
        <>
          <Box>
            <FormLabel htmlFor="rental_date">Rental Date</FormLabel>
            <Input ref={firstField} id="rental_date" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="return_date">Return Date</FormLabel>
            <Input id="return_date" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Input id="price" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="user_id">Customer Name</FormLabel>
            <Input id="user_name" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="home_id">Home Name</FormLabel>
            <Input id="home_name" onChange={handleChange} />
          </Box>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <Button
        colorScheme="telegram"
        ml={4}
        leftIcon={<AddIcon color="white" />}
        onClick={onOpen}
      >
        New item
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader borderBottomWidth="1px">Create {dataType}</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">{renderInputFields()}</Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" px={7} onClick={handleSubmit}>
              Create
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CreateItemDrawer;
