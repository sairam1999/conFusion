import { Component, OnInit,Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {
leaders: Leader[]

  constructor(private leaderService: LeaderService,
    @Inject('baseUrl') private baseUrl) { }

  ngOnInit(): void {
    this.leaderService.getLeaders().subscribe(leaders => this.leaders =leaders);

  }

}
