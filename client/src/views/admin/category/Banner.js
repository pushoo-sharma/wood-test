// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import banner from "assets/img/auth/banner.png";
import Card from "components/card/Card.js";
import { useCart } from "contexts/CartContext";
import React from "react";
import { useState } from "react";

export default function Banner(props) {
  const { image, name, description, identifier } = props.product;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  let bgButton = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const textColor = useColorModeValue("navy.700", "white");

  const [initialView, setInitialView] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart()

  const handleAddToCart = async () => {
    addItem(props.product, quantity)
  };

  const handleQuantity = () => {
    setInitialView(false);
  };

  return (
    <Card mb={{ base: "0px", lg: "20px" }} align="center">
      <Box
        bg={`url(${image ?? banner})`}
        bgSize="cover"
        borderRadius="16px"
        h="200px"
        w="100%"
      />
      <Avatar
        mx="auto"
        // src={avatar}
        h="87px"
        w="87px"
        mt="-43px"
        name={name}
        border="4px solid"
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize="sm">
        {description}
      </Text>
      <Flex w="max-content" mx="auto" mt="26px">
        <Flex
          mx="auto"
          align="center"
          justifyContent={"space-between"}
          direction="column"
        >
          <Text color={textColorPrimary} fontSize="1xl" fontWeight="700">
            {identifier}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Identifier
          </Text>
        </Flex>
      </Flex>
      <Flex w="100%">
        {initialView && (
          <Button w="100%" marginTop={8} bg={bgButton} onClick={handleQuantity}>
            Place Order
          </Button>
        )}
        {!initialView && (
          <Flex w="100%" mt={8} direction={"column"}>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Quantity<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="number"
              placeholder="1"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              fontWeight="500"
              size="lg"
              mb={4}
            />
            <Button w="100%" bg={bgButton} onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Flex>
        )}
      </Flex>
    </Card>
  );
}
