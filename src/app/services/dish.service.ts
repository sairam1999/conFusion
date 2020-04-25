import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { of, from } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { baseURL} from '../shared/baseurl';
import { map ,catchError} from 'rxjs/operators';
import { ProcessHTTPMsgsService } from './process-httpmsgs.service';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  
  constructor(private http: HttpClient,
    private processHTTPMsgsService: ProcessHTTPMsgsService) { }
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.processHTTPMsgsService.handleError));
    
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgsService.handleError));

  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgsService.handleError));
      
  }
  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error));
 
   }

   putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgsService.handleError));

  }

}
