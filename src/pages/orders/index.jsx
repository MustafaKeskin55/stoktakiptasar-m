import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Select,
  Button,
  IconButton,
  useDisclosure,
  Text,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import {
  FiPlus,
  FiSearch,
  FiClock,
  FiCheck,
  FiX,
  FiEye,
  FiDownload,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
} from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import styles from './Orders.module.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import InvoiceTemplate from '../../components/InvoiceTemplate';

const mockOrders = [
  {
    id: "ORD-001",
    customer: {
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com"
    },
    date: "2024-03-15",
    total: "₺2,450",
    status: "Tamamlandı",
    items: [
      { id: 1, name: "Ürün 1", quantity: 2, price: "₺750" },
      { id: 2, name: "Ürün 2", quantity: 1, price: "₺950" }
    ]
  },
  {
    id: "ORD-002",
    customer: {
      name: "Mehmet Demir",
      email: "mehmet@example.com"
    },
    date: "2024-03-14",
    total: "₺1,850",
    status: "Beklemede",
    items: [
      { id: 3, name: "Ürün 3", quantity: 1, price: "₺1,850" }
    ]
  },
  {
    id: "ORD-003",
    customer: {
      name: "Ayşe Kaya",
      email: "ayse@example.com"
    },
    date: "2024-03-14",
    total: "₺3,200",
    status: "İptal Edildi",
    items: [
      { id: 4, name: "Ürün 4", quantity: 2, price: "₺1,200" },
      { id: 5, name: "Ürün 5", quantity: 2, price: "₺400" }
    ]
  },
  {
    id: "ORD-004",
    customer: {
      name: "Can Yıldız",
      email: "can@example.com"
    },
    date: "2024-03-13",
    total: "₺1,200",
    status: "Tamamlandı",
    items: [
      { id: 6, name: "Ürün 6", quantity: 1, price: "₺1,200" }
    ]
  },
  {
    id: "ORD-005",
    customer: {
      name: "Zeynep Ak",
      email: "zeynep@example.com"
    },
    date: "2024-03-13",
    total: "₺4,500",
    status: "Beklemede",
    items: [
      { id: 7, name: "Ürün 7", quantity: 3, price: "₺1,000" },
      { id: 8, name: "Ürün 8", quantity: 2, price: "₺750" }
    ]
  }
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'Tamamlandı':
      return <FiCheck size={16} />;
    case 'Beklemede':
      return <FiClock size={16} />;
    case 'İptal Edildi':
      return <FiX size={16} />;
    default:
      return null;
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case 'Tamamlandı':
      return styles.statusCompleted;
    case 'Beklemede':
      return styles.statusPending;
    case 'İptal Edildi':
      return styles.statusCancelled;
    default:
      return '';
  }
};

export default function Orders() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  const handleDownloadInvoice = async (order) => {
    setSelectedInvoiceOrder(order);
    setShowInvoice(true);
    
    setTimeout(async () => {
      const invoiceElement = document.getElementById('invoice-template');
      if (invoiceElement) {
        try {
          const canvas = await html2canvas(invoiceElement);
          const imgData = canvas.toDataURL('image/png');
          
          const pdf = new jsPDF('p', 'px', [800, 1130]);
          pdf.addImage(imgData, 'PNG', 0, 0, 800, 1130);
          pdf.save(`fatura-${order.id}.pdf`);
          
          toast({
            title: "Fatura indirildi",
            description: `${order.id} numaralı siparişin faturası başarıyla indirildi.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } catch (error) {
          toast({
            title: "Hata",
            description: "Fatura oluşturulurken bir hata oluştu.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        setShowInvoice(false);
      }
    }, 1000);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
    toast({
      title: "Sipariş durumu güncellendi",
      description: `Sipariş ${orderId} durumu "${newStatus}" olarak güncellendi.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleApproveOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: "Tamamlandı" }
        : order
    ));
    toast({
      title: "Sipariş onaylandı",
      description: `Sipariş ${orderId} başarıyla onaylandı.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getCustomerInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Flex minH="100vh">
      <Sidebar />
      <Box flex="1" ml="280px">
        <Navbar />
        <Box className={styles.pageContainer}>
          <Box className={styles.header}>
            <Heading size="lg">Siparişler</Heading>
            <Button
              leftIcon={<FiPlus />}
              onClick={onOpen}
              className={styles.addButton}
            >
              Yeni Sipariş
            </Button>
          </Box>

          <Box className={styles.filterSection}>
            <Input
              placeholder="Sipariş ID, müşteri adı veya e-posta ara..."
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
            />
            <Select
              value={statusFilter}
              onChange={handleStatusFilter}
              className={styles.filterSelect}
              placeholder="Tüm Durumlar"
            >
              <option value="Beklemede">Beklemede</option>
              <option value="Tamamlandı">Tamamlandı</option>
              <option value="İptal Edildi">İptal Edildi</option>
            </Select>
          </Box>

          <Box className={styles.table}>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Sipariş ID</th>
                  <th className={styles.tableHeader}>Müşteri</th>
                  <th className={styles.tableHeader}>Tarih</th>
                  <th className={styles.tableHeader}>Ürün Sayısı</th>
                  <th className={styles.tableHeader}>Toplam</th>
                  <th className={styles.tableHeader}>Durum</th>
                  <th className={styles.tableHeader}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{order.id}</td>
                    <td className={styles.tableCell}>
                      <div className={styles.customerCell}>
                        <div className={styles.customerAvatar}>
                          {getCustomerInitials(order.customer.name)}
                        </div>
                        <div className={styles.customerInfo}>
                          <span className={styles.customerName}>{order.customer.name}</span>
                          <span className={styles.customerEmail}>{order.customer.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.tableCell} ${styles.dateCell}`}>
                      {new Date(order.date).toLocaleDateString('tr-TR')}
                    </td>
                    <td className={styles.tableCell}>{order.items.length} ürün</td>
                    <td className={`${styles.tableCell} ${styles.priceCell}`}>{order.total}</td>
                    <td className={styles.tableCell}>
                      <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <Flex gap={2}>
                        <Tooltip label="Siparişi Görüntüle">
                          <IconButton
                            icon={<FiEye />}
                            className={styles.actionButton}
                            aria-label="Görüntüle"
                            onClick={() => handleViewOrder(order)}
                          />
                        </Tooltip>
                        <Tooltip label="Faturayı İndir">
                          <IconButton
                            icon={<FiDownload />}
                            className={styles.actionButton}
                            aria-label="İndir"
                            onClick={() => handleDownloadInvoice(order)}
                          />
                        </Tooltip>
                        <Tooltip label="Siparişi Düzenle">
                          <IconButton
                            icon={<FiEdit2 />}
                            className={styles.actionButton}
                            aria-label="Düzenle"
                            onClick={() => handleViewOrder(order)}
                          />
                        </Tooltip>
                        {order.status === "Beklemede" && (
                          <Tooltip label="Siparişi Onayla">
                            <IconButton
                              icon={<FiCheckCircle />}
                              className={`${styles.actionButton} ${styles.approveButton}`}
                              aria-label="Onayla"
                              onClick={() => handleApproveOrder(order.id)}
                              colorScheme="green"
                            />
                          </Tooltip>
                        )}
                      </Flex>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>

          <Box className={styles.footer}>
            <Text>Toplam {filteredOrders.length} sipariş bulundu</Text>
          </Box>
        </Box>

        {/* Sipariş Detay Modalı */}
        <Modal isOpen={isOpen && selectedOrder} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Sipariş Detayı - {selectedOrder?.id}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedOrder && (
                <Box>
                  <Flex justify="space-between" mb={4}>
                    <Box>
                      <Text fontWeight="bold">Müşteri Bilgileri</Text>
                      <Text>{selectedOrder.customer.name}</Text>
                      <Text>{selectedOrder.customer.email}</Text>
                    </Box>
                    <Box textAlign="right">
                      <Text fontWeight="bold">Sipariş Tarihi</Text>
                      <Text>{new Date(selectedOrder.date).toLocaleDateString('tr-TR')}</Text>
                    </Box>
                  </Flex>

                  <Box mb={4}>
                    <Text fontWeight="bold" mb={2}>Sipariş Durumu</Text>
                    <Select
                      value={selectedOrder.status}
                      onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value)}
                    >
                      <option value="Beklemede">Beklemede</option>
                      <option value="Tamamlandı">Tamamlandı</option>
                      <option value="İptal Edildi">İptal Edildi</option>
                    </Select>
                  </Box>

                  <Box mb={4}>
                    <Text fontWeight="bold" mb={2}>Ürünler</Text>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Ürün</Th>
                          <Th isNumeric>Adet</Th>
                          <Th isNumeric>Fiyat</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {selectedOrder.items.map((item) => (
                          <Tr key={item.id}>
                            <Td>{item.name}</Td>
                            <Td isNumeric>{item.quantity}</Td>
                            <Td isNumeric>{item.price}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>

                  <Flex justify="space-between" mt={4}>
                    <Text fontWeight="bold">Toplam Tutar:</Text>
                    <Text fontWeight="bold">{selectedOrder.total}</Text>
                  </Flex>
                </Box>
              )}
            </ModalBody>
            <ModalFooter>
              {selectedOrder?.status === "Beklemede" && (
                <Button
                  colorScheme="green"
                  mr={3}
                  leftIcon={<FiCheckCircle />}
                  onClick={() => {
                    handleApproveOrder(selectedOrder.id);
                    onClose();
                  }}
                >
                  Siparişi Onayla
                </Button>
              )}
              <Button
                colorScheme="red"
                mr={3}
                leftIcon={<FiTrash2 />}
                onClick={() => {
                  setOrders(orders.filter(o => o.id !== selectedOrder.id));
                  toast({
                    title: "Sipariş silindi",
                    description: `${selectedOrder.id} numaralı sipariş başarıyla silindi.`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                  onClose();
                }}
              >
                Siparişi Sil
              </Button>
              <Button onClick={onClose}>Kapat</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Box 
          position="fixed" 
          left="-9999px" 
          top="-9999px"
          visibility={showInvoice ? "visible" : "hidden"}
        >
          {selectedInvoiceOrder && (
            <InvoiceTemplate order={selectedInvoiceOrder} />
          )}
        </Box>
      </Box>
    </Flex>
  );
} 