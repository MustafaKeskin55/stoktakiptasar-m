import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  IconButton,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Stack,
  InputGroup,
  InputLeftElement,
  Card,
  CardBody,
  SimpleGrid,
  Badge,
  Avatar,
  AvatarBadge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  VStack,
  HStack,
  Divider,
  Tooltip,
  Container
} from '@chakra-ui/react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiPhone, FiMail, FiPackage, FiUser, FiMapPin, FiTrendingUp, FiCalendar } from 'react-icons/fi';
import styles from './Suppliers.module.css';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    // Mock veri
    const mockSuppliers = [
      {
        id: 1,
        name: 'ABC Tedarik Ltd. Şti.',
        contact: 'Ahmet Yılmaz',
        phone: '+90 (532) 555-0101',
        email: 'ahmet@abctedarik.com',
        address: 'Kadıköy, İstanbul',
        productCount: 45,
        status: 'Aktif',
        lastOrder: '2024-03-10',
        totalOrders: 156,
        totalRevenue: 245000
      },
      {
        id: 2,
        name: 'XYZ Dağıtım A.Ş.',
        contact: 'Ayşe Demir',
        phone: '+90 (533) 555-0202',
        email: 'ayse@xyzdagitim.com',
        address: 'Çankaya, Ankara',
        productCount: 32,
        status: 'Aktif',
        lastOrder: '2024-03-12',
        totalOrders: 89,
        totalRevenue: 178000
      }
    ];
    setSuppliers(mockSuppliers);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    onOpen();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aktif':
        return 'green';
      case 'Pasif':
        return 'red';
      default:
        return 'gray';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Flex className={styles.container}>
      <Box className={styles.content}>
        {/* İstatistikler */}
        <Container maxW="container.xl" py={8}>
          <Flex justify="space-between" align="center" mb={8}>
            <VStack align="start" spacing={1}>
              <Heading size="lg">Tedarikçiler</Heading>
              <Text color="gray.600">Tedarikçilerinizi yönetin ve takip edin</Text>
            </VStack>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="blue"
              size="lg"
              onClick={() => {/* Yeni tedarikçi ekleme */}}
              className={styles.addButton}
            >
              Yeni Tedarikçi
            </Button>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Toplam Tedarikçi</StatLabel>
                  <StatNumber>{suppliers.length}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    20% artış
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Aktif Tedarikçiler</StatLabel>
                  <StatNumber>
                    {suppliers.filter(s => s.status === 'Aktif').length}
                  </StatNumber>
                  <StatHelpText>Son 30 gün</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Toplam Ürün</StatLabel>
                  <StatNumber>
                    {suppliers.reduce((acc, curr) => acc + curr.productCount, 0)}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    15% artış
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Toplam Sipariş Değeri</StatLabel>
                  <StatNumber>
                    {formatCurrency(suppliers.reduce((acc, curr) => acc + curr.totalRevenue, 0))}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    25% artış
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Arama */}
          <Card mb={8} variant="outline" className={styles.searchCard}>
            <CardBody>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <FiSearch color="gray.500" />
                </InputLeftElement>
                <Input
                  placeholder="Tedarikçi ara..."
                  value={searchTerm}
                  onChange={handleSearch}
                  variant="filled"
                  bg="white"
                  _focus={{
                    bg: 'white',
                    borderColor: 'blue.400'
                  }}
                />
              </InputGroup>
            </CardBody>
          </Card>

          {/* Tedarikçi Kartları */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredSuppliers.map((supplier) => (
              <Card
                key={supplier.id}
                className={styles.supplierCard}
                onClick={() => handleViewSupplier(supplier)}
                cursor="pointer"
                _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
                transition="all 0.2s"
              >
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between">
                      <HStack spacing={3}>
                        <Avatar 
                          name={supplier.name} 
                          size="md" 
                          bg="blue.500"
                        >
                          <AvatarBadge boxSize='1.25em' bg={supplier.status === 'Aktif' ? 'green.500' : 'red.500'} />
                        </Avatar>
                        <VStack align="start" spacing={0}>
                          <Heading size="md" noOfLines={1}>{supplier.name}</Heading>
                          <Text color="gray.600" fontSize="sm">{supplier.contact}</Text>
                        </VStack>
                      </HStack>
                      <Badge colorScheme={getStatusColor(supplier.status)} fontSize="sm">
                        {supplier.status}
                      </Badge>
                    </HStack>

                    <Divider />

                    <VStack spacing={2} align="stretch">
                      <HStack>
                        <FiMail color="gray.500" />
                        <Text fontSize="sm">{supplier.email}</Text>
                      </HStack>
                      <HStack>
                        <FiPhone color="gray.500" />
                        <Text fontSize="sm">{supplier.phone}</Text>
                      </HStack>
                      <HStack>
                        <FiMapPin color="gray.500" />
                        <Text fontSize="sm">{supplier.address}</Text>
                      </HStack>
                    </VStack>

                    <Divider />

                    <SimpleGrid columns={2} spacing={4}>
                      <VStack align="start">
                        <Text fontSize="sm" color="gray.600">Ürün Sayısı</Text>
                        <HStack>
                          <FiPackage />
                          <Text fontWeight="bold">{supplier.productCount}</Text>
                        </HStack>
                      </VStack>
                      <VStack align="start">
                        <Text fontSize="sm" color="gray.600">Son Sipariş</Text>
                        <HStack>
                          <FiCalendar />
                          <Text fontWeight="bold">
                            {new Date(supplier.lastOrder).toLocaleDateString('tr-TR')}
                          </Text>
                        </HStack>
                      </VStack>
                    </SimpleGrid>

                    <Divider />

                    <HStack justify="space-between">
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" color="gray.600">Toplam Sipariş</Text>
                        <Text fontWeight="bold">{supplier.totalOrders}</Text>
                      </VStack>
                      <VStack align="end" spacing={0}>
                        <Text fontSize="sm" color="gray.600">Toplam Değer</Text>
                        <Text fontWeight="bold" color="green.500">
                          {formatCurrency(supplier.totalRevenue)}
                        </Text>
                      </VStack>
                    </HStack>

                    <HStack justify="flex-end" spacing={2}>
                      <Tooltip label="Düzenle">
                        <IconButton
                          icon={<FiEdit2 />}
                          variant="ghost"
                          colorScheme="blue"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Düzenleme işlemi
                          }}
                        />
                      </Tooltip>
                      <Tooltip label="Sil">
                        <IconButton
                          icon={<FiTrash2 />}
                          variant="ghost"
                          colorScheme="red"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Silme işlemi
                          }}
                        />
                      </Tooltip>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Container>

        {/* Tedarikçi Detay Modalı */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay backdropFilter="blur(4px)" />
          <ModalContent>
            <ModalHeader>
              <HStack>
                <Avatar name={selectedSupplier?.name} size="sm" bg="blue.500" />
                <Text>Tedarikçi Detayları</Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {selectedSupplier && (
                <Stack spacing={6}>
                  <Box>
                    <Heading size="md">{selectedSupplier.name}</Heading>
                    <Badge colorScheme={getStatusColor(selectedSupplier.status)} mt={2}>
                      {selectedSupplier.status}
                    </Badge>
                  </Box>
                  
                  <Box>
                    <Text fontWeight="bold" mb={3}>İletişim Bilgileri</Text>
                    <VStack align="stretch" spacing={2}>
                      <HStack>
                        <FiUser />
                        <Text>Yetkili: {selectedSupplier.contact}</Text>
                      </HStack>
                      <HStack>
                        <FiPhone />
                        <Text>Telefon: {selectedSupplier.phone}</Text>
                      </HStack>
                      <HStack>
                        <FiMail />
                        <Text>E-posta: {selectedSupplier.email}</Text>
                      </HStack>
                      <HStack>
                        <FiMapPin />
                        <Text>Adres: {selectedSupplier.address}</Text>
                      </HStack>
                    </VStack>
                  </Box>
                  
                  <Divider />
                  
                  <SimpleGrid columns={2} spacing={4}>
                    <Stat>
                      <StatLabel>Toplam Sipariş</StatLabel>
                      <StatNumber>{selectedSupplier.totalOrders}</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        18% artış
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Toplam Değer</StatLabel>
                      <StatNumber>{formatCurrency(selectedSupplier.totalRevenue)}</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        25% artış
                      </StatHelpText>
                    </Stat>
                  </SimpleGrid>
                </Stack>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export default Suppliers; 