import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reservation } from '../shared/reservation.model';
import {ReservationService} from '../shared/reservation.service';

declare var M: any;

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [ReservationService]
})
export class ReservationComponent implements OnInit {

  constructor(public reservationService: ReservationService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshReservationList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.reservationService.selectedReservation = {
      _id: "",
      name: "",
      sport: "",
      day: "",
      time: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.reservationService.postReservation(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshReservationList();
        M.toast({ html: 'Saved successfully'});
      });
    }
    else {
      this.reservationService.putReservation(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshReservationList();
        M.toast({ html: 'Updated successfully'});
      });
    }
  }

  refreshReservationList() {
    this.reservationService.getReservationList().subscribe((res) => {
      this.reservationService.reservations = res as Reservation[];
    });
  }

  onEdit(reserv: Reservation) {
    this.reservationService.selectedReservation = reserv;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure you want to delete this reservation?') == true) {
      this.reservationService.deleteReservation(_id).subscribe((res) => {
        this.refreshReservationList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully'});
      });
    }
  }

}
