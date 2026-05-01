import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Global {
  public appName = 'EduMind';
  public currentUserName = '';
}
