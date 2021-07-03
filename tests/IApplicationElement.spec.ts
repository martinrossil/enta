import { assert } from 'chai';
import { describe, it } from 'mocha';
import { ApplicationElement } from '../src';
customElements.define('a-e', ApplicationElement);
const applicationElement: ApplicationElement = new ApplicationElement();

describe('IApplicationElement interface', () => {
    describe('default values', () => {
        it('name should be "ApplicationElement"', () => {
            assert.strictEqual(applicationElement.name, 'ApplicationElement');
        });
    });
});
