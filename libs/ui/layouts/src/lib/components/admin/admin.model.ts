import { IconDefinition } from '@ant-design/icons-angular';

export type MenuItems = {
  name: string;
  icon: IconDefinition;
  childrens?: ChildrenItems[];
};

type ChildrenItems = {
  name: string;
  url: string;
};
