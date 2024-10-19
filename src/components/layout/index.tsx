import { Box } from "@chakra-ui/react";

interface Prop {
  children: any;
}

const Layaut = ({ children }: Prop) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height='100%'
      overflow="hidden"
      position="relative"
      backgroundImage="/assets/bg-spectral.webp"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      padding='40px 0'
    >
      <Box
        display="flex"
        w="100%"
        height="100%"
        content=""
        top={0}
        left={0}
        position="absolute"
        bg="rgba(0,0,0, .9)"
        zIndex={5}
      />

      <Box
        display="flex"
        alignItems="center"
        flexDir="column"
        w="100%"
        zIndex={10}
        gap={10}
        padding="20px"
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layaut;
