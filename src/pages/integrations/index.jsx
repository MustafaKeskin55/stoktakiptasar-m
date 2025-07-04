import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Switch,
  Button,
  useToast,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';
import styles from './Integrations.module.css';
import IntegrationSettingsModal from '../../components/IntegrationSettingsModal';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

// Import platform logos
import trendyolLogo from '../../assets/logos/trendyol.svg';
import hepsiburadaLogo from '../../assets/logos/hepsiburada.svg';
import n11Logo from '../../assets/logos/n11.svg';
import amazonLogo from '../../assets/logos/amazon.svg';

const platforms = [
  {
    id: 'trendyol',
    name: 'Trendyol',
    logo: trendyolLogo,
    description: 'Türkiye\'nin önde gelen e-ticaret platformu',
  },
  {
    id: 'hepsiburada',
    name: 'Hepsiburada',
    logo: hepsiburadaLogo,
    description: 'Her şey ayağınıza gelsin',
  },
  {
    id: 'n11',
    name: 'n11',
    logo: n11Logo,
    description: 'Alışverişin uğurlu adresi',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: amazonLogo,
    description: 'Global e-ticaret devi',
  },
];

export default function Integrations() {
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleToggle = (platformId) => {
    if (connectedPlatforms.includes(platformId)) {
      setConnectedPlatforms(connectedPlatforms.filter(id => id !== platformId));
      toast({
        title: 'Bağlantı kesildi',
        description: `${platforms.find(p => p.id === platformId).name} bağlantısı kesildi.`,
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setConnectedPlatforms([...connectedPlatforms, platformId]);
      toast({
        title: 'Bağlantı başarılı',
        description: `${platforms.find(p => p.id === platformId).name} bağlantısı kuruldu.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleOpenSettings = (platform) => {
    setSelectedPlatform(platform);
    onOpen();
  };

  return (
    <Flex minH="100vh">
      <Sidebar />
      <Box flex="1" ml="280px">
        <Navbar />
        <Box p={8}>
          <Heading mb={6}>Entegrasyonlar</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
            {platforms.map((platform) => {
              const isConnected = connectedPlatforms.includes(platform.id);
              return (
                <Box key={platform.id} className={styles.integrationCard}>
                  <Box className={styles.cardHeader}>
                    <img
                      src={platform.logo}
                      alt={`${platform.name} logo`}
                      className={`${styles.platformLogo} ${!isConnected ? styles.inactive : ''}`}
                    />
                    <Text className={styles.platformName}>{platform.name}</Text>
                    <Text className={styles.platformDescription}>{platform.description}</Text>
                  </Box>
                  <Box className={styles.cardBody}>
                    <Box className={styles.switchContainer}>
                      <Switch
                        isChecked={isConnected}
                        onChange={() => handleToggle(platform.id)}
                        colorScheme="orange"
                      />
                      <Text>{isConnected ? 'Bağlı' : 'Bağlı değil'}</Text>
                    </Box>
                  </Box>
                  <Box className={styles.cardFooter}>
                    <Button
                      leftIcon={isConnected ? <FiSettings /> : null}
                      onClick={() => isConnected ? handleOpenSettings(platform) : handleToggle(platform.id)}
                      variant="ghost"
                      className={styles.actionButton}
                      w="full"
                    >
                      {isConnected ? 'Ayarlar' : 'Bağlan'}
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </SimpleGrid>

          <IntegrationSettingsModal
            isOpen={isOpen}
            onClose={onClose}
            platform={selectedPlatform}
          />
        </Box>
      </Box>
    </Flex>
  );
} 