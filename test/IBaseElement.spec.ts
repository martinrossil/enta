import { assert } from 'chai';
import { describe, it } from 'mocha';
import IBaseElement from '../src/interfaces/core/IBaseElement';
import BaseElement from '../src/core/BaseElement';

describe('IBaseElement interface', () => {
    describe('default values', () => {
        const baseElement: IBaseElement = new BaseElement();
        it('default connected should be false', () => {
            assert.isFalse(baseElement.connected);
        });
    });
    describe('given IBaseElement has been added to DOM', () => {
        const baseElement: IBaseElement = new BaseElement();
        document.body.appendChild(baseElement as unknown as Node);
        it('connected should be true', () => {
            assert.isTrue(baseElement.connected);
        });
    });
});
