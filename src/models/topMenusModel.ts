export type TopMenuModel = {
  key: string;
  menuKey: string;
  url: string;
  isExternal: boolean;
  subMenus: TopMenuModel[];
};
