const Twit = require('twit');

const T = new Twit({
  consumer_key: 'YOUR_API_KEY',
  consumer_secret: 'YOUR_API_SECRET',
  access_token: '49934144-3gQqXjBleShWaUSJnroaehM6sJrC79mN51fGQshAJ',
  access_token_secret: 'RplzAZknyJ875tjhZpPnALPjKcH4HvzKyO0IVSGwIlzJm',
});

// Delete all tweets
T.get('statuses/user_timeline', { count: 200 }, (err, data) => {
  if (err) console.error('Error fetching tweets:', err);
  else {
    data.forEach(tweet => {
      T.post('statuses/destroy/:id', { id: tweet.id_str }, err => {
        if (err) console.error(`Failed to delete ${tweet.id_str}:`, err);
        else console.log(`Deleted: ${tweet.id_str}`);
      });
    });
  }
});

// Unlike all posts
T.get('favorites/list', { count: 200 }, (err, data) => {
  if (err) console.error('Error fetching likes:', err);
  else {
    data.forEach(like => {
      T.post('favorites/destroy', { id: like.id_str }, err => {
        if (err) console.error(`Failed to unlike ${like.id_str}:`, err);
        else console.log(`Unliked: ${like.id_str}`);
      });
    });
  }
});
