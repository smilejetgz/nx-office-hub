import { IconDefinition } from '@ant-design/icons-angular';

export interface MenuItems {
  name: string;
  icon: IconDefinition;
  childrens?: ChildrenItems[];
}

export interface ChildrenItems {
  name: string;
  url: string;
}
