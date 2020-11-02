import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {House} from '../../../models/House';

@Component({
  selector: 'app-nav-side',
  templateUrl: './house-nav-side.component.html',
  styleUrls: ['./house-nav-side.component.scss']
})
export class NavSideComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu = false;
  isShowing = false;
  showSubSubMenu = false;

  selected = 'overview';

  @Input()
  house: House;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
