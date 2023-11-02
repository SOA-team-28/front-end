import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingIssueComponent } from './reporting-issue/reporting-issue.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreferenceComponent } from './preference/preference/preference.component';
import { PreferenceFormComponent } from './preference-form/preference-form/preference-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { TourRatingComponent } from './tour-rating/tour-rating.component';
import { TourRatingFormComponent } from './tour-rating-form/tour-rating-form.component';
import { TourOverviewComponent } from './tour-overview/tour-overview.component';
import { TourOverviewDetailsComponent } from './tour-overview-details/tour-overview-details.component';
import { TourAuthoringModule } from '../tour-authoring/tour-authoring.module';


@NgModule({
  declarations: [
    ReportingIssueComponent,
    PreferenceComponent,
    PreferenceFormComponent,
    TourRatingComponent,
    TourRatingFormComponent,
    TourOverviewComponent,
    TourOverviewDetailsComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TourAuthoringModule
  ],
  exports:[
    PreferenceFormComponent, 
    TourRatingFormComponent  ]

})
export class MarketplaceModule { }
