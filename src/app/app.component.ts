import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  dataForm: FormGroup;

  private firebaseUrl = 'https://console.firebase.google.com/project/mubira-879d0/database/mubira-879d0-default-rtdb/data/~2F/data.json';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.dataForm = this.fb.group({
      fullname: ['', Validators.required],
      fathersname: ['', Validators.required],
      mothersname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  onSubmit(): void {
    if (this.dataForm.valid) {
      const formData = this.dataForm.value;
      this.http.post('https://mubira-879d0-default-rtdb.europe-west1.firebasedatabase.app//form-data.json', formData)
      .subscribe(
        (response) => {
          console.log('Form Data submitted successfully:', response);
          this.dataForm.reset();
        },
        (error) => {
          console.error('Error submitting form data:', error);
        }
      );    
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
