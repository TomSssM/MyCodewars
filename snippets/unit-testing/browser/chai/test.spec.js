describe('pow function', function() {
  describe('raises 3 to nth power', function() {
    for(let i = 0; i <= 10; i++) {
      it(`raises 3 to the power of ${i}`, function() {
        // if both arguments aren't equal throws an error:
        assert.equal(pow(3,i),3**i);
      })
    }
  });
  describe('edge case prepared', function() {
    // usual equality
    it('usual equality', function() {
      assert.equal('0', 0);
    });

    // custom error message
    it('custom error message', function() {
      assert.equal('0', 'error', 'my message!');
    });

    // usual assert
    it('usual assert', function() {
      assert('', 'my custom message');
    })

    // strict equality
    it('strict equal', function() {
      assert.strictEqual('0', 0);
    });

    it('not equal ( not strict )', function() {
      assert.notEqual('0', 0);
    });

    it('not equal ( strict )', function() {
      assert.notStrictEqual('0', 0);
    });

    it('is true', function() {
      assert.isTrue('stringo');
    });

    it('returns null if the argument isn\'t a number', function() {
      assert.equal(pow('aaa'), null);
    });
  });
});