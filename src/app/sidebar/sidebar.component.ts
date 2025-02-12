import { Component,inject,Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../service/AuthService';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule ],
  templateUrl: './sidebar.component.html',
  standalone: true
})
export class SidebarComponent {
  @Input() drawerToggleFunction: Function = () => {};

  authService = inject(AuthService);

  handleLogout(){
    this.authService.logout();
    this.drawerToggleFunction();
  }

}
