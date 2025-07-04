import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Input,
  IconButton,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FiPlus, FiSearch, FiPhone, FiMail, FiEdit2, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { apiService } from '../../services/api/apiService';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import styles from './Customers.module.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await apiService.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Müşteriler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Flex minH="100vh">
      <Sidebar />
      <Box flex="1" ml="250px">
        <Navbar />
        <Box p={4} bg="gray.50">
          <Box p={6}>
            <Flex justifyContent="space-between" alignItems="center" mb={6}>
              <Heading size="lg">Müşteriler</Heading>
              <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={onOpen}>
                Yeni Müşteri Ekle
              </Button>
            </Flex>

            <Flex mb={6}>
              <Input
                placeholder="Müşteri veya yetkili ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                maxW="400px"
              />
            </Flex>

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Firma Adı</Th>
                  <Th>Yetkili</Th>
                  <Th>E-posta</Th>
                  <Th>Telefon</Th>
                  <Th>Adres</Th>
                  <Th>İşlemler</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredCustomers.map((customer) => (
                  <Tr key={customer.id}>
                    <Td fontWeight="medium">{customer.name}</Td>
                    <Td>{customer.contact}</Td>
                    <Td>
                      <Flex align="center">
                        <FiMail style={{ marginRight: '8px' }} />
                        {customer.email}
                      </Flex>
                    </Td>
                    <Td>
                      <Flex align="center">
                        <FiPhone style={{ marginRight: '8px' }} />
                        {customer.phone}
                      </Flex>
                    </Td>
                    <Td>{customer.address}</Td>
                    <Td>
                      <Flex gap={2}>
                        <IconButton
                          icon={<FiShoppingBag />}
                          aria-label="Siparişler"
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                        />
                        <IconButton
                          icon={<FiEdit2 />}
                          aria-label="Düzenle"
                          size="sm"
                          variant="ghost"
                        />
                        <IconButton
                          icon={<FiTrash2 />}
                          aria-label="Sil"
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <Text mt={4} color="gray.600">
              Toplam {filteredCustomers.length} müşteri
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Customers; 