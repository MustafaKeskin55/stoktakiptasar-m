import { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Button,
  useToast,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Select,
  Text,
  Flex,
} from '@chakra-ui/react';
import styles from './Settings.module.css';

const Settings = () => {
  const toast = useToast();
  const [settings, setSettings] = useState({
    companyName: 'Şirket Adı',
    email: 'info@sirket.com',
    phone: '0212 123 45 67',
    address: 'İstanbul, Türkiye',
    currency: 'TRY',
    language: 'tr',
    notifications: {
      email: true,
      stockAlerts: true,
      orderUpdates: true,
    },
  });

  const handleSave = () => {
    // API çağrısı yapılacak
    toast({
      title: 'Ayarlar kaydedildi.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex minH="100vh">
      <Box flex="1" ml="250px">
        <Box p={4} bg="gray.50">
          <Heading size="lg" mb={6}>Ayarlar</Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Card>
              <CardHeader>
                <Heading size="md">Şirket Bilgileri</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Şirket Adı</FormLabel>
                    <Input
                      value={settings.companyName}
                      onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>E-posta</FormLabel>
                    <Input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Telefon</FormLabel>
                    <Input
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Adres</FormLabel>
                    <Input
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    />
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <Heading size="md">Sistem Ayarları</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Para Birimi</FormLabel>
                    <Select
                      value={settings.currency}
                      onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                    >
                      <option value="TRY">Türk Lirası (₺)</option>
                      <option value="USD">Amerikan Doları ($)</option>
                      <option value="EUR">Euro (€)</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Dil</FormLabel>
                    <Select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    >
                      <option value="tr">Türkçe</option>
                      <option value="en">English</option>
                    </Select>
                  </FormControl>

                  <Box mt={4}>
                    <Text fontWeight="medium" mb={4}>Bildirim Ayarları</Text>
                    <VStack spacing={3} align="stretch">
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">E-posta Bildirimleri</FormLabel>
                        <Switch
                          isChecked={settings.notifications.email}
                          onChange={(e) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, email: e.target.checked }
                          })}
                        />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">Stok Uyarıları</FormLabel>
                        <Switch
                          isChecked={settings.notifications.stockAlerts}
                          onChange={(e) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, stockAlerts: e.target.checked }
                          })}
                        />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">Sipariş Güncellemeleri</FormLabel>
                        <Switch
                          isChecked={settings.notifications.orderUpdates}
                          onChange={(e) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, orderUpdates: e.target.checked }
                          })}
                        />
                      </FormControl>
                    </VStack>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          <Button
            colorScheme="blue"
            mt={6}
            onClick={handleSave}
          >
            Ayarları Kaydet
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Settings; 