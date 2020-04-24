import { Component, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment} from '../shared/comment';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import {MatSliderModule} from '@angular/material/slider';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
    
    dish : Dish;
    dishIds: string[];
  prev: string;
  next: string;
  reviewsarray: any=[];

  @ViewChild('cform')
    commentFormDirective;
    
    commentForm: FormGroup;
    com: Comment;


  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private cmt: FormBuilder,) {
      this.createComment();
     }

  ngOnInit(){

    
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  commentErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 100 characters long.'
    },
  };

  createComment(): void {
    this.commentForm = this.cmt.group({
      rating: '',
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)] ],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
       date: ''
   
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
}

onSubmit() {
  
  this.com = this.commentForm.value;
  this.dish.comments.push(this.com);
  this.commentForm.reset({
    rating:'',
    comment:'',    
    author: '',
    
    
   });
   this.commentFormDirective.resetForm();
}

onValueChanged(data?: any) {
  if (!this.commentForm) { return; }
  const form = this.commentForm;
  for (const field in this.commentErrors) {
    if (this.commentErrors.hasOwnProperty(field)) {
      // clear previous error message (if any)
      this.commentErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const c = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.commentErrors[field] += c[key] + ' ';
          }
        }
      }
    }
  }
}

}
