import {
  Center,
  FormLabel,
  Input,
  HStack,
  Box,
  Button,
  Image,
  VStack,
  Text,
  Heading,
  Spacer,
  Stack,
  SimpleGrid,
  GridItem,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/ui/loading-spinner";
import { showToast } from "../components/toast-alert";
import { useTranslation } from "react-i18next";
import Navbar from "../components/navbar/Navbar";
import AvatarMenu from "../components/navbar/avatar-menu";
import HomeSidebarContent from "../components/home/home-sidebar-content";
import NavbarLinks from "../components/navbar/NavbarLinks";
import NavbarLoginButtons from "../components/navbar/login-buttons";
import useAuthentication from "../useAuthentication";
import { ArrowBackIcon } from "@chakra-ui/icons";

function RentPage() {
  const { t } = useTranslation();

  const { isLoggedIn } = useAuthentication();
  const navigation = useNavigate();
  const navigate = (route) => navigation(route);
  let params = useParams();
  const toast = useToast();
  const [home, setHome] = useState({});
  const [isLoading, setLoading] = useState(true);

  const checkIn = useRef("");
  const checkOut = useRef("");
  const [datesIsValid, setDatesIsValid] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/homes/${params.id}`)
      .then((response) => {
        setHome(response.data.data[0]);
        setTotalPrice(response.data.data[0].price);
        setLoading(false);
      });
  }, [params.id]);

  useEffect(() => {
    calculatePrice();
  }, []);

  const calculatePrice = () => {
    const checkInDate = Date.parse(checkIn.current.value);
    const checkOutDate = Date.parse(checkOut.current.value);
    const now = new Date().getTime();

    const rentDuration = checkOutDate - checkInDate;
    if (checkIn.current.value && checkOut.current.value) {
      if (checkIn < now || checkOut < now) {
        setDatesIsValid(false);
        showToast(toast, t("homeCard.selectValidDates"), "error", "Error");
      } else if (rentDuration <= 0) {
        setDatesIsValid(false);
        showToast(toast, t("homeCard.selectValidDates"), "error", "Error");
      } else {
        setDatesIsValid(true);
        const price = (rentDuration / (1000 * 60 * 60 * 24)) * home.price;
        setTotalPrice(price);
      }
    }
  };

  const handleCheckInDateChange = () => {
    calculatePrice();
  };

  const handleCheckOutDateChange = () => {
    calculatePrice();
  };

  if (isLoading) return <LoadingSpinner />;

  function rentAHome(e) {
    e.preventDefault();

    const rent = {
      checkIn: checkIn.current.value,
      checkOut: checkOut.current.value,
      price: totalPrice,
      user_id: localStorage.getItem("userID"),
      home_id: params.id,
    };

    if (datesIsValid && isLoggedIn) {
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/rents", rent)
        .then((response) => {
          showToast(toast, "Rent created successfully!", "success", "Success");
          navigate("/homes");
        })
        .catch((error) => {
          showToast(toast, "Creating a rent failed", "error", "Error");
          console.error("Error creating rent:", error);
        });
    } else if (!isLoggedIn) {
      showToast(toast, "You need to login first", "error", "Error");
    } else {
      showToast(toast, "Please select valid dates", "error", "Error");
    }
  }

  return (
    <>
      <Navbar
        sidebarContent={<HomeSidebarContent />}
        links={<NavbarLinks />}
        buttons={<>{isLoggedIn ? <AvatarMenu /> : <NavbarLoginButtons />}</>}
      />

      <Center>
        <Stack
          direction={{ base: "column", lg: "row" }}
          boxShadow="2xl"
          h={"auto"}
          w={"75%"}
          borderRadius="15px"
          overflow={"hidden"}
          mb={10}
        >
          <Box w={{ base: "100%", lg: "50%" }}>
            <Image src={home.photo1} objectFit="cover" h={"full"}></Image>
          </Box>
          <Box w={{ base: "100%", lg: "50%" }} p={"5%"} bg={"white"} h={"full"}>
            <Button
              leftIcon={
                <ArrowBackIcon color="black" fontSize={25} fontWeight={600} />
              }
              variant="outline"
              onClick={() => navigate("/homes")}
            >
              Back
            </Button>
            <VStack alignItems={"center"} spacing={"3"}>
              <FormLabel fontWeight="600" color="gray.600">
                {t("profile.checkInDate")}
              </FormLabel>
              <Input
                type={"date"}
                ref={checkIn}
                onChange={handleCheckInDateChange}
              />
              <FormLabel fontWeight="600" color="gray.600">
                {t("profile.checkOutDate")}
              </FormLabel>
              <Input
                type={"date"}
                ref={checkOut}
                onChange={handleCheckOutDateChange}
              />

              <Divider borderColor="gray.300" py={3} />
              <SimpleGrid w={"full"} columns={4} py={3} textAlign="center">
                <GridItem>
                  <Heading fontWeight="500" color="gray.400" size="xs">
                    {t("homeCard.sqft")}
                  </Heading>
                  <Text fontWeight="500" color="gray.600">
                    {home.sqft}
                  </Text>
                </GridItem>
                <GridItem>
                  <Heading fontWeight="500" color="gray.400" size="xs">
                    type
                  </Heading>
                  <Text fontWeight="500" color="gray.600">
                    {home.type}
                  </Text>
                </GridItem>
                <GridItem>
                  <Heading fontWeight="500" color="gray.400" size="xs">
                    {t("homeCard.city")}
                  </Heading>
                  <Text fontWeight="500" color="gray.600">
                    {home.city}
                  </Text>
                </GridItem>
                <GridItem>
                  <Heading fontWeight="500" color="gray.400" size="xs">
                    {t("profile.furnished")}
                  </Heading>
                  <Text fontWeight="600" color="gray.600">
                    {home.furnished ? t("homeCard.yes") : t("homeCard.no")}
                  </Text>
                </GridItem>
                <GridItem>
                  <Heading fontWeight="500" color="gray.400" size="xs">
                    {t("homeCard.bedrooms")}
                  </Heading>
                  <Text fontWeight="500" color="gray.600">
                    {home.bedrooms}
                  </Text>
                </GridItem>
                <GridItem>
                  <Heading fontWeight="500" color="gray.400" size="xs">
                    {t("profile.bathrooms")}
                  </Heading>
                  <Text fontWeight="600" color="gray.600">
                    {home.bathrooms}
                  </Text>
                </GridItem>
                <GridItem>
                  <Heading fontWeight="500" color="gray.400" size="xs">
                    {t("homeCard.available")}
                  </Heading>
                  <Text fontWeight="600" color="gray.600">
                    {home.available === 1
                      ? t("homeCard.yes")
                      : home.available === 0
                      ? t("homeCard.no")
                      : home.available}
                  </Text>
                </GridItem>
              </SimpleGrid>
              <Divider borderColor="gray.300" py={0} />

              <HStack w={"full"} justify={"space-between"}>
                <Text fontWeight="600" color="gray.600">
                  Total
                </Text>
                <Spacer />
                <Text
                  color="gray.600"
                  fontSize="2xl"
                  fontWeight={["bold", "extrabold"]}
                >
                  {totalPrice.toFixed(2)}
                </Text>
                <Text ml={2} fontSize="xl" fontWeight="medium" color="gray.500">
                  DH
                </Text>
              </HStack>
              <Button onClick={rentAHome} w={"full"}>
                {t("homeCard.confirmRent")}
              </Button>
            </VStack>
          </Box>
        </Stack>
      </Center>
    </>
  );
}

export default RentPage;
