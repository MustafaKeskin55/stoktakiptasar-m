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
  Box,
  Flex,
  HStack,
  Icon,
  Badge,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tooltip,
  useColorModeValue,
  ModalFooter,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiKey, FiLock, FiUser, FiClock, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

const IntegrationSettingsModal = ({ isOpen, onClose, platform }) => {
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    apiKey: '',
    apiSecret: '',
    sellerId: '',
    syncFrequency: '15',
    autoStockSync: true,
    autoPriceSync: true,
    orderNotifications: true,
    shippingTemplate: 'default',
    commissionRate: 15
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: 'Ayarlar kaydedildi',
        description: `${platform.name} entegrasyonu başarıyla güncellendi.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    }, 1000);
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const sectionBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" motionPreset="slideInBottom">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius="lg" boxShadow="xl">
        <ModalHeader borderBottomWidth="1px" borderColor={borderColor} py={4}>
          <Flex align="center" gap={3}>
            {platform?.icon && (
              <Box 
                bg={sectionBg} 
                p={2} 
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={platform.icon} boxSize={5} color="brand.500" />
              </Box>
            )}
            <Box>
              <Text fontSize="xl" fontWeight="bold">{platform?.name} Entegrasyon</Text>
              <Badge colorScheme="green" mt={1} fontSize="xs">Aktif</Badge>
            </Box>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody py={6}>
          <VStack spacing={6} align="stretch">
            <Box bg={sectionBg} p={4} borderRadius="md">
              <Text fontWeight="medium" mb={4}>API Bilgileri</Text>
              
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel fontWeight="medium">API Anahtarı</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FiKey color="var(--chakra-colors-gray-400)" />
                    </InputLeftElement>
                    <Input 
                      placeholder="API anahtarınızı girin" 
                      type="password" 
                      value={formData.apiKey}
                      onChange={(e) => handleChange('apiKey', e.target.value)}
                      borderRadius="md"
                      focusBorderColor="brand.500"
                    />
                    <InputRightElement width="4.5rem">
                      <Tooltip label="Bu bilgiyi platform yönetim panelinden alabilirsiniz" hasArrow placement="top">
                        <Box>
                          <FiInfo color="var(--chakra-colors-gray-400)" />
                        </Box>
                      </Tooltip>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="medium">API Secret</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FiLock color="var(--chakra-colors-gray-400)" />
                    </InputLeftElement>
                    <Input 
                      placeholder="API secret anahtarınızı girin" 
                      type="password"
                      value={formData.apiSecret}
                      onChange={(e) => handleChange('apiSecret', e.target.value)}
                      borderRadius="md"
                      focusBorderColor="brand.500"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="medium">Satıcı ID</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FiUser color="var(--chakra-colors-gray-400)" />
                    </InputLeftElement>
                    <Input 
                      placeholder="Satıcı ID'nizi girin"
                      value={formData.sellerId}
                      onChange={(e) => handleChange('sellerId', e.target.value)}
                      borderRadius="md"
                      focusBorderColor="brand.500"
                    />
                  </InputGroup>
                </FormControl>
              </VStack>
            </Box>

            <Box bg={sectionBg} p={4} borderRadius="md">
              <Text fontWeight="medium" mb={4}>Senkronizasyon Ayarları</Text>

              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel fontWeight="medium">Senkronizasyon Sıklığı</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FiClock color="var(--chakra-colors-gray-400)" />
                    </InputLeftElement>
                    <Select 
                      value={formData.syncFrequency}
                      onChange={(e) => handleChange('syncFrequency', e.target.value)}
                      pl="2.5rem"
                      borderRadius="md"
                      focusBorderColor="brand.500"
                    >
                      <option value="5">Her 5 dakikada</option>
                      <option value="15">Her 15 dakikada</option>
                      <option value="30">Her 30 dakikada</option>
                      <option value="60">Her saatte</option>
                    </Select>
                  </InputGroup>
                </FormControl>

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <HStack>
                    <Icon as={formData.autoStockSync ? FiCheckCircle : FiAlertCircle} 
                          color={formData.autoStockSync ? "green.500" : "gray.400"} />
                    <FormLabel mb="0" fontWeight="medium">Otomatik Stok Güncelleme</FormLabel>
                  </HStack>
                  <Switch 
                    isChecked={formData.autoStockSync}
                    onChange={(e) => handleChange('autoStockSync', e.target.checked)}
                    colorScheme="brand" 
                  />
                </FormControl>

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <HStack>
                    <Icon as={formData.autoPriceSync ? FiCheckCircle : FiAlertCircle} 
                          color={formData.autoPriceSync ? "green.500" : "gray.400"} />
                    <FormLabel mb="0" fontWeight="medium">Otomatik Fiyat Güncelleme</FormLabel>
                  </HStack>
                  <Switch 
                    isChecked={formData.autoPriceSync}
                    onChange={(e) => handleChange('autoPriceSync', e.target.checked)}
                    colorScheme="brand" 
                  />
                </FormControl>

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <HStack>
                    <Icon as={formData.orderNotifications ? FiCheckCircle : FiAlertCircle} 
                          color={formData.orderNotifications ? "green.500" : "gray.400"} />
                    <FormLabel mb="0" fontWeight="medium">Sipariş Bildirimleri</FormLabel>
                  </HStack>
                  <Switch 
                    isChecked={formData.orderNotifications}
                    onChange={(e) => handleChange('orderNotifications', e.target.checked)}
                    colorScheme="brand" 
                  />
                </FormControl>
              </VStack>
            </Box>

            <Box bg={sectionBg} p={4} borderRadius="md">
              <Text fontWeight="medium" mb={4}>Varsayılan Ayarlar</Text>

              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel fontWeight="medium">Kargo Şablonu</FormLabel>
                  <Select 
                    value={formData.shippingTemplate}
                    onChange={(e) => handleChange('shippingTemplate', e.target.value)}
                    borderRadius="md"
                    focusBorderColor="brand.500"
                  >
                    <option value="default">Varsayılan Kargo</option>
                    <option value="express">Express Kargo</option>
                    <option value="economy">Ekonomik Kargo</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="medium">Komisyon Oranı (%)</FormLabel>
                  <Input 
                    type="number" 
                    value={formData.commissionRate}
                    onChange={(e) => handleChange('commissionRate', e.target.value)}
                    borderRadius="md"
                    focusBorderColor="brand.500"
                  />
                </FormControl>
              </VStack>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
          <Button variant="outline" mr={3} onClick={onClose}>
            İptal
          </Button>
          <Button 
            colorScheme="brand" 
            onClick={handleSave}
            isLoading={isSaving}
            loadingText="Kaydediliyor"
            _hover={{ transform: 'translateY(-1px)', boxShadow: 'md' }}
          >
            Ayarları Kaydet
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default IntegrationSettingsModal; 