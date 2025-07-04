// Mock veri tabanı
export const mockData = {
  products: [
    { id: 1, name: 'Laptop', category: 'Elektronik', quantity: 50, price: 15000, supplier: 'TechCo', status: 'Stokta' },
    { id: 2, name: 'Mouse', category: 'Elektronik', quantity: 100, price: 250, supplier: 'TechCo', status: 'Stokta' },
    { id: 3, name: 'Klavye', category: 'Elektronik', quantity: 5, price: 750, supplier: 'PeripheralsInc', status: 'Az' },
    { id: 4, name: 'Monitor', category: 'Elektronik', quantity: 0, price: 3500, supplier: 'DisplayTech', status: 'Tükendi' },
    { id: 5, name: 'Yazıcı', category: 'Elektronik', quantity: 15, price: 2500, supplier: 'PrintCo', status: 'Stokta' },
  ],

  suppliers: [
    { id: 1, name: 'TechCo', contact: 'Ali Yılmaz', email: 'ali@techco.com', phone: '05321112233', address: 'İstanbul' },
    { id: 2, name: 'PeripheralsInc', contact: 'Ayşe Demir', email: 'ayse@peripherals.com', phone: '05332223344', address: 'Ankara' },
    { id: 3, name: 'DisplayTech', contact: 'Mehmet Kaya', email: 'mehmet@displaytech.com', phone: '05343334455', address: 'İzmir' },
    { id: 4, name: 'PrintCo', contact: 'Zeynep Şahin', email: 'zeynep@printco.com', phone: '05354445566', address: 'Bursa' },
  ],

  customers: [
    { id: 1, name: 'ABC Market', contact: 'Can Öztürk', email: 'can@abcmarket.com', phone: '02121112233', address: 'İstanbul' },
    { id: 2, name: 'XYZ Elektronik', contact: 'Deniz Yıldız', email: 'deniz@xyz.com', phone: '03122223344', address: 'Ankara' },
    { id: 3, name: 'Tech Shop', contact: 'Ece Demir', email: 'ece@techshop.com', phone: '02323334455', address: 'İzmir' },
    { id: 4, name: 'Mega Store', contact: 'Burak Aydın', email: 'burak@megastore.com', phone: '02244445566', address: 'Bursa' },
  ],

  orders: [
    { 
      id: 1, 
      customerName: 'ABC Market', 
      products: [
        { productId: 1, quantity: 2, price: 15000 },
        { productId: 2, quantity: 5, price: 250 }
      ],
      totalAmount: 31250,
      status: 'Tamamlandı',
      date: '2024-02-15'
    },
    { 
      id: 2, 
      customerName: 'XYZ Elektronik',
      products: [
        { productId: 3, quantity: 3, price: 750 },
        { productId: 4, quantity: 2, price: 3500 }
      ],
      totalAmount: 9250,
      status: 'Beklemede',
      date: '2024-02-16'
    },
  ],

  categories: [
    { id: 1, name: 'Elektronik', description: 'Elektronik ürünler' },
    { id: 2, name: 'Ofis Malzemeleri', description: 'Ofis malzemeleri ve kırtasiye' },
    { id: 3, name: 'Mobilya', description: 'Ofis mobilyaları' },
  ],

  reports: {
    monthlySales: [
      { month: 'Ocak', total: 45000 },
      { month: 'Şubat', total: 52000 },
      { month: 'Mart', total: 48000 },
    ],
    topProducts: [
      { name: 'Laptop', sales: 25 },
      { name: 'Monitor', sales: 18 },
      { name: 'Klavye', sales: 30 },
    ],
    stockAlerts: [
      { product: 'Klavye', quantity: 5, status: 'Kritik' },
      { product: 'Monitor', quantity: 0, status: 'Tükendi' },
    ]
  }
}; 