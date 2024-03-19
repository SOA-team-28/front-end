import { Component, OnInit } from '@angular/core';
import { EncounterService } from '../../encounters/encounter.service';
import { TourExecutionService } from '../tour-execution.service';
import { EncounterExecution2 } from '../../encounters/model/encounterExecution2.model';

@Component({
  selector: 'xp-all-completed-encounter-executions',
  templateUrl: './all-completed-encounter-executions.component.html',
  styleUrls: ['./all-completed-encounter-executions.component.css']
})
export class AllCompletedEncounterExecutionsComponent implements OnInit {

  encounterExecutions: EncounterExecution2[]

  constructor(private service:TourExecutionService){}

  ngOnInit(): void {
    this.service.getCompleted().subscribe( result => {
      console.log('rez',result)
      this.encounterExecutions = result;
      this.encounterExecutions.forEach(e =>{
        console.log("DTO: "+ e.encounter)
      })
    
    });
  }

  
}
