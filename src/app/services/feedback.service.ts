import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { baseURL} from '../shared/baseurl';
import { map ,catchError} from 'rxjs/operators';
import { ProcessHTTPMsgsService } from './process-httpmsgs.service';
import { Observable } from 'rxjs';
import { Feedback } from '../shared/feedback';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgsService: ProcessHTTPMsgsService) { }

    getFeedback(): Observable<Feedback[]> {
      return this.http.get<Feedback[]>(baseURL + 'feedback')
        .pipe(catchError(this.processHTTPMsgsService.handleError));
    }

  submitFeedback(feedback:Feedback): Observable<Feedback>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.http.post<Feedback>(baseURL + 'feedback/', feedback, httpOptions)
        .pipe(catchError(this.processHTTPMsgsService.handleError));
  }
}
