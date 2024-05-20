/* eslint-disable react/prop-types */
import {
  Button,
  Heading,
  HStack,
  Image,
  Text,
  Box,
  Divider,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HomeCard = ({ props }) => {
  const { t } = useTranslation();
  const to_route = useNavigate();
  const navigate = (route) => {
    to_route(route);
  };

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const photo1 =
    props.id <= 6 ? `/images/back${props.id}.webp` : backendURL + props.photo1;
  const photo2 =
    props.id <= 6 ? `/images/front${props.id}.webp` : backendURL + props.photo2;
  return (
    <div className="home-card">
      <div className="details">
        <div className="thumb-gallery">
          <Box bg="gray.400" w="full" h="full">
            <Image
              className="first"
              objectFit="cover"
              h={"215px"}
              w={"full"}
              src={photo1}
            ></Image>
            <Image
              className="second"
              objectFit="cover"
              h={"215px"}
              w={"full"}
              src={photo2}
            ></Image>
          </Box>
        </div>

        <Box p={3}>
          <HStack alignItems="baseline" spacing={"auto"}>
            <Heading size={"md"} fontWeight="600">
              {props.title}
            </Heading>
            <Heading size={"sm"} fontWeight="600" ml={2} />
            <Heading size={"sm"} fontWeight="600" ml={2}>
              {props.location}
            </Heading>
          </HStack>
          <HStack>
            <Heading fontWeight="bold" size="lg" color="gray.600">
              DH {props.price}
            </Heading>
            <Text color="gray.400">{t("homeCard.perNight")} </Text>
          </HStack>
          <Button
            w="full"
            onClick={() => navigate(`/homes/${props.id}`)}
            isDisabled={!props.available}
          >
            {t("homeCard.rentNow")}
          </Button>
          <Divider borderColor="gray.300" />

          <SimpleGrid columns={4} py={0} textAlign="center">
            <GridItem>
              <Heading fontWeight="400" color="gray.400" size="xs">
                {t("homeCard.sqft")}
              </Heading>
              <Text fontWeight="500" color="gray.600">
                {props.sqft}
              </Text>
            </GridItem>
            <GridItem>
              <Heading fontWeight="400" color="gray.400" size="xs">
                {t("homeCard.furnished")}
              </Heading>
              <Text fontWeight="500" color="gray.600">
                {props.furnished ? t("homeCard.yes") : t("homeCard.no")}
              </Text>
            </GridItem>
            <GridItem>
              <Heading fontWeight="400" color="gray.400" size="xs">
                {t("homeCard.bedrooms")}
              </Heading>
              <Text fontWeight="500" color="gray.600">
                {props.bedrooms}
              </Text>
            </GridItem>
            <GridItem>
              <Heading fontWeight="400" color="gray.400" size="xs">
                {t("homeCard.bathrooms")}
              </Heading>
              <Text fontWeight="500" color="gray.600">
                {props.bathrooms}
              </Text>
            </GridItem>
            <GridItem>
              <Heading fontWeight="400" color="gray.400" size="xs">
                {t("homeCard.available")}
              </Heading>
              <Text fontWeight="500" color="gray.600">
                {props.available === 1
                  ? t("homeCard.yes")
                  : props.available === 0
                  ? t("homeCard.no")
                  : props.available}
              </Text>
            </GridItem>
          </SimpleGrid>

          <Divider borderColor="gray.300" py={0} />
        </Box>
      </div>
    </div>
  );
};

export default HomeCard;
