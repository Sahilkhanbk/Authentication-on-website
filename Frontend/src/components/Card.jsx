import React from 'react'
import { Card as ChakraCard } from '@chakra-ui/react'

const Card = ({ children }) => {
    return (
        <ChakraCard
            bg={{ base: "transparent", md: "white" }}
            p={{ base: "3", md: "6" }}
            borderRadius={{ base: "none", md: "1rem" }}
            w="452px"
            boxShadow={{ base: "none", md: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
        >
            {children}
        </ChakraCard>
    )
}

export default Card
