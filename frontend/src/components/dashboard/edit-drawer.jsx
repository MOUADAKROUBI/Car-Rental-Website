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
            <Select
              id="type"
              variant="outline"
              defaultValue={formData.type}
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
            <Input id="address" value={formData.address} onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input id="city" value={formData.city} onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input id="country" value={formData.country} onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="sqft">Sqft</FormLabel>
            <Input id="sqft" value={formData.sqft} onChange={handleChange} />
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
            <FormLabel htmlFor="furnished">Furnished</FormLabel>
            <Select
              id="furnished"
              variant="outline"
              defaultValue={formData.furnished ? 1 : 0}
              onChange={handleChange}
            >
              <option value={1}>{t('homeCard.yes')}</option>
              <option value={0}>{t('homeCard.no')}</option>
            </Select>
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
              defaultValue={formData.available ? 1 : 0}
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
            <FormLabel htmlFor="checkIn">Check In</FormLabel>
            <Input
              ref={firstField}
              id="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="checkOut">CheckOut</FormLabel>
            <Input
              id="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Input id="price" value={formData.price} onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="user_name">User Name</FormLabel>
            <Input
              id="user_name"
              value={formData.user_name}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="home_type">Home Name</FormLabel>
            <Input
              id="home_type"
              value={formData.home_type}
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