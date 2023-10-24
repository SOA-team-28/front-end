import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../blog/blog.service';
import { ApplicationGrade } from '../model/applicationGrade.model';
import { AdministrationService } from '../administration.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-application-grade',
  templateUrl: './application-grade.component.html',
  styleUrls: ['./application-grade.component.css']
})
export class ApplicationGradeComponent implements OnInit {

  constructor(private service: AdministrationService, 
              private authService: AuthService) { }
  
  ngOnInit(): void {
    this.service.getAllGrades().subscribe({
    
      error: (err:any) => {
        console.log(err);
      }
    })
  }
  
  applicationGradeForm = new FormGroup({
    Rating: new FormControl(1, [Validators.required]),
    Comment: new FormControl(''),
    Created: new FormControl(),
    UserId: new FormControl(-1)
  })

  noteTheRate(): void {
    const formData = this.applicationGradeForm.value;
  
    this.service.noteTheRate({
      rating: formData.Rating || 1,
      comment: formData.Comment || "",
      //created: formData.Created,
      userId: this.authService.getPersonIdFromToken()
    }).subscribe({
      next: (_) => {
        console.log("Uspješan zahtjev!");
      }
    });
  }
  
}
