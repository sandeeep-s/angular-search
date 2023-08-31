import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Address, Person, SearchService} from "../shared";
import {of} from "rxjs";

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let mockSearchService: SearchService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            params: {id: 1}
          }
        }
      }],
      imports: [FormsModule, HttpClientTestingModule]
    }).compileComponents();

    mockSearchService = TestBed.inject(SearchService);
  });

  it('should fetch a single record', () => {
    const fixture = TestBed.createComponent(EditComponent);

    const person = new Person({id: 1, name: 'Sandeep Shinde'});
    person.address = new Address({city: 'Bangalore'});

    spyOn(mockSearchService, 'get').and.returnValue(of(person));

    fixture.detectChanges();

    expect(mockSearchService.get).toHaveBeenCalledWith(1);

    const editComponent = fixture.componentInstance;
    expect(editComponent.person.address.city).toBe('Bangalore');

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').innerHTML).toBe('Sandeep Shinde');
  });
});
