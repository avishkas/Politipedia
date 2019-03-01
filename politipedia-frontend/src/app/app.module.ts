import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TrendingComponent } from './trending/trending.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AboutComponent } from './about/about.component';
import { TabsComponent } from './tabs/tabs.component';
import { SearchResultsTableComponent } from './search-results-table/search-results-table.component';
import { CandidateComponent } from './candidate/candidate.component';
import { TopdonorsComponent } from './topdonors/topdonors.component';
import { SummaryComponent } from './summary/summary.component';
import { PositionsComponent } from './positions/positions.component';
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

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent},
  { path: 'bill', component: BillComponent},
  { path: 'donor', component: DonorComponent},
  { path: '', component: LandingPageComponent},
  { path: 'candidate',
    component: CandidateComponent,
    data: {name: 'Placeholder candidate data'}},
  { path: '**', component: LandingPageComponent}
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    TrendingComponent,
    SearchResultsComponent,
    AboutComponent,
    TabsComponent,
    SearchResultsTableComponent,
    CandidateComponent,
    TopdonorsComponent,
    SummaryComponent,
    PositionsComponent,
    LandingPageComponent,
    BioComponent,
    DonorComponent,
    ContributonsComponent,
    ElectionsMainComponent,
    BillComponent
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
    HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
