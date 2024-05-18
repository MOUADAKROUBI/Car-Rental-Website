import {
  Box,
  Text,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const AvatarMenu = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const to_route = useNavigate();
  const navigate = (route) => {
    to_route(route);
  };
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/" + localStorage.getItem("userID"))
    .then((response) => {
      setUser(response.data.data);
    })
    .catch((e) => {
      console.error(e);
    });
  }, [])

  const handleLogout = (e) => {
    e.preventDefault();

    axios.get(import.meta.env.VITE_BACKEND_URL+"/api/logout")
    .then((response) => {
      localStorage.clear();
      // setIsLoggedIn(false);
      navigate("/");
    })
    .catch((e) => {
      // ...
      console.error(e);
    });
  };

  const [currentLanguage, setCurrentLanguage] = useState("en");

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <Box px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                src={user.avatar && (import.meta.env.VITE_BACKEND_URL+"/" + user.avatar) || ""}
              />
            </MenuButton>
            <MenuList>
              <Box mt={4} textAlign="center">
                <Text fontWeight="bold">{user.firstname+' '+user.lastname}</Text>
                <Text fontSize="sm" color={"gray"}>
                  {user.email}
                </Text>
              </Box>
              <MenuDivider />
              <MenuItem onClick={() => navigate("/")}>
                {t("menuList.home")}
              </MenuItem>
              <MenuItem onClick={() => navigate("/profile")}>
                {t("menuList.profile")}
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => changeLanguage("en")}
                style={{ display: currentLanguage === "en" ? "none" : "block" }}
              >
                {t("menuList.english")}
              </MenuItem>
              <MenuItem
                onClick={() => changeLanguage("fr")}
                style={{ display: currentLanguage === "fr" ? "none" : "block" }}
              >
                {t("menuList.french")}
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>{t("menuList.logout")}</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AvatarMenu;
