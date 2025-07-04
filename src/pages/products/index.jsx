import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
} from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import styles from './Products.module.css';

const mockProducts = [
  {
    id: 1,
    name: 'Laptop',
    category: 'Elektronik',
    supplier: 'TechCo',
    quantity: 45,
    price: 15000,
    status: 'Stokta',
  },
  {
    id: 2,
    name: 'Akıllı Telefon',
    category: 'Elektronik',
    supplier: 'MobileCo',
    quantity: 12,
    price: 8000,
    status: 'Az',
  },
  {
    id: 3,
    name: 'Tablet',
    category: 'Elektronik',
    supplier: 'TechCo',
    quantity: 3,
    price: 5000,
    status: 'Kritik',
  },
  {
    id: 4,
    name: 'Kulaklık',
    category: 'Aksesuar',
    supplier: 'AudioCo',
    quantity: 150,
    price: 1200,
    status: 'Stokta',
  },
];

export default function Products() {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingProduct, setEditingProduct] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilter = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Stokta':
        return styles.statusInStock;
      case 'Az':
        return styles.statusLow;
      case 'Kritik':
        return styles.statusOutOfStock;
      default:
        return '';
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    onOpen();
  };

  const handleDelete = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <Flex minH="100vh">
      <Sidebar />
      <Box flex="1" ml="280px">
        <Navbar />
        <Box className={styles.pageContainer}>
          <Box className={styles.header}>
            <Heading size="lg">Ürünler</Heading>
            <Button
              leftIcon={<FiPlus />}
              onClick={() => {
                setEditingProduct(null);
                onOpen();
              }}
              className={styles.addButton}
            >
              Yeni Ürün
            </Button>
          </Box>

          <Box className={styles.searchContainer}>
            <Box position="relative" flex="1">
              <Input
                placeholder="Ürün veya tedarikçi ara..."
                value={searchTerm}
                onChange={handleSearch}
                className={styles.searchInput}
              />
              <Box position="absolute" right="3" top="50%" transform="translateY(-50%)">
                <FiSearch color="#718096" />
              </Box>
            </Box>
            <Select
              value={selectedCategory}
              onChange={handleCategoryFilter}
              className={styles.filterSelect}
              placeholder="Kategori seçin"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </Box>

          <Box className={styles.table}>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Ürün Adı</th>
                  <th className={styles.tableHeader}>Kategori</th>
                  <th className={styles.tableHeader}>Tedarikçi</th>
                  <th className={styles.tableHeader}>Stok</th>
                  <th className={styles.tableHeader}>Fiyat</th>
                  <th className={styles.tableHeader}>Durum</th>
                  <th className={styles.tableHeader}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{product.name}</td>
                    <td className={styles.tableCell}>{product.category}</td>
                    <td className={styles.tableCell}>{product.supplier}</td>
                    <td className={styles.tableCell}>{product.quantity}</td>
                    <td className={styles.tableCell}>₺{product.price.toLocaleString()}</td>
                    <td className={styles.tableCell}>
                      <span className={`${styles.statusBadge} ${getStatusClass(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <Flex gap={2}>
                        <IconButton
                          icon={<FiEdit2 />}
                          onClick={() => handleEdit(product)}
                          className={styles.actionButton}
                          aria-label="Düzenle"
                        />
                        <IconButton
                          icon={<FiTrash2 />}
                          onClick={() => handleDelete(product.id)}
                          className={styles.actionButton}
                          aria-label="Sil"
                        />
                      </Flex>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>

          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent className={styles.modal}>
              <ModalHeader className={styles.modalHeader}>
                {editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form className={styles.modalForm}>
                  <FormControl className={styles.formGroup}>
                    <FormLabel className={styles.formLabel}>Ürün Adı</FormLabel>
                    <Input
                      className={styles.formInput}
                      defaultValue={editingProduct?.name}
                    />
                  </FormControl>
                  <FormControl className={styles.formGroup}>
                    <FormLabel className={styles.formLabel}>Kategori</FormLabel>
                    <Select
                      className={styles.formInput}
                      defaultValue={editingProduct?.category}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className={styles.formGroup}>
                    <FormLabel className={styles.formLabel}>Tedarikçi</FormLabel>
                    <Input
                      className={styles.formInput}
                      defaultValue={editingProduct?.supplier}
                    />
                  </FormControl>
                  <FormControl className={styles.formGroup}>
                    <FormLabel className={styles.formLabel}>Stok Miktarı</FormLabel>
                    <Input
                      type="number"
                      className={styles.formInput}
                      defaultValue={editingProduct?.quantity}
                    />
                  </FormControl>
                  <FormControl className={styles.formGroup}>
                    <FormLabel className={styles.formLabel}>Fiyat</FormLabel>
                    <Input
                      type="number"
                      className={styles.formInput}
                      defaultValue={editingProduct?.price}
                    />
                  </FormControl>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  İptal
                </Button>
                <Button colorScheme="teal">
                  {editingProduct ? 'Güncelle' : 'Ekle'}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Flex>
  );
} 