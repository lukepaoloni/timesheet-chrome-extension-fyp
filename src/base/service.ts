import { DatabaseService } from '@db/database.service';
import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase';
import { extract } from '@lib/extract';
import { UserRO } from '@user/response/user.response';
import { User } from '../user/user.entity';

@Injectable()
export abstract class AbstractService {
    protected db: DatabaseService;
    protected awaitCollection: Promise<firestore.QuerySnapshot>;
    protected collection: firestore.CollectionReference;
    protected document: firestore.DocumentReference;
    protected data;

    constructor(db: DatabaseService, collection: string) {
        this.db = db;
        this.awaitCollection = this.db.getCollection(collection);
        this.collection = this.db.firestore.collection(collection);
    }

    async getAll() {
        const collection = await this.awaitCollection;
        const documents = collection.docs;
        let data = [];
        documents.forEach((document) => {
            data.push(document.data());
        });
        return data;
    }

    create(data) {
        this.data = data;
    }

    async getData() {
        const data = await this.document.get();
        return data.data();
    }

    async getOne(id) {
        this.document = await this.collection.doc(id);
        return this.document;
    }

    async update(id, data: Partial<any>) {
        const document = await this.getOne(id);
        const awaitDocument = await document.get();
        if (awaitDocument.exists) {
            await document.update(data);
            return console.log(awaitDocument.data(), 'Successfully updated the document.');
        }
        return console.log(id, 'Document does not exist with that ID.');
    }

    async delete(id) {
        const document = await this.getOne(id);
        const awaitDocument = await document.get();
        if (awaitDocument.exists) {
            await document.delete();
            return console.log(id, 'Successfully deleted the document.');
        }
        return console.log(id, 'Document does not exist with that ID.');
    }

    async save() {
        return await this.collection.add(this.data);
    }
}
