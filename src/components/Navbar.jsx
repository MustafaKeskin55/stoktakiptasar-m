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
} from '@chakra-ui/react';
import { FiSearch, FiBell, FiSettings } from 'react-icons/fi';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <Box className={styles.navbar}>
      <Flex align="center" justify="space-between" px="6" py="4">
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Ürün veya kategori ara..."
            bg="white"
            border="1px"
            borderColor="gray.200"
          />
        </InputGroup>

        <Flex align="center" gap="4">
          <IconButton
            variant="ghost"
            icon={<FiBell />}
            aria-label="Notifications"
            position="relative"
          >
            <Box
              position="absolute"
              top="2"
              right="2"
              w="2"
              h="2"
              bg="red.500"
              borderRadius="full"
            />
          </IconButton>

          <Menu>
            <MenuButton>
              <Flex align="center" gap="2">
                <Avatar size="sm" name="Admin User" />
                <Text display={{ base: 'none', md: 'block' }}>Admin User</Text>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiSettings />}>Ayarlar</MenuItem>
              <MenuItem>Profil</MenuItem>
              <MenuItem color="red.500">Çıkış Yap</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar; 