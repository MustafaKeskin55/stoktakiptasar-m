import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,
  InputGroup,
  InputLeftElement,
  Divider,
  Text,
  Flex,
  Badge,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FiDollarSign, FiPackage } from 'react-icons/fi';

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    price: 0,
  });
  
  const [formTouched, setFormTouched] = useState({
    name: false,
    category: false,
    quantity: false,
    price: false,
  });

  const [preview, setPreview] = useState({
    status: 'Tükendi',
    color: 'red',
  });

  useEffect(() => {
    // Stok durumunu hesapla
    if (formData.quantity > 5) {
      setPreview({ status: 'Stokta', color: 'green' });
    } else if (formData.quantity > 0) {
      setPreview({ status: 'Az', color: 'orange' });
    } else {
      setPreview({ status: 'Tükendi', color: 'red' });
    }
  }, [formData.quantity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct({
      ...formData,
      status: preview.status,
    });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', category: '', quantity: 0, price: 0 });
    setFormTouched({ name: false, category: false, quantity: false, price: false });
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setFormTouched({ ...formTouched, [field]: true });
  };

  const isFormValid = () => {
    return formData.name && formData.category && formData.quantity >= 0 && formData.price > 0;
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" motionPreset="slideInBottom">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius="lg" boxShadow="xl">
        <form onSubmit={handleSubmit}>
          <ModalHeader borderBottomWidth="1px" borderColor={borderColor} py={4}>
            <Text fontSize="xl" fontWeight="bold">Yeni Ürün Ekle</Text>
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody py={6}>
            <VStack spacing="5" align="stretch">
              <FormControl isRequired isInvalid={formTouched.name && !formData.name}>
                <FormLabel fontWeight="medium">Ürün Adı</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  placeholder="Ürün adını girin"
                  borderRadius="md"
                  focusBorderColor="brand.500"
                />
                {formTouched.name && !formData.name && (
                  <FormHelperText color="red.500">Ürün adı gerekli</FormHelperText>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={formTouched.category && !formData.category}>
                <FormLabel fontWeight="medium">Kategori</FormLabel>
                <Select
                  placeholder="Kategori seçin"
                  value={formData.category}
                  onChange={(e) => handleFieldChange('category', e.target.value)}
                  borderRadius="md"
                  focusBorderColor="brand.500"
                >
                  <option value="Elektronik">Elektronik</option>
                  <option value="Giyim">Giyim</option>
                  <option value="Gıda">Gıda</option>
                  <option value="Mobilya">Mobilya</option>
                  <option value="Kozmetik">Kozmetik</option>
                </Select>
                {formTouched.category && !formData.category && (
                  <FormHelperText color="red.500">Kategori seçimi gerekli</FormHelperText>
                )}
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="medium">Miktar</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiPackage color="var(--chakra-colors-gray-400)" />
                  </InputLeftElement>
                  <NumberInput
                    min={0}
                    value={formData.quantity}
                    onChange={(value) => handleFieldChange('quantity', parseInt(value))}
                    w="100%"
                  >
                    <NumberInputField pl="2.5rem" borderRadius="md" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
              </FormControl>

              <FormControl isRequired isInvalid={formTouched.price && formData.price <= 0}>
                <FormLabel fontWeight="medium">Fiyat (₺)</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiDollarSign color="var(--chakra-colors-gray-400)" />
                  </InputLeftElement>
                  <NumberInput
                    min={0}
                    value={formData.price}
                    onChange={(value) => handleFieldChange('price', parseFloat(value))}
                    precision={2}
                    w="100%"
                  >
                    <NumberInputField pl="2.5rem" borderRadius="md" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
                {formTouched.price && formData.price <= 0 && (
                  <FormHelperText color="red.500">Fiyat sıfırdan büyük olmalı</FormHelperText>
                )}
              </FormControl>

              <Divider my={2} />
              
              <Box bg={bgColor} p={4} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                <Text fontWeight="medium" mb={3}>Ürün Önizleme</Text>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontWeight="bold">{formData.name || 'Ürün Adı'}</Text>
                    <Text fontSize="sm" color="gray.600">{formData.category || 'Kategori'}</Text>
                  </Box>
                  <Flex direction="column" align="flex-end">
                    <Badge colorScheme={preview.color} mb={2}>
                      {preview.status}
                    </Badge>
                    <Text fontWeight="bold">₺{formData.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</Text>
                  </Flex>
                </Flex>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
            <Button variant="outline" mr={3} onClick={onClose}>
              İptal
            </Button>
            <Button 
              colorScheme="brand" 
              type="submit" 
              isDisabled={!isFormValid()}
              _hover={{ transform: 'translateY(-1px)', boxShadow: 'md' }}
            >
              Ekle
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal; 