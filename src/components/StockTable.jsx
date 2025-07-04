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
} from '@chakra-ui/react';
import { FiMoreVertical, FiEdit2, FiTrash2, FiFilter } from 'react-icons/fi';
import styles from './StockTable.module.css';

const StockTable = ({ data }) => {
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

  return (
    <div className={styles.tableContainer}>
      <HStack spacing="4" mb="4">
        <Input placeholder="Ürün ara..." maxW="300px" />
        <Select placeholder="Kategori" maxW="200px">
          <option value="elektronik">Elektronik</option>
          <option value="giyim">Giyim</option>
          <option value="gida">Gıda</option>
        </Select>
        <IconButton
          icon={<FiFilter />}
          aria-label="Filtrele"
          variant="ghost"
        />
      </HStack>

      <Table variant="simple">
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
          {data.map((item) => (
            <Tr key={item.id} className={styles.tableRow}>
              <Td>{item.name}</Td>
              <Td>{item.category}</Td>
              <Td isNumeric>{item.quantity}</Td>
              <Td isNumeric>₺{item.price.toLocaleString()}</Td>
              <Td>
                <Badge colorScheme={getStatusColor(item.status)}>
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

      <Text mt="4" color="gray.600">
        Toplam {data.length} ürün
      </Text>
    </div>
  );
};

export default StockTable; 