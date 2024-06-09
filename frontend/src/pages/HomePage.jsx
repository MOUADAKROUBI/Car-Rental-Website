import { Container, Flex, Image, Menu, MenuButton, MenuItem, MenuList, VStack } from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";
import NavbarLoginButtons from "../components/navbar/login-buttons";
import HomePageText from "../components/home/home-page-text";
import HomePageButton from "../components/home/home-page-button";
import HomePageImage from "../components/home/home-page-image";
import Footer from "../components/footer";
import ClientSpeak from "../components/home/client-speak";
import AvatarMenu from "../components/navbar/avatar-menu";
import useAuthentication from "../useAuthentication";
import WhyChooseUs from "../components/home/why-choose-us";
import HomeSidebarContent from "../components/home/home-sidebar-content";
import NavbarLinks from "../components/navbar/NavbarLinks";
import { useEffect, useState } from "react";
import FeaturedHomes from "../components/home/featured-Homes";
import { BellIcon, HamburgerIcon } from "@chakra-ui/icons";
import axios from "axios";

function Home() {
  const { isLoggedIn } = useAuthentication();
  const [showNavbarContent, setShowNavbarContent] = useState(false);
  const [rents, setRents] = useState([]);

  useEffect(() => {
    isLoggedIn ?
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${localStorage.getItem("userID")}/rents`)
    .then((response) => {
      if (response.status === 200) {
        setRents(response.data.data);
      }
    })
    .catch((e) => {
      console.error(e);
    }) : 
    setRents([])
  }, [isLoggedIn]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavbarContent(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Navbar
        sidebarContent={<HomeSidebarContent />}
        links={<NavbarLinks />}
        buttons={
          showNavbarContent &&
          (isLoggedIn ? (
            <>
              <Menu>
                <MenuButton
                  as={BellIcon}
                  aria-label='Options'
                  icon={<HamburgerIcon />}
                  variant='outline'
                  className="fs-1 cursor-pointer"
                />
                <MenuList style={{maxWidth: 450}}>
                  {
                    rents.length === 0 ? <div className="pb-2 ps-2">you have no notifications</div> : <div className="pb-2 ps-2">{`you have ${rents.length} notifications`}</div>
                  }
                  {
                    rents.map((rent) => (
                      <MenuItem key={rent.id}>
                        <Image src={`${import.meta.env.VITE_BACKEND_URL}/${rent.home.photo1}`} alt="home image" className="me-2 rounded-circle" style={{width: 50, height: 50}} />
                        your rent has been {rent.status} by the owner of the house you applied for on {Date(rent.updated_at)}
                      </MenuItem>
                    ))
                  }
                </MenuList>
              </Menu>
              <AvatarMenu />
            </>
          ) : <NavbarLoginButtons />)
        }
      />
      <Container overflow="hidden" maxWidth="1720px" px={[12, 8, 8]}>
        <Flex h="100vh" rowGap={4} direction={"row"}>
          <VStack
            alignItems="start"
            justifyContent="center"
            spacing={7}
            px={[0, 12, 4, 8]}
            h="full"
          >
            <HomePageText />
            <HomePageButton />
          </VStack>
          <HomePageImage />
        </Flex>
      </Container>
      <FeaturedHomes />
      <WhyChooseUs />
      <ClientSpeak />
      <Footer />
    </>
  );
}

export default Home;
