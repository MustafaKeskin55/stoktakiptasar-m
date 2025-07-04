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
import { FiPlus, FiSearch, FiPhone, FiMail, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { apiService } from '../../services/api/apiService';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const data = await apiService.getSuppliers();
      setSuppliers(data);
    } catch (error) {
      console.error('Tedarikçiler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
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
              <Heading size="lg">Tedarikçiler</Heading>
              <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={onOpen}>
                Yeni Tedarikçi Ekle
              </Button>
            </Flex>

            <Flex mb={6}>
              <Input
                placeholder="Tedarikçi veya yetkili ara..."
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
                {filteredSuppliers.map((supplier) => (
                  <Tr key={supplier.id}>
                    <Td fontWeight="medium">{supplier.name}</Td>
                    <Td>{supplier.contact}</Td>
                    <Td>
                      <Flex align="center">
                        <FiMail style={{ marginRight: '8px' }} />
                        {supplier.email}
                      </Flex>
                    </Td>
                    <Td>
                      <Flex align="center">
                        <FiPhone style={{ marginRight: '8px' }} />
                        {supplier.phone}
                      </Flex>
                    </Td>
                    <Td>{supplier.address}</Td>
                    <Td>
                      <Flex gap={2}>
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
              Toplam {filteredSuppliers.length} tedarikçi
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Suppliers; 