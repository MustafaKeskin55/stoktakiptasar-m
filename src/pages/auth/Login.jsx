import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('admin@stoktakip.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Burada normalde API çağrısı yapılacak
      // Şimdilik mock login yapıyoruz
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Başarılı login sonrası
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('user', JSON.stringify({
        name: 'Admin User',
        email: email,
        role: 'admin'
      }));

      toast({
        title: 'Giriş başarılı',
        description: 'Yönlendiriliyorsunuz...',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Giriş başarısız',
        description: 'Email veya şifre hatalı',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="lg"
        w={{ base: "90%", md: "400px" }}
      >
        <VStack spacing={6}>
          <Heading size="lg" color="blue.600">StokTakip</Heading>
          <Text color="gray.600">Stok yönetim sistemine hoş geldiniz</Text>

          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Box>
              <Text fontWeight="medium">Demo Giriş Bilgileri:</Text>
              <Text>E-posta: admin@stoktakip.com</Text>
              <Text>Şifre: admin123</Text>
            </Box>
          </Alert>

          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>E-posta</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@sirket.com"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Şifre</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <InputRightElement>
                    <IconButton
                      icon={showPassword ? <FiEyeOff /> : <FiEye />}
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                w="100%"
                isLoading={isLoading}
              >
                Giriş Yap
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login; 