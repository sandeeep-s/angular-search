import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Person, SearchService} from "../shared";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  person!: Person;
  sub!: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private searchService: SearchService) {
  }

  async ngOnInit(): Promise<void> {
    const params = this.route.snapshot.params;
    const id = +params['id'];   // + converts string to number
    this.sub = this.searchService.get(id).subscribe(person => {
      if (person) {
        this.person = person;
      } else {
        this.goToList();
      }
    });
  }

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

  async cancel(){
    await this.router.navigate(['/search']);
  }

  async save(){
    await this.searchService.save(this.person);
    await this.goToList();
  }

  async goToList(){
    if (this.person){
      await this.router.navigate(['/search', {term: this.person.name}]);
    }else{
      await this.router.navigate(['/search']);
    }
  }
}
