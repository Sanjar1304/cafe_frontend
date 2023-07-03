import { AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective } from './accordion';

import { MenuItems } from './menu-items';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
   ],
  providers: [ MenuItems]
})
export class SharedModule { }
