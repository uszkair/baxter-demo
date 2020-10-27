import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {House} from "../../../models/House";

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
