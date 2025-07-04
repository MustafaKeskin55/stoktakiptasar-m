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
} from '@chakra-ui/react';
import { useState } from 'react';

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    price: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct({
      ...formData,
      status: formData.quantity > 5 ? 'Stokta' : formData.quantity === 0 ? 'Tükendi' : 'Az',
    });
    onClose();
    setFormData({ name: '', category: '', quantity: 0, price: 0 });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Yeni Ürün Ekle</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <VStack spacing="4">
              <FormControl isRequired>
                <FormLabel>Ürün Adı</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ürün adını girin"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Kategori</FormLabel>
                <Select
                  placeholder="Kategori seçin"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Elektronik">Elektronik</option>
                  <option value="Giyim">Giyim</option>
                  <option value="Gıda">Gıda</option>
                  <option value="Mobilya">Mobilya</option>
                  <option value="Kozmetik">Kozmetik</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Miktar</FormLabel>
                <NumberInput
                  min={0}
                  value={formData.quantity}
                  onChange={(value) => setFormData({ ...formData, quantity: parseInt(value) })}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Fiyat (₺)</FormLabel>
                <NumberInput
                  min={0}
                  value={formData.price}
                  onChange={(value) => setFormData({ ...formData, price: parseFloat(value) })}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              İptal
            </Button>
            <Button colorScheme="blue" type="submit">
              Ekle
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal; 