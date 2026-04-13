import path from 'path';
import { updateWidget } from '@evershop/evershop/lib/widget';

export default async () => {
  updateWidget('basic_menu', {
    component: path.resolve(
      import.meta.dirname,
      'components',
      'BasicMenu.js'
    )
  });
};
