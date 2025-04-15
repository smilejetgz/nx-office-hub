import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import {} from '@angular/cdk';

@Component({
  selector: 'app-welcome',
  imports: [NzCardModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.less',
})
export class WelcomeComponent {}
