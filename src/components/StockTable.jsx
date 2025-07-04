import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Input,
  Select,
  HStack,
  Text,
  Box,
  Flex,
  Tag,
  TagLabel,
  TagCloseButton,
  useBreakpointValue,
  Tooltip,
  Card,
  CardBody,
  SimpleGrid,
  Stack,
  Skeleton,
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { FiMoreVertical, FiEdit2, FiTrash2, FiFilter, FiSearch, FiChevronDown, FiX, FiEye } from 'react-icons/fi';
import styles from './StockTable.module.css';
import { useState } from 'react';

const StockTable = ({ data, isLoading = false }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [filters, setFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Stokta':
        return 'green';
      case 'Az':
        return 'orange';
      case 'Tükendi':
        return 'red';
      default:
        return 'gray';
    }
  };

  const addFilter = (type, value) => {
    if (!activeFilters.find(f => f.type === type && f.value === value)) {
      setActiveFilters([...activeFilters, { type, value }]);
    }
  };

  const removeFilter = (index) => {
    const newFilters = [...activeFilters];
    newFilters.splice(index, 1);
    setActiveFilters(newFilters);
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchTerm('');
  };

  // Filtreleme işlemi
  const filteredData = data.filter(item => {
    // Arama terimi kontrolü
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Aktif filtreler kontrolü
    const matchesFilters = activeFilters.length === 0 || 
      activeFilters.every(filter => {
        if (filter.type === 'category') {
          return item.category === filter.value;
        }
        if (filter.type === 'status') {
          return item.status === filter.value;
        }
        return true;
      });
    
    return matchesSearch && matchesFilters;
  });

  // Mobil görünüm için kart bileşeni
  const MobileCard = ({ item }) => (
    <Card 
      className={styles.mobileCard}
      variant="outline"
      borderLeft="4px solid"
      borderLeftColor={`${getStatusColor(item.status)}.500`}
      mb={3}
    >
      <CardBody p={3}>
        <Flex justify="space-between" align="flex-start">
          <Box>
            <Text fontWeight="bold" fontSize="md">{item.name}</Text>
            <Text fontSize="sm" color="gray.600">{item.category}</Text>
          </Box>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FiMoreVertical />}
              variant="ghost"
              size="sm"
            />
            <MenuList>
              <MenuItem icon={<FiEye />}>Görüntüle</MenuItem>
              <MenuItem icon={<FiEdit2 />}>Düzenle</MenuItem>
              <MenuItem icon={<FiTrash2 />} color="red.500">
                Sil
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        
        <Flex mt={3} justify="space-between" align="center">
          <HStack spacing={2}>
            <Text fontSize="sm" fontWeight="medium">Miktar: {item.quantity}</Text>
            <Text fontSize="sm" fontWeight="medium">₺{item.price.toLocaleString()}</Text>
          </HStack>
          <Badge colorScheme={getStatusColor(item.status)}>
            {item.status}
          </Badge>
        </Flex>
      </CardBody>
    </Card>
  );

  return (
    <div className={styles.tableContainer}>
      <Box mb={4}>
        <InputGroup size={isMobile ? "sm" : "md"} className={styles.searchInputGroup}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="var(--chakra-colors-gray-400)" />
          </InputLeftElement>
          <Input
            placeholder="Ürün ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            borderRadius="full"
            className={styles.searchInput}
          />
          {searchTerm && (
            <InputRightElement>
              <IconButton
                icon={<FiX />}
                size="xs"
                variant="ghost"
                onClick={() => setSearchTerm('')}
                aria-label="Aramayı temizle"
              />
            </InputRightElement>
          )}
        </InputGroup>
      </Box>

      <Flex justify="space-between" align="center" mb={4} flexWrap="wrap" gap={2}>
        <HStack spacing={2} flexWrap="wrap">
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<FiChevronDown />} size={isMobile ? "sm" : "md"} variant="outline">
              Kategori
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => addFilter('category', 'Elektronik')}>Elektronik</MenuItem>
              <MenuItem onClick={() => addFilter('category', 'Giyim')}>Giyim</MenuItem>
              <MenuItem onClick={() => addFilter('category', 'Gıda')}>Gıda</MenuItem>
            </MenuList>
          </Menu>

          <Menu closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<FiChevronDown />} size={isMobile ? "sm" : "md"} variant="outline">
              Durum
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => addFilter('status', 'Stokta')}>Stokta</MenuItem>
              <MenuItem onClick={() => addFilter('status', 'Az')}>Az</MenuItem>
              <MenuItem onClick={() => addFilter('status', 'Tükendi')}>Tükendi</MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        {activeFilters.length > 0 && (
          <Button 
            size={isMobile ? "sm" : "md"} 
            variant="ghost" 
            colorScheme="red" 
            leftIcon={<FiX />}
            onClick={clearFilters}
          >
            Filtreleri Temizle
          </Button>
        )}
      </Flex>

      {activeFilters.length > 0 && (
        <Flex gap={2} mb={4} flexWrap="wrap">
          {activeFilters.map((filter, index) => (
            <Tag 
              key={index} 
              size={isMobile ? "sm" : "md"} 
              borderRadius="full" 
              variant="subtle"
              colorScheme="brand"
            >
              <TagLabel>{filter.type === 'category' ? 'Kategori: ' : 'Durum: '}{filter.value}</TagLabel>
              <TagCloseButton onClick={() => removeFilter(index)} />
            </Tag>
          ))}
        </Flex>
      )}

      {isLoading ? (
        <Stack>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} height="50px" />
          ))}
        </Stack>
      ) : (
        <>
          {isMobile ? (
            <SimpleGrid columns={1} spacing={3}>
              {filteredData.map((item) => (
                <MobileCard key={item.id} item={item} />
              ))}
            </SimpleGrid>
          ) : (
            <Box className={styles.tableWrapper} borderRadius="lg" overflow="hidden">
              <Table variant="simple" className={styles.table}>
                <Thead>
                  <Tr>
                    <Th>Ürün Adı</Th>
                    <Th>Kategori</Th>
                    <Th isNumeric>Miktar</Th>
                    <Th isNumeric>Fiyat</Th>
                    <Th>Durum</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredData.map((item) => (
                    <Tr key={item.id} className={styles.tableRow}>
                      <Td>{item.name}</Td>
                      <Td>{item.category}</Td>
                      <Td isNumeric>{item.quantity}</Td>
                      <Td isNumeric>₺{item.price.toLocaleString()}</Td>
                      <Td>
                        <Badge colorScheme={getStatusColor(item.status)} borderRadius="full" px={2} py={1}>
                          {item.status}
                        </Badge>
                      </Td>
                      <Td>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<FiMoreVertical />}
                            variant="ghost"
                            size="sm"
                          />
                          <MenuList>
                            <MenuItem icon={<FiEye />}>Görüntüle</MenuItem>
                            <MenuItem icon={<FiEdit2 />}>Düzenle</MenuItem>
                            <MenuItem icon={<FiTrash2 />} color="red.500">
                              Sil
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}

          <Text mt={4} color="gray.600" fontSize="sm">
            Toplam {filteredData.length} ürün
          </Text>
        </>
      )}
    </div>
  );
};

export default StockTable; 