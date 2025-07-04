import { 
  Box, 
  VStack, 
  Icon, 
  Text, 
  Flex, 
  Image, 
  Divider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useBreakpointValue,
  IconButton,
  Avatar,
  Tooltip,
  Badge,
} from '@chakra-ui/react';
import { FiHome, FiBox, FiShoppingCart, FiTruck, FiUsers, FiBarChart2, FiSettings, FiShoppingBag, FiMenu, FiLogOut, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { useState } from 'react';

const menuItems = [
  { icon: FiHome, label: 'Dashboard', path: '/dashboard', notifications: 0 },
  { icon: FiBox, label: 'Ürünler', path: '/products', notifications: 0 },
  { icon: FiShoppingCart, label: 'Siparişler', path: '/orders', notifications: 3 },
  { icon: FiTruck, label: 'Tedarikçiler', path: '/suppliers', notifications: 0 },
  { icon: FiUsers, label: 'Müşteriler', path: '/customers', notifications: 1 },
  { icon: FiBarChart2, label: 'Raporlar', path: '/reports', notifications: 0 },
  { icon: FiShoppingBag, label: 'Entegrasyonlar', path: '/integrations', notifications: 0 },
  { icon: FiSettings, label: 'Ayarlar', path: '/settings', notifications: 0 },
];

const SidebarContent = ({ onClose = null, isCollapsed = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <Box className={styles.sidebarContent}>
      <Flex className={styles.logoContainer} direction="column" align={isCollapsed ? "center" : "flex-start"} p={isCollapsed ? 2 : 4}>
        {!isCollapsed ? (
          <>
            <Text fontSize="2xl" fontWeight="bold" color="brand.500" mb={1}>
              StokTakip
            </Text>
            <Text fontSize="xs" color="gray.500">Profesyonel Stok Yönetimi</Text>
          </>
        ) : (
          <Text fontSize="2xl" fontWeight="bold" color="brand.500">
            ST
          </Text>
        )}
      </Flex>
      
      <Divider my={2} />

      <VStack spacing={1} align="stretch" px={isCollapsed ? 1 : 2}>
        {menuItems.map((item, index) => (
          <Tooltip key={index} label={isCollapsed ? item.label : ""} placement="right" isDisabled={!isCollapsed}>
            <Box
              className={`${styles.menuItem} ${
                location.pathname === item.path ? styles.active : ''
              }`}
              onClick={() => handleNavigation(item.path)}
              borderRadius="md"
              position="relative"
            >
              <Flex align="center" p={isCollapsed ? 3 : "3"} justifyContent={isCollapsed ? "center" : "flex-start"}>
                <Icon as={item.icon} className={styles.menuIcon} boxSize={5} />
                {!isCollapsed && <Text className={styles.menuText} ml={3}>{item.label}</Text>}
                {item.notifications > 0 && (
                  <Badge 
                    colorScheme="red" 
                    borderRadius="full" 
                    position="absolute"
                    top={isCollapsed ? 1 : 2}
                    right={isCollapsed ? 1 : 3}
                    fontSize="xs"
                    minW="18px"
                    h="18px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {item.notifications}
                  </Badge>
                )}
              </Flex>
            </Box>
          </Tooltip>
        ))}
      </VStack>

      <Box className={styles.userInfo} mt="auto">
        <Flex align="center" p={isCollapsed ? 2 : 4} direction={isCollapsed ? "column" : "row"}>
          <Avatar 
            size={isCollapsed ? "sm" : "md"} 
            name="Admin User" 
            bg="brand.500" 
            color="white"
            mb={isCollapsed ? 2 : 0}
          />
          {!isCollapsed && (
            <Box ml="3">
              <Text fontWeight="medium" fontSize="sm">Admin User</Text>
              <Text fontSize="xs" color="gray.500">admin@stoktakip.com</Text>
            </Box>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  
  if (isMobile) {
    return (
      <>
        <IconButton
          icon={<FiMenu />}
          onClick={onOpen}
          position="fixed"
          top="4"
          left="4"
          zIndex={1000}
          aria-label="Menüyü Aç"
          size="md"
          colorScheme="brand"
          variant="solid"
          boxShadow="md"
        />
        
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody p={0}>
              <SidebarContent onClose={onClose} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <Box 
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}
      position="fixed"
      top="0"
      left="0"
      height="100vh"
      overflowY="auto"
      transition="width 0.3s ease"
      width={isCollapsed ? "70px" : "280px"}
      zIndex={900}
    >
      <SidebarContent isCollapsed={isCollapsed} />
      
      <IconButton
        icon={isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        onClick={onToggle}
        position="absolute"
        bottom="4"
        right={isCollapsed ? "50%" : "4"}
        transform={isCollapsed ? "translateX(50%)" : "none"}
        size="sm"
        aria-label="Sidebar Daralt/Genişlet"
        variant="ghost"
        color="gray.500"
        _hover={{ bg: "gray.100", color: "brand.500" }}
      />
    </Box>
  );
};

export default Sidebar; 