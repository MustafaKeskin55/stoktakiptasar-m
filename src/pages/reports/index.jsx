import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Select,
  Text,
} from '@chakra-ui/react';
import {
  FiTrendingUp,
  FiDollarSign,
  FiPackage,
  FiUsers,
} from 'react-icons/fi';
import styles from './Reports.module.css';

const mockReports = {
  salesSummary: {
    totalSales: '₺124,432',
    growth: '+12.5%',
    averageOrder: '₺1,245',
    totalOrders: '98',
  },
  topProducts: [
    { name: 'Laptop', sales: 45, revenue: '₺675,000' },
    { name: 'Akıllı Telefon', sales: 32, revenue: '₺256,000' },
    { name: 'Tablet', sales: 28, revenue: '₺140,000' },
    { name: 'Kulaklık', sales: 65, revenue: '₺78,000' },
  ],
  topCustomers: [
    { name: 'ABC Ltd.', orders: 12, total: '₺156,000' },
    { name: 'XYZ A.Ş.', orders: 8, total: '₺98,000' },
    { name: 'DEF Corp.', orders: 6, total: '₺76,000' },
  ],
};

const StatCard = ({ title, value, icon, color, subValue }) => {
  const IconComponent = icon;
  return (
    <Box className={styles.statCard}>
      <Flex justify="space-between" align="center">
        <Box>
          <Text className={styles.statTitle}>{title}</Text>
          <Text className={styles.statValue}>{value}</Text>
          {subValue && (
            <Text className={styles.statSubValue}>{subValue}</Text>
          )}
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

const Reports = () => {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <Flex minH="100vh">
      <Box flex="1" ml="280px">
        <Box className={styles.pageContainer}>
          <Box className={styles.header}>
            <Heading size="lg">Raporlar</Heading>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={styles.timeSelect}
              width="200px"
            >
              <option value="week">Son 7 Gün</option>
              <option value="month">Son 30 Gün</option>
              <option value="quarter">Son 3 Ay</option>
              <option value="year">Son 1 Yıl</option>
            </Select>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
            <StatCard
              title="Toplam Satış"
              value={mockReports.salesSummary.totalSales}
              subValue={mockReports.salesSummary.growth}
              icon={FiDollarSign}
              color="green"
            />
            <StatCard
              title="Ortalama Sipariş"
              value={mockReports.salesSummary.averageOrder}
              icon={FiTrendingUp}
              color="blue"
            />
            <StatCard
              title="Toplam Sipariş"
              value={mockReports.salesSummary.totalOrders}
              icon={FiPackage}
              color="purple"
            />
            <StatCard
              title="Aktif Müşteriler"
              value="156"
              subValue="+23% geçen aya göre"
              icon={FiUsers}
              color="orange"
            />
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            <Box className={styles.reportCard}>
              <Heading size="md" mb={4}>En Çok Satan Ürünler</Heading>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>Ürün</th>
                    <th className={styles.tableHeader}>Satış Adedi</th>
                    <th className={styles.tableHeader}>Gelir</th>
                  </tr>
                </thead>
                <tbody>
                  {mockReports.topProducts.map((product, index) => (
                    <tr key={index} className={styles.tableRow}>
                      <td className={styles.tableCell}>{product.name}</td>
                      <td className={styles.tableCell}>{product.sales}</td>
                      <td className={styles.tableCell}>{product.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>

            <Box className={styles.reportCard}>
              <Heading size="md" mb={4}>En İyi Müşteriler</Heading>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>Müşteri</th>
                    <th className={styles.tableHeader}>Sipariş Sayısı</th>
                    <th className={styles.tableHeader}>Toplam</th>
                  </tr>
                </thead>
                <tbody>
                  {mockReports.topCustomers.map((customer, index) => (
                    <tr key={index} className={styles.tableRow}>
                      <td className={styles.tableCell}>{customer.name}</td>
                      <td className={styles.tableCell}>{customer.orders}</td>
                      <td className={styles.tableCell}>{customer.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Flex>
  );
};

export default Reports; 