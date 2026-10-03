import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { SITE } from '../../config/site';

// When adding the DISH widget or any other third-party service, update this
// policy (recipients, cookies) and SITE.legalUpdated.
@Component({
  selector: 'app-privacy',
  host: { class: 'page narrow' },
  imports: [DatePipe],
  templateUrl: './privacy.html',
})
export class Privacy {
  protected readonly site = SITE;
}
