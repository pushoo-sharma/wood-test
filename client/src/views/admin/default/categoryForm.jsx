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
import { useEffect, useState } from "react";

const CategoryForm = ({ open, onClose, onSave, defaultCategory }) => {
  const textColor = useColorModeValue("navy.700", "white");
  const errorTextColorBrand = useColorModeValue("red.500", "white");

  const [categoryName, setCategoryName] = useState("");
  const [categoryImageUrl, setCategoryImageUrl] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { service } = useAuth();

  useEffect(() => {
    if (defaultCategory) {
      setCategoryImageUrl(defaultCategory.image);
      setCategoryName(defaultCategory.name);
    }
  }, [defaultCategory]);

  const saveCategory = async () => {
    try {
      setLoading(true);
      await service.saveCategory(categoryName, categoryImageUrl);
      onSave();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const save = () => {
    if (defaultCategory) return editCategory();
    return saveCategory();
  };

  const editCategory = async () => {
    try {
      setLoading(true);
      await service.editCategory(
        defaultCategory._id,
        categoryName,
        categoryImageUrl
      );
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
        <ModalHeader>Category</ModalHeader>
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
                Category Name<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                placeholder="Food"
                mb="24px"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
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
                Category Image Url<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="text"
                placeholder="Food"
                mb="24px"
                value={categoryImageUrl}
                onChange={(e) => setCategoryImageUrl(e.target.value)}
                fontWeight="500"
                size="lg"
              />
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

export default CategoryForm;
