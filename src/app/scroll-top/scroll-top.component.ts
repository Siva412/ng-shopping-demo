import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.css']
})
export class ScrollTopComponent implements OnInit {
  windowScrolled: boolean = false;
  constructor() { }
  //@HostListener('window:scroll', [])
  scrollEvent(event){
    const scrollTop = event.target.scrollTop;
    if(scrollTop > 100){
      this.windowScrolled = true
    }
    else{
      this.windowScrolled = false;
    }
  }
  ngOnInit(): void {
    document.querySelector('.mat-sidenav-content').addEventListener('scroll', this.scrollEvent.bind(this));
  }
  scrollTop(){
    (function smoothscroll() {
      const scrollEl = document.querySelector('.mat-sidenav-content');
      const currentScroll = scrollEl.scrollTop;       
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        scrollEl.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }
}
