import {  } from "react";
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  Grid,
} from "@chakra-ui/react";
import { FaTwitter, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Box
      bg={"gray.200"}
      color={"gray.700"}
      borderTopWidth={1}
      borderStyle={"solid"}
      borderColor={"gray.300"}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"} px={{ base: 0, sm: 0, md: 10 }}>
            <ListHeader>{t("footer.about")}</ListHeader>
            <Text fontSize="sm">{t("footer.aboutDescription")}</Text>
          </Stack>
          <Stack align={"flex-start"} pl={{ base: 0, sm: 0, md: 10 }}>
            <ListHeader>{t("footer.company")}</ListHeader>
            <Link href={"#"}>{t("footer.blog")}</Link>
            <Link href={"#"}>{t("footer.aboutUs")}</Link>
            <Link href={"#"}>{t("footer.contactUs")}</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>{t("footer.legal")}</ListHeader>
            <Link href={"#"}>{t("footer.cookiesPolicy")}</Link>
            <Link href={"#"}>{t("footer.privacyPolicy")}</Link>
            <Link href={"#"}>{t("footer.termsOfService")}</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>{t("footer.oursocialmedia")}</ListHeader>
            <Grid templateColumns="repeat(3, 1fr)" className="d-flex justify-center" gap={4}>
              <Link href={"#"} color={"gray.700"}>
                <FaTwitter className="fs-3" />
              </Link>
              <Link href={"#"} color={"gray.700"}>
                <FaYoutube className="fs-3" />
              </Link>
              <Link href={"#"} color={"gray.700"}>
                <FaInstagram className="fs-3" />
              </Link>
              <Link href={"#"} color={"gray.700"}>
                <FaFacebook className="fs-3" />
              </Link>
            </Grid>
          </Stack>
        </SimpleGrid>
      </Container>
      <Container
        bg={"gray.200"}
        minW={"full"}
        maxW={"6xl"}
        py={8}
        align={"center"}
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={"gray.300"}
      >
        <Text>{t("footer.copyright")}</Text>
      </Container>
    </Box>
  );
};

export default Footer;
