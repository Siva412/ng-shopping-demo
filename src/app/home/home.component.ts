import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit(): void {
  }
  searchItem(value) {
    if (value) {
      this.commonService.getSearchSubject().next({propagate: true, value});
      this.router.navigate(['home']);
    }
  }
  searchKeypress(event){
    if(event.keyCode === 13){
      this.searchItem(event.currentTarget.value);
    }
  }
}
