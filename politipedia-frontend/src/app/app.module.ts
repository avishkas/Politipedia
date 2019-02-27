import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TrendingComponent } from './trending/trending.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AboutComponent } from './about/about.component';
import { TabsComponent } from './tabs/tabs.component';
import { CandidateComponent } from './candidate/candidate.component';
import { TopdonorsComponent } from './topdonors/topdonors.component';
import { SummaryComponent } from './summary/summary.component';
import { PositionsComponent } from './positions/positions.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    TrendingComponent,
    SearchResultsComponent,
    AboutComponent,
    TabsComponent,
    CandidateComponent,
    TopdonorsComponent,
    SummaryComponent,
    PositionsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
