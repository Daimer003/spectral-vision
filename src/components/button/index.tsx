import { Box, Button } from "@chakra-ui/react";

interface PropsButton {
  children: any;
  onClick: () => void;
}

const ButtonPrimary = ({ children, onClick }: PropsButton) => {
  return (
    <Button
      w="auto"
      h="auto"
      onClick={onClick}
      bg="transparent"
      borderRadius="50px"
      _hover="none"
      _focus="none"
      border="none"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="360px"
        h="47px"
        padding={3}
        backgroundImage="/assets/boton.webp"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        fontSize={{ base: "xs", md: "md" }}
        _hover={{
            color: "var(--color-button)"
        }}
      >
        {children}
      </Box>
    </Button>
  );
};

export default ButtonPrimary;
