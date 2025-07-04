import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Select,
  Switch,
  Text,
  Divider,
  useToast,
} from '@chakra-ui/react';

const IntegrationSettingsModal = ({ isOpen, onClose, platform }) => {
  const toast = useToast();

  const handleSave = () => {
    toast({
      title: 'Ayarlar kaydedildi',
      description: `${platform.name} entegrasyonu başarıyla güncellendi.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{platform?.name} Entegrasyon Ayarları</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>API Anahtarı</FormLabel>
              <Input placeholder="API anahtarınızı girin" type="password" />
            </FormControl>

            <FormControl>
              <FormLabel>API Secret</FormLabel>
              <Input placeholder="API secret anahtarınızı girin" type="password" />
            </FormControl>

            <FormControl>
              <FormLabel>Satıcı ID</FormLabel>
              <Input placeholder="Satıcı ID'nizi girin" />
            </FormControl>

            <Divider my={4} />

            <Text fontWeight="medium" mb={2}>Senkronizasyon Ayarları</Text>

            <FormControl>
              <FormLabel>Senkronizasyon Sıklığı</FormLabel>
              <Select defaultValue="15">
                <option value="5">Her 5 dakikada</option>
                <option value="15">Her 15 dakikada</option>
                <option value="30">Her 30 dakikada</option>
                <option value="60">Her saatte</option>
              </Select>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Otomatik Stok Güncelleme</FormLabel>
              <Switch defaultChecked colorScheme="blue" />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Otomatik Fiyat Güncelleme</FormLabel>
              <Switch defaultChecked colorScheme="blue" />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Sipariş Bildirimleri</FormLabel>
              <Switch defaultChecked colorScheme="blue" />
            </FormControl>

            <Divider my={4} />

            <Text fontWeight="medium" mb={2}>Varsayılan Ayarlar</Text>

            <FormControl>
              <FormLabel>Kargo Şablonu</FormLabel>
              <Select defaultValue="default">
                <option value="default">Varsayılan Kargo</option>
                <option value="express">Express Kargo</option>
                <option value="economy">Ekonomik Kargo</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Komisyon Oranı (%)</FormLabel>
              <Input type="number" defaultValue="15" />
            </FormControl>

            <Button colorScheme="blue" onClick={handleSave} mt={4}>
              Ayarları Kaydet
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default IntegrationSettingsModal; 