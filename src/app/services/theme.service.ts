import { Injectable, Renderer2, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light-mode' | 'dark-mode';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _currentTheme: BehaviorSubject<Theme> = new BehaviorSubject<Theme>('light-mode');
  public currentTheme$: Observable<Theme> = this._currentTheme.asObservable();

  private renderer: Renderer2;
  private bodyElement: HTMLElement | null = null;
  private isBrowser: boolean;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document, 
    @Inject(PLATFORM_ID) platformId: Object  
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.bodyElement = this.document.body;
      this.updateBodyClass(this._currentTheme.value);
    }
  }

  public toggleTheme(): void {
    const newTheme: Theme = this._currentTheme.value === 'light-mode' ? 'dark-mode' : 'light-mode';
    this._currentTheme.next(newTheme);
    this.updateBodyClass(newTheme);
  }

  
  private updateBodyClass(theme: Theme): void {
    if (this.isBrowser && this.bodyElement) {
      const classToAdd = theme;
      const classToRemove = theme === 'light-mode' ? 'dark-mode' : 'light-mode';
      this.renderer.removeClass(this.bodyElement, classToRemove);
      this.renderer.addClass(this.bodyElement, classToAdd);
    }
  }
}