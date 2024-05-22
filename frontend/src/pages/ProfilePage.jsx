import {
  Box,
  Container,
  HStack,
  TableContainer,
  Thead,
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  VStack,
  Heading,
  Spacer,
  Divider,
  Text,
} from "@chakra-ui/react";
import ProfileDrawer from "../components/ui/profile-drawer";
import HomeSidebarContent from "../components/home/home-sidebar-content";
import NavbarLinks from "../components/navbar/NavbarLinks";
import AvatarMenu from "../components/navbar/avatar-menu";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Profile() {
  const { t } = useTranslation();
  const user_id = localStorage.getItem("userID");
  const [rents, setRents] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user_id}/rents`)
      .then((response) => {
        setRents(response.data.data);
      });
  }, [user_id]);

  return (
    <>
      <Navbar
        sidebarContent={<HomeSidebarContent />}
        links={<NavbarLinks />}
        buttons={<AvatarMenu />}
      />
      <Container h="100vh" maxW="100vw" py={20}>
        <VStack>
          <Box w={"90%"}>
            <HStack>
              <Heading size={["lg", "xl"]}>{t("profile.heading")}</Heading>
              <Spacer />
              <ProfileDrawer />
            </HStack>
            <Divider my={5} />

            <TableContainer>
              <Table variant="striped" size={["md", "md", "lg"]}>
                <Thead>
                  <Tr>
                    <Th>id</Th>
                    <Th>type</Th>
                    <Th>{t("profile.price")}</Th>
                    <Th>{t("profile.bedrooms")}</Th>
                    <Th>{t("profile.bathrooms")}</Th>
                    <Th>{t("profile.checkInDate")}</Th>
                    <Th>{t("profile.checkOutDate")}</Th>
                    <Th>status</Th>
                  </Tr>
                </Thead>
                {!rents.length ? (
                  <Tbody>
                    <Tr>
                      <Td colSpan={7}>
                        <Text textAlign="center">{t("profile.noData")}</Text>
                      </Td>
                    </Tr>
                  </Tbody>
                ) : (
                  <Tbody>
                    {rents.map((rent) => (
                      <Tr key={rent.id}>
                        <Td>{rent.home.id}</Td>
                        <Td>{rent.home.type}</Td>
                        <Td>{rent.home.price}</Td>
                        <Td>{rent.home.bedrooms}</Td>
                        <Td>{rent.home.bathrooms}</Td>
                        <Td>{rent.checkIn}</Td>
                        <Td>{rent.checkOut}</Td>
                        <Td color="gray.700">{rent.status}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                )}
              </Table>
            </TableContainer>
          </Box>
        </VStack>
      </Container>
    </>
  );
}

export default Profile;
