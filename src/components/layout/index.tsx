import { Box } from "@chakra-ui/react";
import styles from "../../app/page.module.css";

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
      height={{ base: "auto", lg: "100vh" }}
      overflow="hidden"
      position="relative"
      backgroundImage="/assets/bg2.png"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <span className={styles.span} />
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
