import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Switch,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  useToast
} from '@chakra-ui/react';
import { FiUser, FiBell, FiLock, FiSettings } from 'react-icons/fi';
import styles from './Settings.module.css';

const SettingSection = ({ icon, title, children }) => {
  return (
    <Box className={styles.settingCard}>
      <Flex align="center" mb={4}>
        <Box className={styles.iconContainer}>
          {icon}
        </Box>
        <Heading size="md" ml={3}>{title}</Heading>
      </Flex>
      {children}
    </Box>
  );
};

const Settings = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = (section) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Ayarlar kaydedildi",
        description: `${section} ayarları başarıyla güncellendi.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 1000);
  };

  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.header}>
        <Heading size="lg">Ayarlar</Heading>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <SettingSection icon={<FiUser size={20} />} title="Profil Ayarları">
          <Box className={styles.form}>
            <FormControl className={styles.formGroup}>
              <FormLabel>Ad Soyad</FormLabel>
              <Input className={styles.input} placeholder="Ad Soyad" defaultValue="Admin User" />
            </FormControl>
            <FormControl className={styles.formGroup}>
              <FormLabel>E-posta</FormLabel>
              <Input className={styles.input} type="email" placeholder="E-posta" defaultValue="admin@stoktakip.com" />
            </FormControl>
            <FormControl className={styles.formGroup}>
              <FormLabel>Telefon</FormLabel>
              <Input className={styles.input} placeholder="Telefon" defaultValue="+90 555 123 4567" />
            </FormControl>
            <Button
              className={styles.saveButton}
              onClick={() => handleSave('Profil')}
              isLoading={loading}
            >
              Değişiklikleri Kaydet
            </Button>
          </Box>
        </SettingSection>

        <SettingSection icon={<FiBell size={20} />} title="Bildirim Ayarları">
          <Box className={styles.settingGroup}>
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel mb="0">E-posta Bildirimleri</FormLabel>
              <Switch colorScheme="teal" defaultChecked />
            </FormControl>
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel mb="0">Stok Uyarıları</FormLabel>
              <Switch colorScheme="teal" defaultChecked />
            </FormControl>
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel mb="0">Sipariş Bildirimleri</FormLabel>
              <Switch colorScheme="teal" defaultChecked />
            </FormControl>
            <Button
              className={styles.saveButton}
              onClick={() => handleSave('Bildirim')}
              isLoading={loading}
            >
              Değişiklikleri Kaydet
            </Button>
          </Box>
        </SettingSection>

        <SettingSection icon={<FiLock size={20} />} title="Güvenlik Ayarları">
          <Box className={styles.form}>
            <FormControl className={styles.formGroup}>
              <FormLabel>Mevcut Şifre</FormLabel>
              <Input className={styles.input} type="password" placeholder="Mevcut şifrenizi girin" />
            </FormControl>
            <FormControl className={styles.formGroup}>
              <FormLabel>Yeni Şifre</FormLabel>
              <Input className={styles.input} type="password" placeholder="Yeni şifrenizi girin" />
            </FormControl>
            <FormControl className={styles.formGroup}>
              <FormLabel>Şifre Tekrar</FormLabel>
              <Input className={styles.input} type="password" placeholder="Yeni şifrenizi tekrar girin" />
            </FormControl>
            <Button
              className={styles.saveButton}
              onClick={() => handleSave('Güvenlik')}
              isLoading={loading}
            >
              Şifreyi Güncelle
            </Button>
          </Box>
        </SettingSection>

        <SettingSection icon={<FiSettings size={20} />} title="Sistem Ayarları">
          <Box className={styles.form}>
            <FormControl className={styles.formGroup}>
              <FormLabel>Dil</FormLabel>
              <Select className={styles.select} defaultValue="tr">
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
              </Select>
            </FormControl>
            <FormControl className={styles.formGroup}>
              <FormLabel>Zaman Dilimi</FormLabel>
              <Select className={styles.select} defaultValue="europe-istanbul">
                <option value="europe-istanbul">Europe/Istanbul (UTC+3)</option>
                <option value="europe-london">Europe/London (UTC+1)</option>
              </Select>
            </FormControl>
            <FormControl display="flex" alignItems="center" justifyContent="space-between" mt={4}>
              <FormLabel mb="0">Karanlık Mod</FormLabel>
              <Switch colorScheme="teal" />
            </FormControl>
            <Button
              className={styles.saveButton}
              onClick={() => handleSave('Sistem')}
              isLoading={loading}
            >
              Değişiklikleri Kaydet
            </Button>
          </Box>
        </SettingSection>
      </SimpleGrid>
    </Box>
  );
};

export default Settings;