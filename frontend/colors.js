import { Appearance } from 'react-native';

const systemTheme = Appearance.getColorScheme();

const Dark = {
  background: '#383A59',
  accent: '#BD93F9',
  shadowDark: '#282A36',
  accentSecondary: '#c39df9',
  borderBottom: '#62669d',
};

const Light = {
  background: '#EEE7F4',
  accent: '#BD93F9',
  shadowDark: '#282A36',
  accentSecondary: '#c39df9',
  borderBottom: '#62669d',
};

const colorScheme = systemTheme === 'dark' ? Dark : Light;

export default colorScheme;
