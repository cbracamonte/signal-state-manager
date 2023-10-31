
import { WritableSignal, signal } from "@angular/core";

export class SignalStateManager<T> {
    private signalCollection = new Map<string, WritableSignal<T>>();

    constructor(
        defaultState: { [key: string]: T },
    ) {
        for (const key in defaultState) {
            if (Object.prototype.hasOwnProperty.call(defaultState, key)) {
                this.addState(key, defaultState[key]);
            }
        }
    }

    getState(key: string): WritableSignal<T> {
        const foundState = this.signalCollection.get(key);
        if (!foundState) {
            throw new Error('State with key does not exist');
        }
        return foundState;
    }

    addState(key: string, payload: T): void {
        if (this.signalCollection.has(key)) {
            throw new Error('State with key already exists');
        }
        const newState = signal<T>(payload);
        this.signalCollection.set(key, newState);
    }

    removeState(key: string) {
        if (!this.signalCollection.has(key)) {
            throw new Error('State with key does not exist');
        }
        this.signalCollection.delete(key);
    }

    updateState(key: string, payload: T) {
        const foundState = this.signalCollection.get(key);
        if (!foundState) {
            throw new Error('State with key does not exist');
        }
        foundState.set(payload);
    }

}