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
import { HeaderComponent } from '../header/header.component';

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
    HeaderComponent,
    
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  Users: UserData[] = studentsData;  
  searchName: string = '';
  filteredPeople: UserData[] = [];
  Filters: any[] = [
    { name: "Domain" },
    { name: "Gender" },
    { name: "Availability" }
  ];
  selectedFilter:any;
  filter:boolean=false;
  filteredUsers: UserData[] = [];
  domainFilter: string = '';
  genderFilter: string = '';
  availabilityFilter: boolean | null = null;
  paginatedUsers: any[] = []; 
  totalUsers: number = 0; 
  rows: number = 20;
  uniqueDomains: string[] = [];
  selectedTeam: any[] = [];
  teams: any[] = [];
  filteredCards: any[] = [];
  uniqueGenders:string[]=[];
  constructor() {    
    this.totalUsers = this.Users.length;
    this.paginatedUsers = this.Users.slice(0, this.rows);
  }
  ngOnInit(): void {
    this.findUniqueDomains();
  }
  findUniqueDomains() {
    this.uniqueDomains = [...new Set(this.Users.map((card: any) => card.domain))];
    this.uniqueGenders = [...new Set(this.Users.map((card: any) => card.gender))];

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
    this.filter=true;
    console.log(this.filteredPeople)
  }
  clear() {
    this.searchName=""
    this.filter=false;
    console.log(this.filteredPeople)
  }

  filterByDomain(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      const domain = selectElement.value;
      this.filteredCards = this.Users.filter((card: any) => (domain ? card.domain === domain : true));
    }
  }

  filterByGender(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      const gender = selectElement.value;
      this.filteredCards = this.Users.filter((card: any) => (gender ? card.gender === gender : true));
    }
  }

  filterByAvailability(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      const availability = selectElement.value;
      const available = availability === 'true' ? true : availability === 'false' ? false : null;
      this.filteredCards = this.Users.filter((card: any) =>
        available !== null ? card.available === available : true
      );
    }
  }
}
