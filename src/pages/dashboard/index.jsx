import React from 'react';
import { useState } from 'react';
import {
  Box,
  Grid,
  Flex,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  Button,
  useDisclosure,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiShoppingBag,
  FiUsers,
  FiTruck,
  FiDollarSign,
  FiTrendingUp,
  FiPackage,
  FiBox,
  FiShoppingCart,
  FiBarChart2,
  FiArrowUp,
  FiArrowDown,
} from 'react-icons/fi';
import AddProductModal from '../../components/AddProductModal';
import styles from './Dashboard.module.css';

const StatCard = ({ title, value, icon, color }) => {
  const IconComponent = icon;
  return (
    <Box className={styles.statsCard}>
      <Flex justify="space-between" align="center">
        <Box>
          <Text className={styles.statsCardTitle}>{title}</Text>
          <Text className={styles.statsCardValue}>{value}</Text>
        </Box>
        <Box
          className={styles.iconContainer}
          bg={`${color}.50`}
          color={`${color}.500`}
        >
          <IconComponent size={24} />
        </Box>
      </Flex>
    </Box>
  );
};

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stockData, setStockData] = useState([
    { id: 1, name: 'Laptop', category: 'Elektronik', quantity: 50, price: 15000, status: 'Stokta' },
    { id: 2, name: 'Mouse', category: 'Elektronik', quantity: 100, price: 250, status: 'Stokta' },
    { id: 3, name: 'Klavye', category: 'Elektronik', quantity: 5, price: 750, status: 'Az' },
    { id: 4, name: 'Monitor', category: 'Elektronik', quantity: 0, price: 3500, status: 'Tükendi' },
  ]);

  const bgColor = useColorModeValue('white', 'gray.800');

  const stats = [
    {
      title: 'Toplam Satış',
      value: '₺124,432',
      icon: FiDollarSign,
      color: 'green',
    },
    {
      title: 'Aktif Siparişler',
      value: '32',
      icon: FiShoppingBag,
      color: 'blue',
    },
    {
      title: 'Toplam Müşteri',
      value: '1,205',
      icon: FiUsers,
      color: 'purple',
    },
    {
      title: 'Bekleyen Sevkiyat',
      value: '15',
      icon: FiTruck,
      color: 'orange',
    },
    {
      title: 'Stok Değeri',
      value: '₺847,321',
      icon: FiPackage,
      color: 'cyan',
    },
    {
      title: 'Aylık Büyüme',
      value: '%12.5',
      icon: FiTrendingUp,
      color: 'pink',
    },
  ];

  const handleAddProduct = (newProduct) => {
    setStockData([...stockData, { ...newProduct, id: stockData.length + 1 }]);
  };

  return (
    <Flex minH="100vh">
      <Box flex="1" ml="280px">
        <Box className={styles.pageContainer}>
          <Box mb={8}>
            <Heading size="lg" mb={2}>Hoş Geldiniz</Heading>
            <Text className={styles.welcomeText}>
              Stok takip sisteminizin güncel durumunu görüntüleyin
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mt={8}>
            <Box
              bg={bgColor}
              p={6}
              borderRadius="lg"
              className={styles.card}
            >
              <Heading size="md" mb={4}>Son Siparişler</Heading>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Sipariş No</th>
                    <th>Müşteri</th>
                    <th>Tutar</th>
                    <th>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#12345</td>
                    <td>Ahmet Yılmaz</td>
                    <td>₺1,250</td>
                    <td><span className={`${styles.statusBadge} ${styles.statusSuccess}`}>Tamamlandı</span></td>
                  </tr>
                  <tr>
                    <td>#12344</td>
                    <td>Mehmet Demir</td>
                    <td>₺850</td>
                    <td><span className={`${styles.statusBadge} ${styles.statusWarning}`}>Hazırlanıyor</span></td>
                  </tr>
                  <tr>
                    <td>#12343</td>
                    <td>Ayşe Kaya</td>
                    <td>₺2,150</td>
                    <td><span className={`${styles.statusBadge} ${styles.statusSuccess}`}>Tamamlandı</span></td>
                  </tr>
                </tbody>
              </table>
            </Box>

            <Box
              bg={bgColor}
              p={6}
              borderRadius="lg"
              className={styles.card}
            >
              <Heading size="md" mb={4}>Stok Durumu</Heading>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Ürün</th>
                    <th>Stok</th>
                    <th>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Laptop</td>
                    <td>45</td>
                    <td><span className={`${styles.statusBadge} ${styles.statusSuccess}`}>Yeterli</span></td>
                  </tr>
                  <tr>
                    <td>Telefon</td>
                    <td>12</td>
                    <td><span className={`${styles.statusBadge} ${styles.statusWarning}`}>Az</span></td>
                  </tr>
                  <tr>
                    <td>Tablet</td>
                    <td>3</td>
                    <td><span className={`${styles.statusBadge} ${styles.statusError}`}>Kritik</span></td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>

      <AddProductModal
        isOpen={isOpen}
        onClose={onClose}
        onAddProduct={handleAddProduct}
      />
    </Flex>
  );
};

export default Dashboard; 