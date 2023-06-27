/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { MENU_ITEMS } from './pages/pages-menu';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: `
  
  <nb-layout windowMode>
      <nb-layout-header fixed *ngIf="sidanavToolbar">
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive *ngIf="sidanavToolbar">
        <nb-menu [items]="menu"></nb-menu>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <router-outlet></router-outlet>
      </nb-layout-column>

      <nb-layout-footer fixed *ngIf="sidanavToolbar">
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>


  `,
})

// <ngx-one-column-layout>
//     <nb-menu [items]="menu" *ngIf="sidanavToolbar"></nb-menu>
//       <router-outlet></router-outlet>
//   </ngx-one-column-layout>

export class AppComponent implements OnInit {

  menu = MENU_ITEMS;
  sidanavToolbar:boolean = false

  constructor(private analytics: AnalyticsService, private seoService: SeoService,private _router:Router) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();

    
    this._router.events.subscribe({
      next : (response) => 
      {
        if(response instanceof NavigationEnd)
        {
          if(response.urlAfterRedirects.includes('/authentication/login') || response.url.includes('login'))
          {
            this.sidanavToolbar = false;
          }
          else
          {
            this.sidanavToolbar = true;
          }
        }
      }
    })

  }
}
