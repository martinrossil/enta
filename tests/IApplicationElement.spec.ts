import { assert } from 'chai';
import { describe, it } from 'mocha';
import { ApplicationElement } from '../src';

const applicationElement: ApplicationElement = new ApplicationElement();

describe('IApplicationElement interface', () => {
    describe('default values', () => {
        it('name should be "ApplicationElement"', () => {
            assert.strictEqual(applicationElement.name, 'ApplicationElement');
        });
    });
});
