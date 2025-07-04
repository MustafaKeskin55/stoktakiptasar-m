import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useToast,
  useBreakpointValue,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  HStack,
  VStack,
  Divider,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSearch, FiBell, FiSettings, FiLogOut, FiUser, FiCalendar, FiMail, FiMessageSquare } from 'react-icons/fi';
import { logout } from '../services/authService';
import styles from './Navbar.module.css';
import { useState, useEffect } from 'react';

const notifications = [
  {
    id: 1,
    title: 'Yeni Sipariş',
    message: 'Ahmet Yılmaz yeni bir sipariş verdi.',
    time: '5 dakika önce',
    read: false,
  },
  {
    id: 2,
    title: 'Stok Uyarısı',
    message: 'Laptop ürünü kritik stok seviyesine ulaştı.',
    time: '1 saat önce',
    read: false,
  },
  {
    id: 3,
    title: 'Ödeme Alındı',
    message: 'Mehmet Demir siparişinin ödemesi alındı.',
    time: '3 saat önce',
    read: true,
  },
];

const Navbar = ({ isSidebarCollapsed = false }) => {
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [searchFocused, setSearchFocused] = useState(false);
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.read).length);
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleLogout = () => {
    logout();
    toast({
      title: 'Çıkış yapıldı',
      description: 'Başarıyla çıkış yaptınız.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <Box 
      className={styles.navbar} 
      position="fixed"
      top="0"
      right="0"
      left={{ base: 0, lg: isSidebarCollapsed ? "70px" : "280px" }}
      height="60px"
      zIndex={100}
      bg={bgColor}
      transition="all 0.3s ease"
      width="auto"
    >
      <Flex 
        align="center" 
        justify="space-between" 
        px={{ base: "3", md: "5" }} 
        py="3"
        h="100%"
      >
        <InputGroup 
          maxW={{ base: "100%", md: "400px" }}
          className={`${styles.searchInput} ${searchFocused ? styles.searchInputFocused : ''}`}
          size={isMobile ? "sm" : "md"}
        >
          <InputLeftElement pointerEvents="none">
            <FiSearch color="var(--chakra-colors-gray-400)" />
          </InputLeftElement>
          <Input
            placeholder="Ürün veya kategori ara..."
            bg="white"
            border="1px"
            borderColor="gray.200"
            _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)" }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            borderRadius="full"
          />
        </InputGroup>

        <HStack spacing={{ base: "2", md: "4" }}>
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Box position="relative" className={styles.iconButton}>
                <IconButton
                  variant="ghost"
                  icon={<FiBell />}
                  aria-label="Bildirimler"
                  size={isMobile ? "sm" : "md"}
                  className={styles.notificationButton}
                />
                {unreadCount > 0 && (
                  <Badge
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    colorScheme="red"
                    borderRadius="full"
                    fontSize="xs"
                    minW="18px"
                    h="18px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Box>
            </PopoverTrigger>
            <PopoverContent width="320px" className={styles.notificationPopover}>
              <PopoverArrow />
              <PopoverHeader borderBottomWidth="0" fontWeight="medium" display="flex" justifyContent="space-between" alignItems="center">
                <Text>Bildirimler</Text>
                <Button size="xs" variant="link" colorScheme="brand" onClick={markAllAsRead}>
                  Tümünü Okundu İşaretle
                </Button>
              </PopoverHeader>
              <PopoverBody p="0">
                <VStack spacing="0" align="stretch" maxH="350px" overflowY="auto">
                  {notifications.map(notification => (
                    <Box 
                      key={notification.id}
                      p="3"
                      _hover={{ bg: "gray.50" }}
                      cursor="pointer"
                      borderLeft={notification.read ? "none" : "3px solid"}
                      borderLeftColor={notification.read ? "transparent" : "brand.500"}
                    >
                      <Text fontWeight="medium" fontSize="sm">{notification.title}</Text>
                      <Text fontSize="xs" color="gray.600" mt="1">{notification.message}</Text>
                      <Text fontSize="xs" color="gray.500" mt="1">{notification.time}</Text>
                    </Box>
                  ))}
                </VStack>
                <Divider />
                <Box p="3" textAlign="center">
                  <Button size="sm" variant="ghost" colorScheme="brand">
                    Tüm Bildirimleri Gör
                  </Button>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Menu>
            <MenuButton>
              <Flex align="center" gap="2">
                <Avatar 
                  size={isMobile ? "xs" : "sm"} 
                  name="Admin User" 
                  bg="brand.500"
                  className={styles.avatar}
                />
                <Text display={{ base: 'none', md: 'block' }} fontSize="sm" fontWeight="medium">Admin User</Text>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser />} fontSize="sm">Profil</MenuItem>
              <MenuItem icon={<FiSettings />} fontSize="sm">Ayarlar</MenuItem>
              <MenuItem 
                icon={<FiLogOut />} 
                color="red.500"
                onClick={handleLogout}
                fontSize="sm"
              >
                Çıkış Yap
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar; 