import { Component, NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import studentsData from '../../assets/heliverse_mock_data.json';  
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { AvatarModule } from 'primeng/avatar';
import { ScrollTopModule } from 'primeng/scrolltop';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DropdownModule } from 'primeng/dropdown';

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar: string;
  domain: string;
  available: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    PaginatorModule,
    AvatarModule,
    ScrollTopModule,
    NzInputModule,
    NzButtonModule,
    DropdownModule,
    
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  Users: UserData[] = studentsData;  
  searchName: string = '';
  filteredPeople: UserData[] = [];

  paginatedUsers: any[] = []; 
  totalUsers: number = 0; 
  rows: number = 20;
  constructor() {

    this.totalUsers = this.Users.length;
    this.paginatedUsers = this.Users.slice(0, this.rows);
  }

  onPageChange(event: any) {
    const startIndex = event.first;
    this.paginatedUsers = this.Users.slice(startIndex, startIndex + this.rows);
  }
  search() {
    this.filteredPeople = this.Users.filter(person =>
      person.first_name.toLowerCase().includes(this.searchName.toLowerCase()) ||
      person.last_name.toLowerCase().includes(this.searchName.toLowerCase())
    );
    console.log(this.filteredPeople)
  }
}
