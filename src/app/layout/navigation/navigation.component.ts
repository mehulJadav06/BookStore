import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SharedServiceService } from 'src/app/sharedService/shared-service.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit ,OnDestroy{
  myControl = new FormControl('');
  options: string[] = ['Dogs', 'Cats', 'Computers'];
  filteredOptions: Observable<string[]> | undefined;
  message:string | undefined;
  subscription: Subscription = new Subscription;

  constructor(private data : SharedServiceService){}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  handleClear(){
    this.myControl.setValue('');
    this.data.changeMessage(this.myControl.value);
  }
  search(){
    this.data.changeMessage(this.myControl.value);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
