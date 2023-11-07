import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {userModel} from "../../models/customer.model";


@Injectable({
  providedIn: 'root',
})

export class IdService {
  id: BehaviorSubject<userModel> = new BehaviorSubject(undefined);
  constructor() {}
}
