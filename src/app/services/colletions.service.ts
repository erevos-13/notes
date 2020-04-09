import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {throwError} from 'rxjs';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ColletionsService {
  private itemsCollection: AngularFirestoreCollection<any>;
  constructor(
    private afs: AngularFirestore,
    private db: AngularFireDatabase
  ) { }

  async addNotes(note_: string) {
    return new Promise(async (resolve, reject) => {
      const userIdFirebase = auth().currentUser;
      const uuid = this.afs.createId();
      try {
        const addNotes = await this.db.list(`notes/${userIdFirebase.uid}`).push({id: uuid, note: note_, userId: userIdFirebase.uid});
        resolve(addNotes);
      }catch (e) {
        reject(e);
      }
    });
  }
}
