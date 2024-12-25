
import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivityService } from './services/activity.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true, // Marking this component as standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    FormsModule
  ],
  providers: [HttpClient] // Providing HttpClient here
})
export class AppComponent implements OnInit {
  activities: any[] = [];
  newActivity = { activity: '', duration: 0 };

  // Manually injecting HttpClient and ActivityService
  private activityService = inject(ActivityService);

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.activityService.getActivities().subscribe((data) => {
      this.activities = data;
    });
  }

  addActivity(): void {
    const activityToAdd = { ...this.newActivity, date: new Date() };

    this.activityService.addActivity(activityToAdd).subscribe(() => {
      this.newActivity = { activity: '', duration: 0 };
      this.loadActivities();
    });
  }

  deleteActivity(id: string): void {
    this.activityService.deleteActivity(id).subscribe(() => {
      this.loadActivities();
    });
  }
}
