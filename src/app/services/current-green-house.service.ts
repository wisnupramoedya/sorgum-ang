import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentGreenHouseService {
  key = 'ghc_gh_id';

  chosedGreenHouse!:   BehaviorSubject<number>;
  constructor() {
    this.chosedGreenHouse= new BehaviorSubject<number>(this.getId())
    this.chosedGreenHouse.subscribe(x=>this.setId(x));
  }
  setId(id: number): void{
    window.localStorage.setItem(this.key, id.toString());
  }
  getId(): number{
    return window.localStorage.getItem(this.key) === null ? 0 : parseInt(window.localStorage.getItem(this.key)!!);
  }
}
