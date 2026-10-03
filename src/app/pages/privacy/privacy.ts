import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { SITE } from '../../config/site';

// When adding the DISH widget or any other third-party service, update this
// policy (recipients, cookies) and SITE.legalUpdated. DISH Digital Solutions
// GmbH is the controller of its booking platform; the restaurant is controller
// of the booking data it receives (DISH privacy policy, 1.1 and 4.1). Its
// iframe must not load before consent if it sets non-essential cookies.
// Cloudflare Web Analytics (a JS beacon) would need consent too: the policy
// only covers Cloudflare's server-side traffic statistics.
@Component({
  selector: 'app-privacy',
  host: { class: 'page narrow' },
  imports: [DatePipe],
  templateUrl: './privacy.html',
})
export class Privacy {
  protected readonly site = SITE;
}
