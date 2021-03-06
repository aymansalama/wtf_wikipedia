'use strict';
var test = require('tape');
var wtf = require('./lib');

test('basic-markdown', t => {
  var md = wtf('he is [[Spencer Kelly|so cool]] and [http://cool.com fresh]').markdown();
  t.equal(md, 'he is [so cool](./Spencer_Kelly) and [fresh](http://cool.com)', 'internal, external links');

  md = wtf('hello [[Image:1930s Toronto KingStreetWnearYork.jpg|thumb|right|250px]] world').markdown();
  t.equal(md, `![1930s Toronto KingStreetWnearYork](https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/1930s_Toronto_KingStreetWnearYork.jpg/300px-1930s_Toronto_KingStreetWnearYork.jpg)
hello world`, 'image');

  md = wtf(`he is ''really good''`).markdown();
  t.equal(md, 'he is *really good*', 'multi-word italic');

  md = wtf(`he is '''really good'''`).markdown();
  t.equal(md, 'he is **really good**', 'multi-word bold');

  md = wtf(`he is ''''really good''''`).markdown();
  t.equal(md, 'he is **\'really good\'**', 'four-ticks');

  md = wtf(`he is '''''really good'''''`).markdown();
  t.equal(md, 'he is ***really good***', 'bold+italics');
  t.end();
});

test('markdown-tricks', t => {
  var md = wtf('the is [[he]] nice').markdown();
  t.equal(md, 'the is [he](./He) nice', 'matches whole-word');

  md = wtf('the is [[he]]. nice').markdown();
  t.equal(md, 'the is [he](./He). nice', 'matches with-period');

  md = wtf('stim\'s is [[tim]]\'s son').markdown();
  t.equal(md, 'stim\'s is [tim\'s](./Tim) son', 'matches with apostrophe');

  md = wtf(`we put the '''e''' in team`).markdown();
  t.equal(md, 'we put the **e** in team', 'fmt supports smartReplace');

  t.end();
});
