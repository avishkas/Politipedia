import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TrendingComponent } from './trending/trending.component';
import { AboutComponent } from './about/about.component';
import { TabsComponent } from './tabs/tabs.component';
import { CandidateComponent } from './candidate/candidate.component';
import { TopdonorsComponent } from './topdonors/topdonors.component';
import { SummaryComponent } from './summary/summary.component';
import { RouterModule, Routes} from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BioComponent } from './bio/bio.component';
import { DonorComponent } from './donor/donor.component';
import { ContributonsComponent } from './contributons/contributons.component';
import { ElectionsMainComponent } from './elections-main/elections-main.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BillComponent } from './bill/bill.component';
import { CandidateResultComponent } from './candidate-result/candidate-result.component';
import { ElectionResultComponentComponent } from './election-result-component/election-result-component.component';
import { DonorResultComponent } from './donor-result/donor-result.component';
import { BillResultComponent } from './bill-result/bill-result.component';

// Import ngx-twitter-timeline
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent},
  { path: 'bill', component: BillComponent},
  { path: 'donor', component: DonorComponent},
  { path: '', component: LandingPageComponent},
  { path: 'candidate',
    component: CandidateComponent,
    data: {name: 'Placeholder candidate data'}},
  { path: 'candidate-result', component: CandidateResultComponent},
  { path: 'election-result', component: ElectionResultComponentComponent},
  { path: 'donor-result', component: DonorResultComponent},
  { path: 'bill-result', component: BillResultComponent},
  { path: '**', component: LandingPageComponent} //'**' indicates default
];


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    TrendingComponent,
    AboutComponent,
    TabsComponent,
    CandidateComponent,
    TopdonorsComponent,
    SummaryComponent,
    LandingPageComponent,
    BioComponent,
    DonorComponent,
    ContributonsComponent,
    ElectionsMainComponent,
    BillComponent,
    CandidateResultComponent,
    ElectionResultComponentComponent,
    DonorResultComponent,
    BillResultComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false,
      }
    ),
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Specify library as an import
    NgxTwitterTimelineModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
