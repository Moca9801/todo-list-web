import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnDestroy, inject, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Theme, ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';

export interface Section {
  name: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-default',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent implements OnDestroy {
  protected readonly isMobile = signal(true);
  protected shouldRun: boolean = false;
  readonly bestBoys: string[] = ['Personal', 'Work', 'University', 'Others'];
  private _mobileQuery!: MediaQueryList; 
  private _mobileQueryListener!: () => void;

  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  currentTheme$: Observable<Theme>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private router: Router,
    public themeService: ThemeService
  ) {
    const media = inject(MediaMatcher);
    this.currentTheme$ = this.themeService.currentTheme$;

    if (isPlatformBrowser(this.platformId)) {
      this._mobileQuery = media.matchMedia('(max-width: 600px)');
      this.isMobile.set(this._mobileQuery.matches);
      this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
      this._mobileQuery.addEventListener('change', this._mobileQueryListener);
      this.shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(
        window.location.host,
      );
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this._mobileQuery) {
      this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
    }
  }

  notes: Section[] = [
    {
      name: 'All Tasks',
      icon: 'star',
      route: '/'
    },
    {
      name: 'High Priority',
      icon: 'priority_high',
      route: '/high-priority'
    },
     {
      name: 'Pending Activities',
      icon: 'schedule',
      route: '/pending-activities'
    },
     {
      name: 'This Week',
      icon: 'date_range',
      route: '/this-week'
    },
     {
      name: 'Check List',
      icon: 'checklist',
      route: '/check-list'
    },
  ];

  go(route : string): void {
    this.router.navigate([route]);
  }
}