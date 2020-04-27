import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animations';
import { FeedbackService} from '../services/feedback.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class ContactComponent implements OnInit {
  @ViewChild('fform') 
  feedbackFormDirective;
 feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  errMess:string;
  feedbackSubmit = false;
  confirmFeedback: Feedback;
  confirmFeedbackDone = false;
  
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private feedbackService: FeedbackService,
    @Inject('BaseURL') public BaseURL) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };


  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    this.feedbackSubmit = true;
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    // submit data
    this.feedbackService.submitFeedback(this.feedback)
      .subscribe(
        data => {
          this.feedbackSubmit = false;
          this.confirmFeedbackDone = true;
        
          this.confirmFeedback = data;
          setTimeout(() => {
            this.confirmFeedbackDone = false;
          }, 2000);

          console.log(data);
        },
        errmess => {
          console.log(errmess.error);
        }
      );


    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: ['', Validators.required],
      contacttype: ['None', Validators.required],
      message: ['', Validators.required]

    });
    this.feedbackFormDirective.resetForm();
  }


   
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }



}
