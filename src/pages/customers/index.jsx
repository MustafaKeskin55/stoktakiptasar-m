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
  Container,
  Progress
} from '@chakra-ui/react';
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShoppingBag,
  FiTrendingUp,
  FiCalendar,
  FiCreditCard
} from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import styles from './Customers.module.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    // Mock veri
    const mockCustomers = [
      {
        id: 1,
        name: 'Ahmet Yılmaz',
        email: 'ahmet@email.com',
        phone: '+90 (532) 555-0101',
        address: 'Kadıköy, İstanbul',
        totalOrders: 15,
        totalSpent: 12500,
        lastOrder: '2024-03-10',
        status: 'Aktif',
        customerType: 'Premium',
        loyaltyPoints: 750,
        orderHistory: [
          { id: 'ORD-001', date: '2024-03-10', amount: 1500, status: 'Tamamlandı' },
          { id: 'ORD-002', date: '2024-02-25', amount: 2300, status: 'Tamamlandı' },
          { id: 'ORD-003', date: '2024-02-10', amount: 1800, status: 'Tamamlandı' }
        ]
      },
      {
        id: 2,
        name: 'Ayşe Demir',
        email: 'ayse@email.com',
        phone: '+90 (533) 555-0202',
        address: 'Çankaya, Ankara',
        totalOrders: 8,
        totalSpent: 8750,
        lastOrder: '2024-03-08',
        status: 'Aktif',
        customerType: 'Standard',
        loyaltyPoints: 320,
        orderHistory: [
          { id: 'ORD-004', date: '2024-03-08', amount: 1200, status: 'Tamamlandı' },
          { id: 'ORD-005', date: '2024-02-15', amount: 1800, status: 'Tamamlandı' }
        ]
      }
    ];
    setCustomers(mockCustomers);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
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

  const getCustomerTypeColor = (type) => {
    switch (type) {
      case 'Premium':
        return 'purple';
      case 'Standard':
        return 'blue';
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
      <Sidebar />
      <Box className={styles.content}>
        <Container maxW="container.xl" py={8}>
          {/* Header */}
          <Flex justify="space-between" align="center" mb={8}>
            <VStack align="start" spacing={1}>
              <Heading size="lg">Müşteriler</Heading>
              <Text color="gray.600">Müşterilerinizi yönetin ve takip edin</Text>
            </VStack>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="blue"
              size="lg"
              onClick={() => {/* Yeni müşteri ekleme */}}
              className={styles.addButton}
            >
              Yeni Müşteri
            </Button>
          </Flex>

          {/* İstatistikler */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Toplam Müşteri</StatLabel>
                  <StatNumber>{customers.length}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23% artış
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Aktif Müşteriler</StatLabel>
                  <StatNumber>
                    {customers.filter(c => c.status === 'Aktif').length}
                  </StatNumber>
                  <StatHelpText>Son 30 gün</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Toplam Sipariş</StatLabel>
                  <StatNumber>
                    {customers.reduce((acc, curr) => acc + curr.totalOrders, 0)}
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
                  <StatLabel>Toplam Gelir</StatLabel>
                  <StatNumber>
                    {formatCurrency(customers.reduce((acc, curr) => acc + curr.totalSpent, 0))}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    30% artış
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
                  placeholder="Müşteri ara..."
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

          {/* Müşteri Kartları */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredCustomers.map((customer) => (
              <Card
                key={customer.id}
                className={styles.customerCard}
                onClick={() => handleViewCustomer(customer)}
                cursor="pointer"
                _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
                transition="all 0.2s"
              >
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between">
                      <HStack spacing={3}>
                        <Avatar 
                          name={customer.name} 
                          size="md" 
                          bg="purple.500"
                        >
                          <AvatarBadge boxSize='1.25em' bg={customer.status === 'Aktif' ? 'green.500' : 'red.500'} />
                        </Avatar>
                        <VStack align="start" spacing={0}>
                          <Heading size="md" noOfLines={1}>{customer.name}</Heading>
                          <HStack>
                            <Badge colorScheme={getStatusColor(customer.status)} fontSize="sm">
                              {customer.status}
                            </Badge>
                            <Badge colorScheme={getCustomerTypeColor(customer.customerType)} fontSize="sm">
                              {customer.customerType}
                            </Badge>
                          </HStack>
                        </VStack>
                      </HStack>
                    </HStack>

                    <Divider />

                    <VStack spacing={2} align="stretch">
                      <HStack>
                        <FiMail color="gray.500" />
                        <Text fontSize="sm">{customer.email}</Text>
                      </HStack>
                      <HStack>
                        <FiPhone color="gray.500" />
                        <Text fontSize="sm">{customer.phone}</Text>
                      </HStack>
                      <HStack>
                        <FiMapPin color="gray.500" />
                        <Text fontSize="sm">{customer.address}</Text>
                      </HStack>
                    </VStack>

                    <Divider />

                    <SimpleGrid columns={2} spacing={4}>
                      <VStack align="start">
                        <Text fontSize="sm" color="gray.600">Toplam Sipariş</Text>
                        <HStack>
                          <FiShoppingBag />
                          <Text fontWeight="bold">{customer.totalOrders}</Text>
                        </HStack>
                      </VStack>
                      <VStack align="start">
                        <Text fontSize="sm" color="gray.600">Son Sipariş</Text>
                        <HStack>
                          <FiCalendar />
                          <Text fontWeight="bold">
                            {new Date(customer.lastOrder).toLocaleDateString('tr-TR')}
                          </Text>
                        </HStack>
                      </VStack>
                    </SimpleGrid>

                    <VStack align="stretch" spacing={1}>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">Sadakat Puanı</Text>
                        <Text fontSize="sm" fontWeight="bold">{customer.loyaltyPoints} puan</Text>
                      </HStack>
                      <Progress
                        value={(customer.loyaltyPoints / 1000) * 100}
                        size="sm"
                        colorScheme="purple"
                        borderRadius="full"
                      />
                    </VStack>

                    <Divider />

                    <HStack justify="space-between">
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" color="gray.600">Toplam Harcama</Text>
                        <Text fontWeight="bold" color="green.500">
                          {formatCurrency(customer.totalSpent)}
                        </Text>
                      </VStack>
                      <HStack>
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
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Container>

        {/* Müşteri Detay Modalı */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay backdropFilter="blur(4px)" />
          <ModalContent>
            <ModalHeader>
              <HStack>
                <Avatar name={selectedCustomer?.name} size="sm" bg="purple.500" />
                <Text>Müşteri Detayları</Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {selectedCustomer && (
                <Stack spacing={6}>
                  <Box>
                    <Heading size="md">{selectedCustomer.name}</Heading>
                    <HStack mt={2} spacing={2}>
                      <Badge colorScheme={getStatusColor(selectedCustomer.status)}>
                        {selectedCustomer.status}
                      </Badge>
                      <Badge colorScheme={getCustomerTypeColor(selectedCustomer.customerType)}>
                        {selectedCustomer.customerType}
                      </Badge>
                    </HStack>
                  </Box>

                  <Box>
                    <Text fontWeight="bold" mb={3}>İletişim Bilgileri</Text>
                    <VStack align="stretch" spacing={2}>
                      <HStack>
                        <FiMail />
                        <Text>E-posta: {selectedCustomer.email}</Text>
                      </HStack>
                      <HStack>
                        <FiPhone />
                        <Text>Telefon: {selectedCustomer.phone}</Text>
                      </HStack>
                      <HStack>
                        <FiMapPin />
                        <Text>Adres: {selectedCustomer.address}</Text>
                      </HStack>
                    </VStack>
                  </Box>

                  <Box>
                    <Text fontWeight="bold" mb={3}>Sadakat Programı</Text>
                    <VStack align="stretch" spacing={2}>
                      <HStack justify="space-between">
                        <Text>Toplam Puan:</Text>
                        <Text fontWeight="bold">{selectedCustomer.loyaltyPoints} puan</Text>
                      </HStack>
                      <Progress
                        value={(selectedCustomer.loyaltyPoints / 1000) * 100}
                        size="sm"
                        colorScheme="purple"
                        borderRadius="full"
                      />
                      <Text fontSize="sm" color="gray.600">
                        Bir sonraki seviyeye {1000 - selectedCustomer.loyaltyPoints} puan kaldı
                      </Text>
                    </VStack>
                  </Box>

                  <Divider />

                  <Box>
                    <Text fontWeight="bold" mb={3}>Sipariş Geçmişi</Text>
                    <VStack align="stretch" spacing={3}>
                      {selectedCustomer.orderHistory.map(order => (
                        <Card key={order.id} variant="outline">
                          <CardBody>
                            <HStack justify="space-between">
                              <VStack align="start" spacing={1}>
                                <Text fontWeight="medium">{order.id}</Text>
                                <Text fontSize="sm" color="gray.600">
                                  {new Date(order.date).toLocaleDateString('tr-TR')}
                                </Text>
                              </VStack>
                              <VStack align="end" spacing={1}>
                                <Text fontWeight="bold">
                                  {formatCurrency(order.amount)}
                                </Text>
                                <Badge colorScheme="green">{order.status}</Badge>
                              </VStack>
                            </HStack>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  </Box>

                  <SimpleGrid columns={2} spacing={4}>
                    <Stat>
                      <StatLabel>Toplam Sipariş</StatLabel>
                      <StatNumber>{selectedCustomer.totalOrders}</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        18% artış
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Toplam Harcama</StatLabel>
                      <StatNumber>{formatCurrency(selectedCustomer.totalSpent)}</StatNumber>
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

export default Customers;