import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Flex,
  FormLabel,
  Input,
  useColorModeValue,
  FormControl,
  Spinner,
} from "@chakra-ui/react";
import { useAuth } from "contexts/AuthContext";
import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const SupplyForm = ({
  open,
  onClose,
  onSave,
  defaultProductSupply,
  products = [],
}) => {
  const textColor = useColorModeValue("navy.700", "white");
  const errorTextColorBrand = useColorModeValue("red.500", "white");

  const [product, setProduct] = useState("");

  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { service } = useAuth();

  useEffect(() => {
    if (defaultProductSupply) {
      setStock(defaultProductSupply.stock);
      setPrice(defaultProductSupply.price);
      setProduct(defaultProductSupply.product._id);
    }
  }, [defaultProductSupply]);

  const saveProduct = async () => {
    try {
      setLoading(true);
      await service.saveProductSupply({
        stock,
        price,
        product,
      });
      onSave();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const save = () => {
    if (defaultProductSupply) return editProduct();
    return saveProduct();
  };

  const editProduct = async () => {
    try {
      setLoading(true);
      await service.editProductSupply({
        id: defaultProductSupply._id,
        product,
        stock,
        price,
      });
      onSave();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const brandStars = useColorModeValue("brand.500", "brand.400");
  return (
    <Modal blockScrollOnMount={false} isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Product</ModalHeader>
        <Text color={errorTextColorBrand} fontWeight="400" fontSize="14px">
          {error}
        </Text>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Flex direction="column">
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Stock<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                placeholder="Food"
                mb="24px"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                fontWeight="500"
                size="lg"
              />
            </Flex>
            <Flex direction="column">
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Price<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                placeholder="Food"
                mb="24px"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fontWeight="500"
                size="lg"
              />
            </Flex>
            <Flex direction="column">
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Product<Text color={brandStars}>*</Text>
              </FormLabel>
              <Select
                value={product}
                placeholder="Select Product"
                onChange={(e) => setProduct(e.target.value)}
              >
                {products.map((product) => {
                  return (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  );
                })}
              </Select>
            </Flex>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={save}>
            {loading ? <Spinner /> : "Save"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SupplyForm;
