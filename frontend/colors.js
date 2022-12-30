import { Appearance } from 'react-native';

const systemTheme = Appearance.getColorScheme();

const Dark = {
  background: '#383A59',
  accent: '#BD93F9',
};

const Light = {
  background: '#EEE7F4',
  accent: '#BD93F9',
};

const colorScheme = systemTheme === 'dark' ? Dark : Light;

export default colorScheme;
