import { Injectable } from "@angular/core";

export interface Menu {
  state: string;
  name: string;
  icon: string;
  role: string;
}

const MENUITEMS = [
  {state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: ''},
  {state: 'category', name: 'Manage Category', icon: 'category', role: ''},
  {state: 'product', name: 'Manage Product', icon: 'inventory', role: ''},
  {state: 'order', name: 'Manage Order', icon: 'list_alt', role: ''},
  {state: 'bill', name: 'View Bill', icon: 'import_contacts', role: ''},
  {state: 'user', name: 'Manage User', icon: 'people', role: ''},
];


@Injectable()
export class MenuItems {
  getMenuItems(): Menu[] {
    return MENUITEMS
  }
}
