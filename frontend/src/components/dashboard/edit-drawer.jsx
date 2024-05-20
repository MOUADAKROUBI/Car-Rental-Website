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
import { EditIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import DropFile from "../form/dropFile";
import { t } from "i18next";

function EditItemDrawer({ dataType, item, onUpdate }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const [formData, setFormData] = useState({ ...item });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onClose();
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
            <Input
              id="type"
              value={formData.type}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="location">Location</FormLabel>
            <Input id="location" value={formData.location} onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="bedrooms">Bedrooms</FormLabel>
            <Input
              id="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="bathrooms">Bathrooms</FormLabel>
            <Input
              id="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Input id="price" value={formData.price} onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="available">Availability</FormLabel>
            <Select
              id="available"
              variant="outline"
              defaultValue={formData.available}
              onChange={handleChange}
            >
              <option value="1">{t('homeCard.yes')}</option>
              <option value="0">{t('homeCard.no')}</option>
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
            <Input
              id="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="lastname">Lastname</FormLabel>
            <Input
              id="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="telephone">Telephone</FormLabel>
            <Input
              id="telephone"
              value={formData.telephone}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" value={formData.email} onChange={handleChange} />
          </Box>
        </>
      );
    } else if (dataType === "rents") {
      return (
        <>
          <Box>
            <FormLabel htmlFor="rental_date">Rental Date</FormLabel>
            <Input
              ref={firstField}
              id="rental_date"
              value={formData.rental_date}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="return_date">Return Date</FormLabel>
            <Input
              id="return_date"
              value={formData.return_date}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Input id="price" value={formData.price} onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="user_id">Customer ID</FormLabel>
            <Input
              id="user_id"
              value={formData.user_id}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="home_id">Home ID</FormLabel>
            <Input
              id="home_id"
              value={formData.home_id}
              onChange={handleChange}
            />
          </Box>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <Button
        leftIcon={<EditIcon color={"white"} />}
        colorScheme="green"
        _hover={{ bg: "green", color: "white" }}
        onClick={onOpen}
      >
        Edit
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

          <DrawerHeader borderBottomWidth="1px">Edit {dataType}</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">{renderInputFields()}</Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" px={7} onClick={handleSubmit}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default EditItemDrawer;