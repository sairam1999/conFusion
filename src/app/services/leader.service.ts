import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of ,from} from 'rxjs';
import { delay } from 'rxjs/operators';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { baseURL} from '../shared/baseurl';
import { map ,catchError} from 'rxjs/operators';
import { ProcessHTTPMsgsService } from './process-httpmsgs.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgsService: ProcessHTTPMsgsService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.processHTTPMsgsService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
 return this.http.get<Leader>(baseURL + 'leadership/' + id)
    .pipe(catchError(this.processHTTPMsgsService.handleError));}

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]))
    .pipe(catchError(this.processHTTPMsgsService.handleError));
}

}
