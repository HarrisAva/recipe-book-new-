import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive ({
    selector: '[appDropdown]'
})
export class DropDownDirective {
    @HostBinding('class.open') isOpen = false; // binding to 'open' class
    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }

}