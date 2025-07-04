import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useRouter } from 'next/router';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Burada giriş işlemleri yapılacak
      toast({
        title: 'Giriş Başarılı',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Giriş Başarısız',
        description: 'Lütfen bilgilerinizi kontrol edin.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box className={styles.loginContainer}>
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Box className={styles.loginCard}>
          <VStack spacing="6">
            <Heading className={styles.title}>
              Stok Takip Sistemi
            </Heading>
            <form onSubmit={handleSubmit} className={styles.form}>
              <VStack spacing="5">
                <FormControl isRequired>
                  <FormLabel>E-posta</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@sirket.com"
                    size="lg"
                    className={styles.input}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Şifre</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                      className={styles.input}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        icon={showPassword ? <FiEyeOff /> : <FiEye />}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                        className={styles.iconButton}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  mt="6"
                  className={styles.submitButton}
                >
                  Giriş Yap
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Login; 