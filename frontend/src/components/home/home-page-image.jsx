import { Flex, Hide, Image } from "@chakra-ui/react";
import homePageImage from '/9694410_4241602.svg';


const HomePageImage = () => {
  return (
    <Hide below="md">
      <Flex w={["50%", "50%", "70%"]} alignItems="center" position="relative">
        <Image
          src={homePageImage}
          minW={"730px"}
        />
      </Flex>
    </Hide>
  );
};

export default HomePageImage;
