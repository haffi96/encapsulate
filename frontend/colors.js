import { Appearance } from 'react-native';
import { storeData } from './services/storage';

const systemTheme = Appearance.getColorScheme();

const darkTheme = {
  background: '#383A59',
  accent: '#BD93F9',
  shadowDark: '#282A36',
  accentSecondary: '#c39df9',
  borderBottom: '#62669d',
};

const lightTheme = {
  background: '#EEE7F4',
  accent: '#BD93F9',
  shadowDark: '#282A36',
  accentSecondary: '#c39df9',
  borderBottom: '#62669d',
};

const defaultScheme = systemTheme === 'dark' ? darkTheme : lightTheme;

storeData('@colorScheme', defaultScheme);

export default defaultScheme;
