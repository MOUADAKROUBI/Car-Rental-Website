import { Box, GridItem, SimpleGrid, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import HomeCard from "../components/ui/home-card";
import Footer from "../components/footer";
import LoadingSpinner from "../components/ui/loading-spinner";
import AvatarMenu from "../components/navbar/avatar-menu";
import HomeSidebarContent from "../components/home/home-sidebar-content";
import NavbarLinks from "../components/navbar/NavbarLinks";
import SearchContext from "../Contexts/SearchContext";
import NavbarLoginButtons from "../components/navbar/login-buttons";
import useAuthentication from "../useAuthentication";

function BookHomesPage() {
  const { searchResults, setSearchResults } = useContext(SearchContext);
  const [homes, setHomes] = useState();
  const [isLoading, setLoading] = useState(true);
  const { isLoggedIn } = useAuthentication();

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/homes").then((response) => {
      setHomes(response.data.data);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Box flexGrow={1}>
        <Navbar
          sidebarContent={<HomeSidebarContent />}
          links={<NavbarLinks />}
          buttons={<>{isLoggedIn ? <AvatarMenu /> : <NavbarLoginButtons />}</>}
        />

        <VStack>
          <SimpleGrid
            columns={[1, 1, 2, 2, 3]}
            rowGap={6}
            columnGap={8}
            py={10}
          >
            {searchResults && searchResults.length > 0
              ? searchResults.map((home) => (
                  <GridItem key={home.id} colSpan={1}>
                    <HomeCard props={home} />
                  </GridItem>
                ))
              : homes.map((home) => (
                  <GridItem key={home.id} colSpan={1}>
                    <HomeCard props={home} />
                  </GridItem>
                ))}
          </SimpleGrid>
        </VStack>
      </Box>
      <Footer />
    </Box>
  );
}

export default BookHomesPage;
