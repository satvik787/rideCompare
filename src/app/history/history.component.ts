import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { HistoryCardComponent } from '../history-card/history-card.component';
import { FareDetails } from '../models/FareDetails';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  imports: [CommonModule, HistoryCardComponent],
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {
  histories: FareDetails[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.histories = this.route.snapshot.data['histories']?.data || [];
  }
}
