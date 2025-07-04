export const logout = () => {
  // Local storage'dan kullanıcı bilgilerini temizle
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  
  // Sayfayı yenile ve login sayfasına yönlendir
  window.location.replace('/login');
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  }
  return null;
}; 