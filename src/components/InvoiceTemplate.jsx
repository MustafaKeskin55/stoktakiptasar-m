import React from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import invoicePdf from '../assets/logos/White Beige Minimalist Professional Business Invoice (1) - Kopya.pdf';
import logo from '../assets/logos/e-arsiv-logo.png';

const InvoiceTemplate = ({ order }) => {
  const calculateSubtotal = () => {
    return order.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₺', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const kdv = subtotal * 0.18;
  const total = subtotal + kdv;

  const formatPrice = (price) => {
    return `₺${price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <Box
      id="invoice-template"
      position="relative"
      w="800px"
      h="1130px"
      bg="white"
      p={0}
      overflow="hidden"
    >
      {/* Çapraz Örnek Yazısı */}
      <Box
        position="absolute"
        width="150%"
        textAlign="center"
        top="50%"
        left="-25%"
        transform="rotate(-45deg)"
        zIndex={100}
        pointerEvents="none"
      >
        <Text
          fontSize="48px"
          fontWeight="bold"
          color="rgba(255, 0, 0, 0.3)"
          letterSpacing="4px"
          textShadow="2px 2px 4px rgba(0,0,0,0.2)"
        >
          ÖRNEKTİR KULLANILAMAZ
        </Text>
      </Box>

      {/* Logo ve E-Arşiv Başlık */}
      <Box position="absolute" top="40px" left="0" right="0" display="flex" justifyContent="center" alignItems="center">
        <Image src={logo} alt="e-Arşiv Logo" width="80px" height="80px" />
      </Box>
      <Box position="absolute" top="130px" left="0" right="0" textAlign="center">
        <Text fontSize="16px" fontWeight="medium">e-Arşiv Fatura</Text>
      </Box>

      {/* Tarih */}
      <Box position="absolute" top="40px" left="40px">
        <Text>Tarih: {new Date(order.date).toLocaleDateString('tr-TR')}</Text>
      </Box>

      {/* Firma Bilgileri */}
      <Box position="absolute" top="180px" left="40px">
        <Text fontSize="20px" fontWeight="bold">STOK TAKİP SİSTEMİ</Text>
        <Text mt={2}>Şirket Adres: İstanbul, Türkiye</Text>
        <Text>Tel: +90 (212) 555-0123</Text>
        <Text>E-posta: info@stoktakip.com</Text>
        <Text>Vergi No: 1234567890</Text>
      </Box>

      {/* Fatura Numarası */}
      <Box position="absolute" top="180px" right="40px">
        <Text fontSize="16px" fontWeight="bold">Fatura No: {order.id}</Text>
      </Box>

      {/* Müşteri Bilgileri */}
      <Box position="absolute" top="280px" right="40px">
        <Text fontWeight="bold">MÜŞTERİ BİLGİLERİ</Text>
        <Text mt={2}>{order.customer.name}</Text>
        <Text>{order.customer.email}</Text>
      </Box>

      {/* Ürün Tablosu */}
      <Box position="absolute" top="350px" left="40px" right="40px">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f7f7f7' }}>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>ÜRÜN</th>
              <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>MİKTAR</th>
              <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>BİRİM FİYAT</th>
              <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>TOPLAM</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => {
              const price = parseFloat(item.price.replace('₺', '').replace(',', ''));
              const itemTotal = price * item.quantity;
              return (
                <tr key={item.id}>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.name}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right' }}>{item.quantity}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right' }}>{item.price}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right' }}>{formatPrice(itemTotal)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>

      {/* Toplam Bilgileri */}
      <Box position="absolute" top="650px" right="40px" w="300px">
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Text>Ara Toplam:</Text>
          <Text>{formatPrice(subtotal)}</Text>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Text>KDV (%18):</Text>
          <Text>{formatPrice(kdv)}</Text>
        </Box>
        <Box display="flex" justifyContent="space-between" pt={2} borderTop="2px solid #ddd">
          <Text fontWeight="bold">Genel Toplam:</Text>
          <Text fontWeight="bold">{formatPrice(total)}</Text>
        </Box>
      </Box>

      {/* Banka Bilgileri */}
      <Box position="absolute" top="750px" left="40px">
        <Text fontWeight="bold" mb={2}>BANKA BİLGİLERİ</Text>
        <Text>Banka: XYZ Bank</Text>
        <Text>IBAN: TR12 3456 7890 1234 5678 9012 34</Text>
        <Text>Hesap Sahibi: Stok Takip Sistemi Ltd. Şti.</Text>
      </Box>

      {/* Notlar */}
      <Box position="absolute" top="900px" left="40px" right="40px">
        <Text fontWeight="bold" mb={2}>NOTLAR</Text>
        <Text fontSize="sm">
          Bu fatura elektronik olarak oluşturulmuştur ve geçerli bir mali belgedir.
          Ödeme vadesi fatura tarihinden itibaren 30 gündür.
          Geç ödemelerde yasal faiz uygulanır.
        </Text>
      </Box>

      {/* İletişim Bilgileri */}
      <Box position="absolute" bottom="40px" left="0" right="0" textAlign="center">
        <Text>Tel: +90 (212) 555-0123</Text>
        <Text>E-posta: info@stoktakip.com</Text>
        <Text>www.stoktakip.com</Text>
      </Box>
    </Box>
  );
};

export default InvoiceTemplate; 