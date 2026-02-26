import type { TopMenuModel } from '../models/topMenusModel';

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const normalizedBasePath = configuredBasePath
  ? `/${configuredBasePath.replace(/^\/+|\/+$/g, '')}`
  : '';
const withBasePath = (path: string) => `${normalizedBasePath}${path}`;

export const topMenusConfig: TopMenuModel[] = [
  {
    key: 'rooms',
    menuKey: 'rooms',
    url: withBasePath('/rooms'),
    isExternal: false,
    subMenus: [],
  },
  {
    key: 'cards',
    menuKey: 'cards',
    url: withBasePath('/cards'),
    isExternal: false,
    subMenus: [],
  },
  {
    key: 'news',
    menuKey: 'news',
    url: withBasePath('/news'),
    isExternal: false,
    subMenus: [],
  },
];

export default topMenusConfig;
