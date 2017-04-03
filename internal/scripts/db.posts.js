var db = db || {};

db.posts = {
  createPost: function(user, post, lat, lng, onSuccess, onFailure) {
    var key = db.newKey('/posts');
    LOG && DB && console.log('Creating post', key);

    post.author = user;
    post.created = db.timestamp();
    if (post.tags) {
      var tags = {};
      for (var i = 0; i < post.tags.length; i++) {
        tags[post.tags[i]] = true;
      }
      post.tags = tags;
    }

    var geoUpdate = function() {
      var geofire = new GeoFire(db.ref('/geoPosts'));
      geofire.set(key, [lat, lng]).then(function () {
        onSuccess && onSuccess();
      }, function (error) {
        onFailure && onFailure(error);
      });
    };

    var updates = db.userActionUpdate(user);
    updates['/posts/' + key] = post;
    updates['/profiles/' + user + '/posts/' + key] = post.title;
    db.update(updates, geoUpdate, onFailure);
    return key;
  }
};
