import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>('assets/data/people.json');
  }

  search(query: string): Observable<Person[]> {
    if (!query || query === '*') {
      query = '';
    } else {
      query = query.toLowerCase().trim();
    }
    return this.getAll().pipe(
      map((data: Person[]) =>
        data
          .map((item: Person) => !!localStorage['person' + item.id] ? JSON.parse(localStorage['person' + item.id]) : item)
          .filter((item) => JSON.stringify(item).toLowerCase().includes(query))
      )
    );
  }

  get(id: number): Observable<Person> {
    return this.getAll().pipe(
      map((data: Person[]) => {
        if (localStorage['person' + id]) {
          return JSON.parse(localStorage['person' + id]);
        }
        return data.find((item:Person) => item.id === id);
      })
    );
  }

  save(person: Person) {
    localStorage['person' + person.id] = JSON.stringify(person);
  }
}


export class Address {
  street: string;
  city: string;
  state: string;
  zip: string;

  constructor(address?: Partial<Address>) {
    this.street = address?.street || '';
    this.city = address?.city || '';
    this.state = address?.state || '';
    this.zip = address?.zip || '';
  }
}

export class Person {
  id: number;
  name: string;
  phone: string;
  address: Address;

  constructor(person?: Partial<Person>) {
    this.id = person?.id || 0;
    this.name = person?.name || '';
    this.phone = person?.phone || '';
    this.address = new Address(person?.address);
  }

}
