import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { VisitsComponent } from './visits/visits.component';
import { VisitService } from './visits/visit.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, VisitsComponent],// <-- to je ključno za *ngFor, *ngIf, ipd.
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  visits: any[] = [];
  visitCount: number = 0; 

  constructor(
    private http: HttpClient, 
    private visitService: VisitService
  ) {}

  ngOnInit(): void {
    this.visitService.logVisit().subscribe(() => {
      this.loadData();
    });

    // 1. Zabeleži obisk
    this.http.post(`${environment.apiUrl}/visit`, {}).subscribe();

    // 2. Pridobi vse obiske
    this.http.get<any[]>(`${environment.apiUrl}/visits`).subscribe(data => {
      this.visits = data;
    });
  }

  loadData(): void {
    this.visitService.getVisits().subscribe(data => {
      this.visits = data;
    });

    this.visitService.getVisitCount().subscribe(count => {
      this.visitCount = count;
    });
  }

  deleteVisits(): void {
    if (confirm('Si prepričan, da želiš izbrisati vse obiske?')) {
      this.visitService.deleteAllVisits().subscribe(() => {
        this.loadData();
      });
    }
  }

}
