import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Flex,
  Spinner,
  Card,
  CardHeader,
  CardBody,
} from '@chakra-ui/react';
import { apiService } from '../../services/api/apiService';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import styles from './Reports.module.css';

const Reports = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await apiService.getReports();
      setReports(data);
    } catch (error) {
      console.error('Raporlar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <Heading size="lg" mb={6}>Raporlar</Heading>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={6}>
            <Card>
              <CardHeader>
                <Heading size="md">Aylık Satışlar</Heading>
              </CardHeader>
              <CardBody>
                {reports.monthlySales.map((sale, index) => (
                  <Stat key={index} mb={4}>
                    <StatLabel>{sale.month}</StatLabel>
                    <StatNumber>₺{sale.total.toLocaleString()}</StatNumber>
                    <StatHelpText>
                      {index > 0 
                        ? `${((sale.total - reports.monthlySales[index-1].total) / reports.monthlySales[index-1].total * 100).toFixed(1)}%`
                        : '0%'
                      }
                    </StatHelpText>
                  </Stat>
                ))}
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <Heading size="md">En Çok Satan Ürünler</Heading>
              </CardHeader>
              <CardBody>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Ürün</Th>
                      <Th isNumeric>Satış Adedi</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {reports.topProducts.map((product, index) => (
                      <Tr key={index}>
                        <Td>{product.name}</Td>
                        <Td isNumeric>{product.sales}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <Heading size="md">Stok Uyarıları</Heading>
              </CardHeader>
              <CardBody>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Ürün</Th>
                      <Th isNumeric>Miktar</Th>
                      <Th>Durum</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {reports.stockAlerts.map((alert, index) => (
                      <Tr key={index}>
                        <Td>{alert.product}</Td>
                        <Td isNumeric>{alert.quantity}</Td>
                        <Td>
                          <Badge colorScheme={alert.status === 'Kritik' ? 'orange' : 'red'}>
                            {alert.status}
                          </Badge>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Box>
      </Box>
    </Flex>
  );
};

export default Reports; 