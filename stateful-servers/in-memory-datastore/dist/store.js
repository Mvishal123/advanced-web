"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStore = void 0;
// Singleton pattern
class DataStore {
    // Ensures constructor cannot be called outside the class
    constructor() {
        this.store = [];
        this.count = 0;
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DataStore();
        }
        return this.instance;
    }
    getStoreData() {
        return this.store;
    }
    deleteStoreData(id) {
        this.store = this.store.filter((store) => store.id !== id);
    }
    addStoreData(data) {
        this.store.push(Object.assign(Object.assign({}, data), { id: this.count.toString() }));
        this.count++;
    }
}
exports.DataStore = DataStore;
