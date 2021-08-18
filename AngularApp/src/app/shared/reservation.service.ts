import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/toPromise';

import { Reservation } from './reservation.model'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  selectedReservation!: Reservation;
  reservations!: Reservation[];

  readonly baseURL = 'http://localhost:3000/reservations';

  constructor(private http: HttpClient) { }

  postReservation(reserv: Reservation) {
    return this.http.post(this.baseURL, reserv);
  }

  getReservationList() {
    return this.http.get(this.baseURL);
  }

  putReservation(reserv: Reservation) {
    return this.http.put(this.baseURL + `/${reserv._id}`, reserv);
  }

  deleteReservation(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
