import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private isSmallScreenSubject = new BehaviorSubject<boolean>(false);
  isSmallScreen$ = this.isSmallScreenSubject.asObservable();

  private isCollapsedSubject = new BehaviorSubject<boolean>(true);
  isCollapsed$ = this.isCollapsedSubject.asObservable();

  setSmallScreen(isSmall: boolean): void {
    this.isSmallScreenSubject.next(isSmall);
  }

  setCollapsed(isCollapsed: boolean): void {
    localStorage.setItem('isCollapsed', JSON.stringify(isCollapsed));
    this.isCollapsedSubject.next(isCollapsed);
  }

  public loadCollapsedFromLocalStorage(): void {
    const storedValue = localStorage.getItem('isCollapsed');
    const currentState = storedValue ? JSON.parse(storedValue) : false;
    this.setCollapsed(currentState);
  }

  toggleCollapsed(): void {
    const currentState = this.isCollapsedSubject.getValue();
    this.setCollapsed(!currentState);
  }
}
