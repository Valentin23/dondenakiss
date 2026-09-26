import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { SITE } from '../../config/site';

// Si se añade el widget de DISH u otro servicio de terceros, hay que actualizar
// esta política (destinatarios, cookies) y SITE.legalUpdated.
@Component({
  selector: 'app-privacy',
  imports: [DatePipe],
  templateUrl: './privacy.html',
})
export class Privacy {
  protected readonly site = SITE;
}
