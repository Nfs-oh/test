import dark from './dark';
import light from './light';
import bwmodel from '@/config/bwmodel';

const styles = bwmodel.theme === '1' ? dark : light;

export default {
  ...styles
};
