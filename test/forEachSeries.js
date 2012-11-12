describe('.forEachSeries()', function () {
  var arr = [ 4, 3, 2, 1];

  it('should run a for each serially', function (done) {
    var count = 4
      , spy = chai.spy(function (i, next) {
          arr.should.include(i);
          count.should.equal(i);
          count--;
          next.should.be.a('function');
          setTimeout(next, i * 5);
        });

    var cb = chai.spy(function (err) {
      should.not.exist(err);
      spy.should.have.been.called.exactly(arr.length);
    });

    async.forEachSeries(arr, spy, cb);

    setTimeout(function () {
      cb.should.have.been.called.once;
      done();
    }, 100);
  });

  it('should invoke callback if there is an error', function (done) {
    var count = 4
      , spy = chai.spy(function (i, next) {
          arr.should.include(i);
          count.should.equal(i);
          count--;
          next.should.be.a('function');
          if (i == 2) return next('err');
          setTimeout(next, i * 5);
        });

    var cb = chai.spy(function (err) {
      should.exist(err);
      err.should.equal('err');
      spy.should.have.been.called.exactly(3);
    });

    async.forEachSeries(arr, spy, cb);

    setTimeout(function () {
      cb.should.have.been.called.once;
      done();
    }, 100);
  });
});
