import { Box, Button } from "@chakra-ui/react";

interface PropsButton {
  children: any;
  onClick: () => void,
  isDisabled?: boolean
}

const ButtonPrimary = ({ children, onClick, isDisabled }: PropsButton) => {
  return (
    <Button
      w="100%"
      maxW="390px"
      h='70px'
      onClick={onClick}
      bg="transparent"
      borderRadius="50px"
      border="none"
      color="white"
      isDisabled={isDisabled}
      _hover={{
        color: "var(--color-button)",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="100%"
        h="55px"
        backgroundImage="/assets/boton.webp"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        objectFit='cover'
        fontSize={{ base: "xs", md: "md" }}
      >
        {children}
      </Box>
    </Button>
  );
};

export default ButtonPrimary;
