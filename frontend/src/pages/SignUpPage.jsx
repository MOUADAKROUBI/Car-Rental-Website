import { VStack, Center } from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";
import Card from "../components/form/card";
import SubCard from "../components/form/sub-card";
import SignUpForm from "../components/form/signup-form";
import { useTranslation } from "react-i18next";
import NavbarLinks from "../components/navbar/NavbarLinks";
import NavbarLoginButtons from "../components/navbar/login-buttons";
import HomeSidebarContent from "../components/home/home-sidebar-content";

function SignUp() {
  const { t } = useTranslation();
  return (
    <VStack h="100vh">
      <Navbar
        sidebarContent={<HomeSidebarContent />}
        links={<NavbarLinks />}
        buttons={<NavbarLoginButtons />}
      />

      <Center flexGrow={1} p={[4, 4, 0]} mt={[2, 8, 16]}>
        <Card>
          <SubCard
            textHoverColor="text-orange"
            bgColor="bg-secondary"
            route="/login"
            question={t("form.signupMessage")}
            btnText="Log In"
          />
          <SignUpForm />
        </Card>
      </Center>
    </VStack>
  );
}

export default SignUp;
