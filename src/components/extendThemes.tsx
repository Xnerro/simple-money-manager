import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

export const theme = extendTheme({
  fonts: {
    body: `'Edu VIC WA NT Beginner', cursive`,
    heading: `'Edu VIC WA NT Beginner', c
    ursive`,
  },
  styles: {
    global: (prop: StyleFunctionProps) => ({
      body: {
        bg: mode("white", "gray.800")(prop),
        color: mode("gray.800", "gray.200")(prop),
        maxW: "100%",
      },
      heading: {
        color: mode("gray.800", "gray.200")(prop),
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
  },
});
