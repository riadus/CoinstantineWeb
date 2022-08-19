import { Component, AfterViewInit } from '@angular/core';
import { Helpers } from '../helpers/helpers';
import { Subscription } from 'rxjs';
import { Router, NavigationStart, ActivatedRoute, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {
  
  subscription: Subscription;
  showMenu: boolean;
  withoutMenu: Array<string> = [ '/account' ];
  lastChecked: string;

  constructor(public router:Router) {
    router.events.subscribe(v => this.handleEventChanges(v));
  }

  handleEventChanges(v: import("@angular/router").Event): void {
    if(v instanceof NavigationStart)
    {
        var navigationStart = v as NavigationStart;
        this.showMenu = navigationStart.url.indexOf(this.withoutMenu[0]) === -1;
    }
  }

  ngAfterViewInit() {
   
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
