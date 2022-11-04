import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnChanges {

  usernameForm!: FormGroup;
  emailForm!: FormGroup;

  @Input() currentUser!: User;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['currentUser'].currentValue);
  }

  ngOnInit(): void {
    this.initUserNameForm();
    this.initEmaileForm();
  }

  initUserNameForm(): void {
    this.usernameForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });
  }
  initEmaileForm(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onEditUserName(modal: any): void {
    this.usernameForm.get('username')?.setValue(this.currentUser.displayName);
    this.modalService.open(modal, { centered: true })
  }

  onEditEmail(modal: any): void {
    this.emailForm.get('email')?.setValue(this.currentUser.email);
    this.modalService.open(modal, { centered: true })
  }

  onSubmitUserNameForm(): void {
    this.currentUser.updateProfile({ displayName: this.usernameForm.value.username })
      .then(() => {
        this.modalService.dismissAll();
      }).catch(console.error);
  }

  onSubmitEmailForm(): void {
    this.authService.signinUser(<string>this.currentUser.email, this.emailForm.value.password)
      .then(() => {
        this.currentUser.updateEmail(this.emailForm.value.email)
          .then(() => {
            this.modalService.dismissAll();
            this.emailForm.reset();
          }).catch(console.error);
      }).catch(console.error);
  }
}
