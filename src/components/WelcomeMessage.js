import React from "react";
import { Text } from "@chakra-ui/react";

function WelcomeMessage() {
    return (
      <div>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Welcome to AudioScripter  <span role="img" aria-label="wave emoji">👋</span>
          </Text>

          <Text mb={4}>
            Enhance your language skills with our intuitive application. Begin by selecting your primary language from the dropdown menu below.
          </Text>
      </div>
    )
}

export default WelcomeMessage;