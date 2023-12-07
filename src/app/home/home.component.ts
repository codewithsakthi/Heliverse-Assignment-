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
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';

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
    DialogModule,
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
    ButtonModule,
    MessagesModule,
    AccordionModule
    
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  Users: UserData[] = studentsData;  
  messages: Message[] = [];
  error:string="";
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
  visible: boolean = false;
  position: any = 'top-right';

  constructor(  ) {    
    this.totalUsers = this.Users.length;
    this.paginatedUsers = this.Users.slice(0, this.rows);
    
  }
  ngOnInit(): void {
    this.filteredCards=this.Users
    this.findUniqueDomains();
  }
  findUniqueDomains() {
    this.uniqueDomains = [...new Set(this.Users.map((card: any) => card.domain))];
    this.uniqueGenders = [...new Set(this.Users.map((card: any) => card.gender))];

  }

  createTeam() {
    const selectedDomain = this.filteredCards.filter((card: any) => card.available && !this.selectedTeam.includes(card));
    this.selectedTeam = [...this.selectedTeam, ...selectedDomain];
  }

  showTeamDetails() {
    console.log('Team Members:', this.selectedTeam);
  }
  onPageChange(event: any) {
    console.log('onPageChange event:', event);
    const startIndex = event.first;
    console.log('startIndex:', startIndex);
    console.log('this.rows:', this.rows);
    console.log('this.filteredCards:', this.filteredCards);
  
    this.paginatedUsers = this.filteredCards.slice(startIndex, startIndex + this.rows);
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
  

  applyFilters() {
    const domain = this.getFilterValue('domain');
    const gender = this.getFilterValue('gender');
    const availability = this.getFilterValue('availability');
  
    this.filteredCards = this.Users.filter((card: any) =>
      (domain ? card.domain === domain : true) &&
      (gender ? card.gender === gender : true) &&
      (availability !== null ? card.available === availability : true)
    );
    this.onPageChange({ first: 0 });
  }
  searchByName(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const searchValue = inputElement.value.toLowerCase();
      this.filteredCards = this.Users.filter(
        (card: any) =>
          card.first_name.toLowerCase().includes(searchValue) ||
          card.last_name.toLowerCase().includes(searchValue)
      );
    }
    this.onPageChange({ first: 0 });

  }
  getFilterValue(filterType: string): string | boolean | null {
    const selectElement = document.getElementById(`${filterType}Select`) as HTMLSelectElement;
  
    if (selectElement) {
      return filterType === 'availability'
        ? selectElement.value === 'true'
        : selectElement.value || null;
    }
  
    return null;
  }

  addToTeam(card: any) {
    if (card.available) {
      if (!this.selectedTeam.includes(card)) {
        const memberInTeam = this.teams.some(team => team.includes(card));
        
        if (!memberInTeam) {
          const domainConflict = this.selectedTeam.some(member => member.domain === card.domain);
  
          if (!domainConflict) {
            this.selectedTeam.push(card);
          } else {
            this.showDialog(`Another user from the domain ${card.domain} is already in the team.`);
          }
        } else {
          this.showDialog(`${card.first_name} ${card.last_name} is already in a team.`);
        }
      }
    } else {
      this.showDialog(`${card.first_name} ${card.last_name} is not Available.`);
    }
  }
  
  isMemberAlreadyAdded(card: any): boolean {
    return this.selectedTeam.includes(card);
  }
  
  formTeam() {
    this.teams.push(this.selectedTeam);

    this.Users = this.Users.filter(card => !this.selectedTeam.includes(card));

    this.selectedTeam = [];
  }

  showDialog(error:string) {
      this.error =error;
      this.visible = true;
  }


}
