import {Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Directive({
  selector: '[appUserDirective]'
})
export class UserDirectiveDirective implements OnInit{
  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    const hasAccess = this.authService.isAuthorized();

    if (hasAccess) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
