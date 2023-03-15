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

const ProductForm = ({
  open,
  onClose,
  onSave,
  defaultProduct,
  categories = [],
}) => {
  const textColor = useColorModeValue("navy.700", "white");
  const errorTextColorBrand = useColorModeValue("red.500", "white");

  const [productName, setProductName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { service } = useAuth();

  useEffect(() => {
    if (defaultProduct) {
      setIdentifier(defaultProduct.identifier);
      setImage(defaultProduct.image);
      setDescription(defaultProduct.description)
      setProductName(defaultProduct.name);
      setCategory(defaultProduct.category._id);
    }
  }, [defaultProduct]);

  const saveProduct = async () => {
    try {
      setLoading(true);
      await service.saveProduct({
        name: productName,
        identifier,
        description,
        image,
        category,
      });
      onSave();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const save = () => {
    if (defaultProduct) return editProduct();
    return saveProduct();
  };

  const editProduct = async () => {
    try {
      setLoading(true);
      await service.editProduct({
        id: defaultProduct._id,
        name: productName,
        identifier,
        description,
        image,
        category,
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
                Product Name<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                placeholder="Food"
                mb="24px"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
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
                Product Identifier<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                placeholder="Food"
                mb="24px"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
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
                Product Image<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={false}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                placeholder="Food"
                mb="24px"
                value={image}
                onChange={(e) => setImage(e.target.value)}
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
                Product Description<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={false}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                placeholder="Food"
                mb="24px"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                Category<Text color={brandStars}>*</Text>
              </FormLabel>
              <Select
                value={category}
                placeholder="Select category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.name}
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

export default ProductForm;
