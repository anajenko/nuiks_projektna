import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Visit {
  ip: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  logVisit(): Observable<any> {
    return this.http.post(`${this.apiUrl}/visit`, {});
  }

  getVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${this.apiUrl}/visits`);
  }

  deleteAllVisits(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/visits`);
  }

  getVisitCount(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/visits/count`).pipe(
      map(response => response.count)
    );
  }
}
