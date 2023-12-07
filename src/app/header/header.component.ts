import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menu: boolean = false;
  menuDropdown() {
    this.menu = !this.menu;
  }

  constructor() {}

  ngOnInit(): void {}
}
