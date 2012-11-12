describe('.forEach()', function () {
  var arr = [ 1, 2, 3, 4 ];

  it('should run a for each in parallel', function (done) {
    var spy = chai.spy(function (i, next) {
      arr.should.include(i);
      next.should.be.a('function');
      setTimeout(next, 10);
    });

    var cb = chai.spy(function (err) {
      should.not.exist(err);
      spy.should.have.been.called.exactly(arr.length);
    });

    async.forEach(arr, spy, cb);

    setTimeout(function () {
      cb.should.have.been.called.once;
      done();
    }, 100);
  })

  it('should invoke callback if there is an error', function (done) {
    var spy = chai.spy(function (i, next) {
      arr.should.include(i);
      next.should.be.a('function');
      if (i == 3) return next('err');
      setTimeout(next, 10);
    });

    var cb = chai.spy(function (err) {
      should.exist(err);
      err.should.equal('err');
      spy.should.have.been.called.exactly(3);
    });

    async.forEach(arr, spy, cb);

    setTimeout(function () {
      cb.should.have.been.called.once;
      done();
    }, 100);
  });
});
