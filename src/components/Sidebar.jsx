import { Box, VStack, Icon, Text, Flex, Image, Divider } from '@chakra-ui/react';
import { FiHome, FiBox, FiShoppingCart, FiTruck, FiUsers, FiBarChart2, FiSettings, FiShoppingBag } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const menuItems = [
  { icon: FiHome, label: 'Dashboard', path: '/dashboard' },
  { icon: FiBox, label: 'Ürünler', path: '/products' },
  { icon: FiShoppingCart, label: 'Siparişler', path: '/orders' },
  { icon: FiTruck, label: 'Tedarikçiler', path: '/suppliers' },
  { icon: FiUsers, label: 'Müşteriler', path: '/customers' },
  { icon: FiBarChart2, label: 'Raporlar', path: '/reports' },
  { icon: FiShoppingBag, label: 'Entegrasyonlar', path: '/integrations' },
  { icon: FiSettings, label: 'Ayarlar', path: '/settings' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box className={styles.sidebar}>
      <Flex className={styles.logoContainer}>
        <Text fontSize="2xl" fontWeight="bold" color="blue.600" mb={2}>
          StokTakip
        </Text>
        <Text fontSize="sm" color="gray.500">Profesyonel Stok Yönetimi</Text>
      </Flex>
      
      <Divider my={4} />

      <VStack spacing={1} align="stretch">
        {menuItems.map((item, index) => (
          <Box
            key={index}
            className={`${styles.menuItem} ${
              location.pathname === item.path ? styles.active : ''
            }`}
            onClick={() => navigate(item.path)}
          >
            <Flex align="center" p="3">
              <Icon as={item.icon} className={styles.menuIcon} />
              <Text className={styles.menuText}>{item.label}</Text>
            </Flex>
          </Box>
        ))}
      </VStack>

      <Box className={styles.userInfo}>
        <Flex align="center" p="4">
          <Box className={styles.userAvatar}>
            <Text>AU</Text>
          </Box>
          <Box ml="3">
            <Text fontWeight="medium">Admin User</Text>
            <Text fontSize="sm" color="gray.500">admin@stoktakip.com</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Sidebar; 