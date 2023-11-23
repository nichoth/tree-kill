var assert = require('assert');
var fork = require('child_process').fork;
var kill = require('../');

describe('kill()', function(){
    it('should kill a process', function(done){ 
        var p = fork('./test/spin')
        assert.ok(p.pid)

        p.on('exit', function(code, signal){
            assert.ok(code || signal, 'should return an exit code')
            return done()
        });

        kill(p.pid)
    })

    it('should call a callback', function(done){ 
        var p = fork('./test/spin')
        assert.ok(p.pid)

        kill(p.pid, null, function() {
            return done()
        })
    })
    
    it('should work if signal is left out', function(done){ 
        var p = fork('./test/spin')
        assert.ok(p.pid)

        kill(p.pid, function() {
            return done()
        })
    })

    it('should reject invalid pid', function(done){
        var p = fork('./test/spin')
        assert.ok(p.pid)

        kill('rm -rf /dev/null', function(err) {
            assert.ok(typeof err === 'object')
            return done()
        })
    })

    it('should reject invalid pids even if no callback', function(done){
        var p = fork('./test/spin')
        assert.ok(p.pid)

        try {
            kill('rm -rf /dev/null')
            assert.fail('should have thrown')
        } catch (err) {
            assert.ok(typeof err === 'object')
            return done();
        }
    })
})
