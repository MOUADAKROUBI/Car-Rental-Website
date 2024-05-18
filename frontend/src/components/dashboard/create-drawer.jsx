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
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import axios from "axios";
import DropFile from "../form/dropFile";
import { t } from "i18next";

function CreateItemDrawer({ dataType, onUpdate }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    console.log(formData);
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
    const { photo1, photo2, brand, model, gearbox, fuel_type, price, available } = formData;
    const formDataToSend = new FormData();

    formDataToSend.append("photo1", photo1);
    formDataToSend.append("photo2", photo2);
    formDataToSend.append("brand", brand);
    formDataToSend.append("model", model);
    formDataToSend.append("gearbox", gearbox);
    formDataToSend.append("fuel_type", fuel_type);
    formDataToSend.append("price", price);
    formDataToSend.append("available", available);

    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/${dataType}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data.data);
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderInputFields = () => {
    if (dataType === "cars") {
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
            <FormLabel htmlFor="brand">Brand</FormLabel>
            <Input id="brand" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="model">Model</FormLabel>
            <Input id="model" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="gearbox">Gearbox</FormLabel>
            <Input id="gearbox" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="fuel_type">Fuel Type</FormLabel>
            <Input id="fuel_type" onChange={handleChange} />
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
              <option value="0">{t('carCard.yes')}</option>
              <option value="1">{t('carCard.no')}</option>
            </Select>
          </Box>
        </>
      );
    } else if (dataType === "users") {
      return (
        <>
          <Box>
            <FormLabel htmlFor="avatar">avatar</FormLabel>
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
            <FormLabel htmlFor="car_id">Car Name</FormLabel>
            <Input id="car_name" onChange={handleChange} />
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
