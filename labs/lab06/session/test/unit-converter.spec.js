import { UnitConverter } from "../unit-converter.js";

let uc = new UnitConverter();

// import { strict as assert } from 'assert';
import { expect } from 'chai';

describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', () => {
            // assert.equal([1, 2, 3].indexOf(4), -1);
            expect([1, 2, 3].indexOf(4)).to.equal(-1);
        });
    });
});

describe('UnitConverter', () => {
    describe('#kilogramToOunce()', () => {
        it('1 kg should be converted to 35.274 oz', () => {
            expect(uc.kilogramToOunce(1)).to.equal(35.274);
        });
    });
});

describe('UnitConverter', () => {
    describe('#kilogramToPound()', () => {
        it('1 kg should be converted to 2.2046 lb', () => {
            expect(uc.kilogramToPound(1)).to.equal(2.2046);
        });
    });
});

