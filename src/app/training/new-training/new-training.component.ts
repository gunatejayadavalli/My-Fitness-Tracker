import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises : Exercise[];
  private exerciseSubscription : Subscription;
  isLoading = true;
  private loadingSubscription : Subscription;

  constructor(private trainingService : TrainingService, private uiService : UIService) { }

  ngOnDestroy(): void {
    if(this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe();
    }
    if(this.loadingSubscription){
      this.loadingSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(loadingState => {
      this.isLoading = loadingState;
    });
    this.fetchExercises();
  }

  OnStartTraining(form : NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercises(){
    this.trainingService.fetchAvailableExercises();
  }

}
