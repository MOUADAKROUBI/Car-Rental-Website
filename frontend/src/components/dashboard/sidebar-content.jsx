import {
  Box,
  Flex,
  Text,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  IconButton,
  Image,
} from "@chakra-ui/react";
import NavItem from "./nav-item";
import { FaUserFriends } from "react-icons/fa";
import { GiHomeGarage } from "react-icons/gi";
import { RiHomeLine } from "react-icons/ri";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const SidebarContent = ({ handleData, ...props }) => {
  const sidebar = useDisclosure();
  // Get the current location object using useLocation hook
  const location = useLocation();
    
  // Parse the query string parameters from the location object
  const searchParams = new URLSearchParams(location.search);

  // Get the value of the 'tab' parameter from the query string
  const tabValue = searchParams.get('tab');
  useEffect(() => {
    handleData(tabValue)
  }, [tabValue])

  const navItems = [
    {
      icon: FaUserFriends,
      label: "users",
      tab: "Users",
    },
    {
      icon: RiHomeLine,
      label: "homes",
      tab: "Homes",
    },
    {
      icon: GiHomeGarage,
      label: "rents",
      tab: "Rents",
    },
  ];

  const navItemsCom = navItems.map((item, index) => (
    <Link to={`?tab=${item.tab}`} key={index}>
      <NavItem
        icon={item.icon}
      >
        {item.label}
      </NavItem>
    </Link>
  ));

  return (
    <>
      <Box
        display={{
          base: "none",
          md: "unset",
        }}
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg="blue.700"
        borderColor="blackAlpha.300"
        borderRightWidth="1px"
        w="60"
        {...props}
      >
        <Flex px="4" py="5" align="center">
          <Link className="navbar-brand text-white fw-bold d-flex align-items-center justify-content-center" ml="2" to="/">
            <Image src="/logo.png" style={{ width: "50px", margin: "5px" }} />
            SAROTI
          </Link>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="sm"
          color="gray.600"
          aria-label="Main Navigation"
        >
          { navItemsCom }
        </Flex>
      </Box>
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
        
      >
        <DrawerOverlay />
        <DrawerContent bg={"red"}>
          <Box
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            bg="blue.700"
            borderColor="blackAlpha.300"
            borderRightWidth="1px"
            w="full"
            {...props}
          >
            <Flex px="4" py="5" align="center">
              <Text fontSize="2xl" ml="2" color="white" fontWeight="semibold">
                LOCAVO
              </Text>
            </Flex>
            <Flex
              direction="column"
              as="nav"
              fontSize="sm"
              color="gray.600"
              aria-label="Main Navigation"
            >
              { navItemsCom }
            </Flex>
          </Box>
        </DrawerContent>
      </Drawer>

      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Menu"
        display={{
          base: "inline-flex",
          md: "none",
        }}
        onClick={sidebar.onOpen}
        size="lg"
      />
    </>
  );
};

export default SidebarContent;