import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { StorePage } from '../store/store';
import { HomePage } from '../home/home';
import {AddDealPage} from '../add-deal/add-deal'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AddDealPage;
  tab3Root = StorePage;

  constructor() {

  }
}
