import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Button,
  VStack,
  HStack,
  Divider,
  useToast,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Icon,
  Flex,
  useBreakpointValue,
  Avatar,
  Badge,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { 
  FiUser, 
  FiBell, 
  FiLock, 
  FiGlobe, 
  FiDollarSign, 
  FiCreditCard, 
  FiTruck, 
  FiPrinter, 
  FiMail, 
  FiCheck, 
  FiEye, 
  FiEyeOff 
} from 'react-icons/fi';

const Settings = () => {
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Ayarlar kaydedildi",
        description: "Değişiklikleriniz başarıyla kaydedildi.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
    }, 1000);
  };

  const tabOrientation = useBreakpointValue({ base: "column", md: "horizontal" });

  return (
    <Box>
      <Box mb={6}>
        <Heading size="lg" mb={2}>Ayarlar</Heading>
        <Text color="gray.600">Sistem ayarlarını buradan yönetebilirsiniz</Text>
      </Box>

      <Card variant="outline" borderRadius="lg" overflow="hidden">
        <Tabs 
          isFitted={isMobile} 
          variant="enclosed" 
          colorScheme="brand" 
          orientation={tabOrientation}
        >
          <TabList 
            borderBottomWidth={isMobile ? "1px" : "0"}
            borderRightWidth={!isMobile ? "1px" : "0"}
            borderRightColor="gray.200"
            w={!isMobile ? "250px" : "100%"}
            flexDirection={isMobile ? "row" : "column"}
            overflowX={isMobile ? "auto" : "visible"}
            overflowY={!isMobile ? "auto" : "visible"}
            position={!isMobile ? "sticky" : "relative"}
            top={!isMobile ? "0" : "auto"}
            maxH={!isMobile ? "600px" : "auto"}
          >
            <Tab 
              _selected={{ color: 'brand.500', borderColor: 'brand.500', bg: 'brand.50' }} 
              py={3}
              display="flex" 
              alignItems="center" 
              justifyContent={isMobile ? "center" : "flex-start"}
              textAlign="left"
              px={4}
            >
              <Icon as={FiUser} mr={isMobile ? 0 : 2} />
              {!isMobile && "Hesap Bilgileri"}
            </Tab>
            <Tab 
              _selected={{ color: 'brand.500', borderColor: 'brand.500', bg: 'brand.50' }} 
              py={3}
              display="flex" 
              alignItems="center" 
              justifyContent={isMobile ? "center" : "flex-start"}
              textAlign="left"
              px={4}
            >
              <Icon as={FiBell} mr={isMobile ? 0 : 2} />
              {!isMobile && "Bildirim Ayarları"}
            </Tab>
            <Tab 
              _selected={{ color: 'brand.500', borderColor: 'brand.500', bg: 'brand.50' }} 
              py={3}
              display="flex" 
              alignItems="center" 
              justifyContent={isMobile ? "center" : "flex-start"}
              textAlign="left"
              px={4}
            >
              <Icon as={FiLock} mr={isMobile ? 0 : 2} />
              {!isMobile && "Güvenlik"}
            </Tab>
            <Tab 
              _selected={{ color: 'brand.500', borderColor: 'brand.500', bg: 'brand.50' }} 
              py={3}
              display="flex" 
              alignItems="center" 
              justifyContent={isMobile ? "center" : "flex-start"}
              textAlign="left"
              px={4}
            >
              <Icon as={FiGlobe} mr={isMobile ? 0 : 2} />
              {!isMobile && "Sistem Ayarları"}
            </Tab>
            <Tab 
              _selected={{ color: 'brand.500', borderColor: 'brand.500', bg: 'brand.50' }} 
              py={3}
              display="flex" 
              alignItems="center" 
              justifyContent={isMobile ? "center" : "flex-start"}
              textAlign="left"
              px={4}
            >
              <Icon as={FiDollarSign} mr={isMobile ? 0 : 2} />
              {!isMobile && "Fatura Ayarları"}
            </Tab>
          </TabList>

          <TabPanels>
            {/* Hesap Bilgileri */}
            <TabPanel p={{ base: 3, md: 6 }}>
              <Heading size="md" mb={6}>Hesap Bilgileri</Heading>
              
              <Flex direction={{ base: "column", md: "row" }} gap={6} mb={6}>
                <Box textAlign="center" mb={{ base: 4, md: 0 }}>
                  <Avatar 
                    size="xl" 
                    name="Admin User" 
                    bg="brand.500" 
                    mb={3}
                  />
                  <Button size="sm" colorScheme="brand" variant="outline">
                    Fotoğrafı Değiştir
                  </Button>
                </Box>
                
                <VStack spacing={4} align="stretch" flex={1}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl>
                      <FormLabel>Ad</FormLabel>
                      <Input defaultValue="Admin" />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Soyad</FormLabel>
                      <Input defaultValue="User" />
                    </FormControl>
                  </SimpleGrid>
                  
                  <FormControl>
                    <FormLabel>E-posta</FormLabel>
                    <Input defaultValue="admin@stoktakip.com" type="email" />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>Telefon</FormLabel>
                    <Input defaultValue="+90 (555) 123-4567" />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>Pozisyon</FormLabel>
                    <Input defaultValue="Sistem Yöneticisi" />
                  </FormControl>
                </VStack>
              </Flex>
              
              <Flex justify="flex-end" mt={6}>
                <Button colorScheme="brand" onClick={handleSave} isLoading={loading}>
                  Değişiklikleri Kaydet
                </Button>
              </Flex>
            </TabPanel>

            {/* Bildirim Ayarları */}
            <TabPanel p={{ base: 3, md: 6 }}>
              <Heading size="md" mb={6}>Bildirim Ayarları</Heading>
              
              <VStack spacing={4} align="stretch">
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel mb={0}>E-posta Bildirimleri</FormLabel>
                    <Text fontSize="sm" color="gray.600">Sistem bildirimleri e-posta adresinize gönderilir</Text>
                  </Box>
                  <Switch defaultChecked colorScheme="brand" />
                </FormControl>
                
                <Divider />
                
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel mb={0}>Stok Uyarıları</FormLabel>
                    <Text fontSize="sm" color="gray.600">Stok seviyesi kritik eşiğe ulaştığında bildirim al</Text>
                  </Box>
                  <Switch defaultChecked colorScheme="brand" />
                </FormControl>
                
                <Divider />
                
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel mb={0}>Sipariş Bildirimleri</FormLabel>
                    <Text fontSize="sm" color="gray.600">Yeni sipariş geldiğinde bildirim al</Text>
                  </Box>
                  <Switch defaultChecked colorScheme="brand" />
                </FormControl>
                
                <Divider />
                
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel mb={0}>Günlük Özet Raporu</FormLabel>
                    <Text fontSize="sm" color="gray.600">Günlük satış ve stok özeti gönder</Text>
                  </Box>
                  <Switch colorScheme="brand" />
                </FormControl>
              </VStack>
              
              <Flex justify="flex-end" mt={6}>
                <Button colorScheme="brand" onClick={handleSave} isLoading={loading}>
                  Değişiklikleri Kaydet
                </Button>
              </Flex>
            </TabPanel>

            {/* Güvenlik */}
            <TabPanel p={{ base: 3, md: 6 }}>
              <Heading size="md" mb={6}>Güvenlik Ayarları</Heading>
              
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading size="sm" mb={4}>Şifre Değiştir</Heading>
                  
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel>Mevcut Şifre</FormLabel>
                      <InputGroup>
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Mevcut şifrenizi girin" 
                        />
                        <InputRightElement>
                          <IconButton
                            variant="ghost"
                            aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                            icon={showPassword ? <FiEyeOff /> : <FiEye />}
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Yeni Şifre</FormLabel>
                      <Input type="password" placeholder="Yeni şifrenizi girin" />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Yeni Şifre (Tekrar)</FormLabel>
                      <Input type="password" placeholder="Yeni şifrenizi tekrar girin" />
                    </FormControl>
                  </VStack>
                </Box>
                
                <Divider />
                
                <Box>
                  <Heading size="sm" mb={4}>İki Faktörlü Doğrulama</Heading>
                  
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <FormLabel mb={0}>İki Faktörlü Doğrulama</FormLabel>
                      <Text fontSize="sm" color="gray.600">Hesabınıza giriş yaparken ek güvenlik katmanı ekleyin</Text>
                    </Box>
                    <Switch colorScheme="brand" />
                  </FormControl>
                </Box>
              </VStack>
              
              <Flex justify="flex-end" mt={6}>
                <Button colorScheme="brand" onClick={handleSave} isLoading={loading}>
                  Değişiklikleri Kaydet
                </Button>
              </Flex>
            </TabPanel>

            {/* Sistem Ayarları */}
            <TabPanel p={{ base: 3, md: 6 }}>
              <Heading size="md" mb={6}>Sistem Ayarları</Heading>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <FormControl>
                  <FormLabel>Dil</FormLabel>
                  <Select defaultValue="tr">
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Zaman Dilimi</FormLabel>
                  <Select defaultValue="europe-istanbul">
                    <option value="europe-istanbul">Europe/Istanbul (UTC+3)</option>
                    <option value="europe-london">Europe/London (UTC+0)</option>
                    <option value="america-new_york">America/New_York (UTC-5)</option>
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Para Birimi</FormLabel>
                  <Select defaultValue="try">
                    <option value="try">Türk Lirası (₺)</option>
                    <option value="usd">US Dollar ($)</option>
                    <option value="eur">Euro (€)</option>
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Tarih Formatı</FormLabel>
                  <Select defaultValue="dd-mm-yyyy">
                    <option value="dd-mm-yyyy">DD-MM-YYYY</option>
                    <option value="mm-dd-yyyy">MM-DD-YYYY</option>
                    <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                  </Select>
                </FormControl>
              </SimpleGrid>
              
              <Divider my={6} />
              
              <Heading size="sm" mb={4}>Diğer Ayarlar</Heading>
              
              <VStack spacing={4} align="stretch">
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel mb={0}>Otomatik Yedekleme</FormLabel>
                    <Text fontSize="sm" color="gray.600">Sistem verilerini günlük olarak yedekle</Text>
                  </Box>
                  <Switch defaultChecked colorScheme="brand" />
                </FormControl>
                
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel mb={0}>Karanlık Mod</FormLabel>
                    <Text fontSize="sm" color="gray.600">Arayüzü karanlık modda görüntüle</Text>
                  </Box>
                  <Switch colorScheme="brand" />
                </FormControl>
              </VStack>
              
              <Flex justify="flex-end" mt={6}>
                <Button colorScheme="brand" onClick={handleSave} isLoading={loading}>
                  Değişiklikleri Kaydet
                </Button>
              </Flex>
            </TabPanel>

            {/* Fatura Ayarları */}
            <TabPanel p={{ base: 3, md: 6 }}>
              <Heading size="md" mb={6}>Fatura Ayarları</Heading>
              
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading size="sm" mb={4}>Şirket Bilgileri</Heading>
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl>
                      <FormLabel>Şirket Adı</FormLabel>
                      <Input defaultValue="StokTakip Ltd. Şti." />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Vergi Numarası</FormLabel>
                      <Input defaultValue="1234567890" />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Adres</FormLabel>
                      <Input defaultValue="İstanbul, Türkiye" />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Telefon</FormLabel>
                      <Input defaultValue="+90 (212) 555-0123" />
                    </FormControl>
                  </SimpleGrid>
                </Box>
                
                <Divider />
                
                <Box>
                  <Heading size="sm" mb={4}>Fatura Ayarları</Heading>
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl>
                      <FormLabel>Varsayılan KDV Oranı (%)</FormLabel>
                      <Input type="number" defaultValue="18" />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Ödeme Vadesi (Gün)</FormLabel>
                      <Input type="number" defaultValue="30" />
                    </FormControl>
                  </SimpleGrid>
                  
                  <FormControl mt={4} display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <FormLabel mb={0}>Otomatik Fatura Oluşturma</FormLabel>
                      <Text fontSize="sm" color="gray.600">Siparişler için otomatik fatura oluştur</Text>
                    </Box>
                    <Switch defaultChecked colorScheme="brand" />
                  </FormControl>
                </Box>
              </VStack>
              
              <Flex justify="flex-end" mt={6}>
                <Button colorScheme="brand" onClick={handleSave} isLoading={loading}>
                  Değişiklikleri Kaydet
                </Button>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Box>
  );
};

export default Settings;