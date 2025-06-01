import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitService, Visit } from './visit.service';

@Component({
  selector: 'app-visits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})

export class VisitsComponent implements OnInit {
  visits: Visit[] = [];
  currentVisit: Visit | null = null;
  visitCount: number = 0; 

  constructor(private visitService: VisitService) {}

  ngOnInit(): void {
    this.visitService.logVisit().subscribe(() => {
      this.loadVisits(); // <-- to bo naložilo visits + count
    });
  }

  formatToGMT1(timestamp: string): string {
    if (!timestamp) return '';
    const [datePart, timePart] = timestamp.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    // Ustvari UTC čas
    const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
    return utcDate.toLocaleString(); // prikaz v lokalnem formatu
  }

  loadVisits(): void {
    this.visitService.getVisits().subscribe(data => {
      this.visits = data.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      this.currentVisit = this.visits[0] ?? null;
    });

    this.visitService.getVisitCount().subscribe(count => {
      this.visitCount = count;
    });
  }

  deleteVisits(): void {
    if (confirm('Si prepričan, da želiš izbrisati vse obiske?')) {
      this.visitService.deleteAllVisits().subscribe(() => {
        this.loadVisits();
      });
    }
  }

}