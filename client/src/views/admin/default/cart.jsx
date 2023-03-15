import {
  Button,
  Flex,
  Image,
  MenuItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import banner from "assets/img/auth/banner.png";

import { useCart } from "contexts/CartContext";
import { useEffect } from "react";
import { useState } from "react";

const Cart = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const errorTextColorBrand = useColorModeValue("red.500", "white");
  const {
    items,
    loading,
    analyze,
    buy,
    error,
    buyLoading,
    fetchPriceCompleted,
  } = useCart();

  const [isGetPrice, setIsGetPrice] = useState(true);
  const showOrder = () => setIsGetPrice(false);
  const hideOrder = () => setIsGetPrice(true);

  useEffect(() => {
    if (fetchPriceCompleted) {
      showOrder();
    } else {
      hideOrder();
    }
  }, [fetchPriceCompleted]);

  const handleGetPrice = () => {
    analyze();
  };

  const handlePurchase = () => {
    buy();
  };

  return (
    <Flex direction={"column"}>
      <Flex justify="space-between" w="100%" mb="20px">
        <Text fontSize="md" fontWeight="600" color={textColor}>
          Cart
        </Text>
      </Flex>
      <Flex flexDirection="column">
        {items.map((item) => {
          return (
            <MenuItem
              key={item.product._id}
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              px="0"
              borderRadius="8px"
              mb="10px"
            >
              <Flex
                justify="center"
                align="center"
                borderRadius="16px"
                minH={{ base: "60px", md: "70px" }}
                h={{ base: "60px", md: "70px" }}
                minW={{ base: "60px", md: "70px" }}
                w={{ base: "60px", md: "70px" }}
                me="14px"
                bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
              >
                <Image
                  src={item.product.image ?? banner}
                  borderRadius="16px"
                  h="16"
                  w="100%"
                />
              </Flex>
              <Flex flexDirection="column" w="100%">
                <Text
                  mb="5px"
                  fontWeight="bold"
                  color={textColor}
                  fontSize={{ base: "md", md: "md" }}
                >
                  {item.product.name}
                </Text>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  w="100%"
                >
                  <Text
                    fontSize={{ base: "sm", md: "sm" }}
                    lineHeight="100%"
                    color={textColor}
                  >
                    {item.product.identifier} - {item.quantity}
                  </Text>
                  {item.totalCost && (
                    <Text
                      fontSize={{ base: "sm", md: "sm" }}
                      lineHeight="100%"
                      fontWeight="bold"
                      color={textColor}
                    >
                      ${item.totalCost.toFixed(2)}
                    </Text>
                  )}
                </Flex>
                {error && (
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text
                      color={errorTextColorBrand}
                      fontSize={{ base: "sm", md: "sm" }}
                      lineHeight="100%"
                    >
                      {error}
                    </Text>
                  </Flex>
                )}
                {item.remainingQuantity ? (
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text
                      fontSize={{ base: "sm", md: "sm" }}
                      color={errorTextColorBrand}
                      lineHeight="100%"
                    >
                      Only {item.quantity - item.remainingQuantity} Available
                    </Text>
                  </Flex>
                ) : (
                  ""
                )}
              </Flex>
            </MenuItem>
          );
        })}
        {items.length ? (
          <Button w="100%" marginTop={8} onClick={handleGetPrice}>
            {loading ? "Calculating" : "Get Price"}
          </Button>
        ) : (
          ""
        )}
        {items.length && !isGetPrice ? (
          <Button w="100%" marginTop={8} onClick={handlePurchase}>
            {buyLoading ? "Loading.." : "Purchase"}
          </Button>
        ) : (
          ""
        )}
      </Flex>
    </Flex>
  );
};

export default Cart;
