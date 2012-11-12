describe('.parallel()', function () {
  describe('with array', function () {
    it('should run tasks', function (done) {
      var spy1 = chai.spy(function one (cb) {
            setTimeout(function () {
              cb(null, 'one');
            }, 20);
          })
        , spy2 = chai.spy(function two (cb) {
            setTimeout(function () {
              cb(null, 'two');
            }, 10);
          })
        , arr = [ spy1, spy2 ];

      var cb = chai.spy(function (err, res) {
        should.not.exist(err);
        spy1.should.have.been.called.once;
        spy2.should.have.been.called.once;
        res.should.deep.equal([ 'one', 'two' ]);
      });

      async.parallel(arr, cb);

      setTimeout(function () {
        cb.should.have.been.called.once;
        done();
      }, 50);
    });

    it('should invoke callback if there is an error', function (done) {
      var spy1 = chai.spy(function one (cb) {
            setTimeout(function () {
              cb(null, 'one');
            }, 20);
          })
        , spy2 = chai.spy(function two (cb) {
            setTimeout(function () {
              cb('err');
            }, 10);
          })
        , arr = [ spy1, spy2 ];

      var cb = chai.spy(function (err, res) {
        should.exist(err);
        err.should.equal('err');
        spy1.should.have.been.called.once;
        spy2.should.have.been.called.once;
        should.not.exist(res);
      });

      async.parallel(arr, cb);

      setTimeout(function () {
        cb.should.have.been.called.once;
        done();
      }, 50);
    });
  });

  describe('with object', function () {
    it('should run tasks', function (done) {
      var spy1 = chai.spy(function one (cb) {
            setTimeout(function () {
              cb(null, 'one');
            }, 20);
          })
        , spy2 = chai.spy(function two (cb) {
            setTimeout(function () {
              cb(null, 'two');
            }, 10);
          })
        , obj = { one: spy1, two: spy2 };

      var cb = chai.spy(function (err, res) {
        should.not.exist(err);
        spy1.should.have.been.called.once;
        spy2.should.have.been.called.once;
        res.should.deep.equal({ one: 'one', two: 'two' });
      });

      async.parallel(obj, cb);

      setTimeout(function () {
        cb.should.have.been.called.once;
        done();
      }, 50);
    });

    it('should invoke callback if there is an error', function (done) {
      var spy1 = chai.spy(function one (cb) {
            setTimeout(function () {
              cb(null, 'one');
            }, 20);
          })
        , spy2 = chai.spy(function two (cb) {
            setTimeout(function () {
              cb('err');
            }, 10);
          })
        , obj = { one: spy1, two: spy2 };

      var cb = chai.spy(function (err, res) {
        should.exist(err);
        err.should.equal('err');
        spy1.should.have.been.called.once;
        spy2.should.have.been.called.once;
        should.not.exist(res);
      });

      async.parallel(obj, cb);

      setTimeout(function () {
        cb.should.have.been.called.once;
        done();
      }, 50);
    });
  });
});
