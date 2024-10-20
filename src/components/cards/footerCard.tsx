import { Box, Text, Button } from "@chakra-ui/react";

interface UrlProp {
  handleShare: () => void;
  urlShare: boolean;
}

const FooterCard = ({ handleShare, urlShare }: UrlProp) => {
  return (
    <Box
      display="flex"
      w="100%"
      h="60px"
      alignItems="center"
      justifyContent="center"
      gap={2}
      padding="10px 20px"
      bg="#000000ba"
    >
      <Box
        display="flex"
        alignItems="center"
        maxW="300px"
        w="100%"
        h="auto"
        gap="5px"
      >
        <img
          src="https://res.cloudinary.com/diccp2984/image/upload/v1725981015/samples/cloudinary-icon.png"
          style={{
            width: "40px",
            height: "auto",
          }}
          alt="logo de cloudinay"
        />
        <Text
          fontSize={{ base: "10px", md: "md" }}
          as="span"
          color="white"
          fontWeight="600"
        >
          Cloudinary
        </Text>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        maxW="300px"
        w="100%"
        h="auto"
        gap="5px"
      >
        <img
          src="https://res.cloudinary.com/diccp2984/image/upload/v1729367628/logo/m4xnrjb9b6ygw83sqnq0.png"
          style={{
            width: "40px",
            height: "auto",
          }}
          alt="logo de cloudinay"
        />
        <Text
          fontSize={{ base: "10px", md: "md" }}
          as="span"
          color="white"
          fontWeight="600"
        >
          MiduDev
        </Text>
      </Box>
      <Box w="100%">
        <Button
          onClick={handleShare}
          isLoading={urlShare}
          isDisabled={urlShare}
          w="100%"
        >
          {" "}
          Compartir{" "}
        </Button>
      </Box>
    </Box>
  );
};

export default FooterCard;
