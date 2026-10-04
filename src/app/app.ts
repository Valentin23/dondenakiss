import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieBanner } from './consent/cookie-banner';
import { SiteFooter } from './layout/site-footer/site-footer';
import { SiteHeader } from './layout/site-header/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter, CookieBanner],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
