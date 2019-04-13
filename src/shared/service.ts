import { DatabaseService } from '@db/database.service';
import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase';

@Injectable()
export abstract class AbstractService {
    protected db: DatabaseService;
    protected awaitCollection: Promise<firestore.QuerySnapshot>;
    protected collection: firestore.CollectionReference;
    protected document: firestore.DocumentReference;
    protected data;
    protected includeCreatedUpdatedDate = true;

    constructor(db: DatabaseService, collection: string) {
        this.db = db;
        this.awaitCollection = this.db.getCollection(collection);
        this.collection = this.db.firestore.collection(collection);
    }

    async getAll<T>(): Promise<T[]> {
        const collection = await this.collection.get();
        const result = collection.docs.map(doc => {
            return { ...doc.data(), id: doc.id } as any;
        });

        return result;
    }

    create(data) {
        this.data = data;
        if (this.includeCreatedUpdatedDate) {
            this.data.createdAt = new Date();
            this.data.updatedAt = new Date();
        }
    }

    async getData() {
        const data = await this.document.get();
        return data.data();
    }

    async getOne(id) {
        this.document = await this.collection.doc(id);
        return this.document;
    }

    async update<T>(id, data: Partial<T>) {
        const document = await this.getOne(id);
        const awaitDocument = await document.get();
        let obj: any = data;
        if (awaitDocument.exists) {
            if (this.includeCreatedUpdatedDate)
                await document.update({ ...data, updatedAt: new Date() });
            else await document.update(data);
            const getUpdatedDoc = await document.get();
            return getUpdatedDoc.data();
        }
        return {
            success: false,
            message: "Unable to perform your request. Document doesn't exist.",
        }; // Document doesn't exist
    }

    async delete(id) {
        const document = await this.getOne(id);
        const awaitDocument = await document.get();
        if (awaitDocument.exists) {
            await document.delete();
            return { success: true };
        }
        return {
            success: false,
            message: "Unable to perform your request. Document doesn't exist.",
        }; // Document doesn't exist
    }

    async save() {
        return await this.collection.add(this.data);
    }
}
