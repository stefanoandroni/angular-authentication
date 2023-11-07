import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Directive({
  selector: '[appIsAuthenticated]',
})
export class IsAuthenticatedDirective implements OnInit, OnDestroy {
  @Input('appIsAuthenticated') condition!: boolean;

  private destroy$ = new Subject();

  constructor(
    private template: TemplateRef<any>,
    private view: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$
      .pipe(
        distinctUntilChanged(), 
        takeUntil(this.destroy$))
      .subscribe((isAuthenticated) => {
        // N: isAuthenticated XOR condition
        if (isAuthenticated) {
          if (this.condition) {
            this.view.createEmbeddedView(this.template); //  T F
          } else {
            this.view.clear(); // T F
          }
        } else {
          if (this.condition) { 
            this.view.clear(); // F T
          } else {
            this.view.createEmbeddedView(this.template); // F F
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
