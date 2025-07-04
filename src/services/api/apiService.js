import { mockData } from './mockData';

// API çağrılarını simüle etmek için gecikme
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // Ürünler
  async getProducts() {
    await delay(500);
    return mockData.products;
  },

  async addProduct(product) {
    await delay(500);
    const newProduct = {
      ...product,
      id: mockData.products.length + 1,
    };
    mockData.products.push(newProduct);
    return newProduct;
  },

  // Tedarikçiler
  async getSuppliers() {
    await delay(500);
    return mockData.suppliers;
  },

  async addSupplier(supplier) {
    await delay(500);
    const newSupplier = {
      ...supplier,
      id: mockData.suppliers.length + 1,
    };
    mockData.suppliers.push(newSupplier);
    return newSupplier;
  },

  // Müşteriler
  async getCustomers() {
    await delay(500);
    return mockData.customers;
  },

  async addCustomer(customer) {
    await delay(500);
    const newCustomer = {
      ...customer,
      id: mockData.customers.length + 1,
    };
    mockData.customers.push(newCustomer);
    return newCustomer;
  },

  // Siparişler
  async getOrders() {
    await delay(500);
    return mockData.orders;
  },

  async addOrder(order) {
    await delay(500);
    const newOrder = {
      ...order,
      id: mockData.orders.length + 1,
      date: new Date().toISOString().split('T')[0],
    };
    mockData.orders.push(newOrder);
    return newOrder;
  },

  // Kategoriler
  async getCategories() {
    await delay(500);
    return mockData.categories;
  },

  // Raporlar
  async getReports() {
    await delay(500);
    return mockData.reports;
  },

  // Stok Uyarıları
  async getStockAlerts() {
    await delay(500);
    return mockData.reports.stockAlerts;
  },

  // Satış İstatistikleri
  async getSalesStats() {
    await delay(500);
    return {
      monthlySales: mockData.reports.monthlySales,
      topProducts: mockData.reports.topProducts,
    };
  },
}; 