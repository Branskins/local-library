var users = [
  { id: 1, username: 'branskins', password: 'myfavouritedessert', displayNmae: 'Andres', email: 'andres@example.com'},
  { id: 2, username: 'ascan', password: 'mylovelycat', displayNmae: 'Paulo', email: 'paulo@example.com'},
  { id: 3, username: 'malcolmx', password: 'feeltheemotion', displayNmae: 'Malcolm', email: 'malcolm@example.com'}
];

module.exports = function findById(id, callback) {
  procces.nextTick(function() {
    var index = id - 1;
    if(user[index]) {
      callback(null, user[index]);
    }
    else {
      var err = new Error('User ' + id + ' does not exist');
      return callback(err);
    }
  });
}

module.exports = function findByUsername(username, callback) {
  process.nextTick(function() {
    for(var i = 0; i < user.length; i++) {
      var user = users[i];
      if(record.username === username) {
        return callback(null, user);
      }
    }
    return callback(null, null);
  });
}
