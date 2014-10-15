[mech-home-link]: https://github.com/mechanisms/mech "Home repository for mechanisms"

# mech-emit

An emitter is a design pattern.

An emitter mechanism works by returning the next element from "something" for each invocation of the emitter mechanism.

That "something" could be an array, hashtable, open socket, list, a range (1..6), etc. Emitter don't care. It just emits the next thing.

## Example Usage

### An Example With Maps

Traditionally, mapping in javascript is done as follows:

```javascript traditional
[1,2,3,4,5].map(
   function(n) {
     return n + 2;
 });
```

This is the "push-pull" approach to programming: we "push" data into the algorithm and pull a result.

Mechanisms use a "pull" approach to programming: an algorithm "pulls" the data into itself. Let's see what that looks like:


```javascript mechanisms
m.map(
  m.add(2, m.emitArr([1,2,3,4,5]))
 ).go;
```

In his case, map returns an array by calling add until there is nothing left to emit.

The resulting array is:

```javascript mechanisms
[3,4,5,6,7]
```

# Emitters Library

This library contains a bunch of emitters. Please add some more!

See [Mechanisms Home][mech-home-link] for more information and other libraries.

# Supported Mechanisms

* emitArr - Given an array, emitArr emits a single element at a time from the array.
* emitRange - Given a valid range, emitRange emits a single element from that range.

## emitArr mechanism

Given an array, emitArr will continue to emit each element in the array. If no more elements are left, emitArr will emit *undefined*. If repeat is true, emitArr will start emitting the array from the beginning.

```javascript
m.emitArr([3,4,8]);
m.go // 1st time returns 3
m.go // 2nd time returns 3
m.go // 3rd time returns 8
m.go // 4th time returns undefined
// then undefined forever
```

```javascript
m.emitArr([7,2],true);
m.go // 1st time returns 7
m.go // 2nd time returns 2
m.go // 3rd time returns 7
m.go // 4th time returns 2
// ... forever
```

When set to true, the emitter will emit forever. Be careful when using with mechanisms like mapping.

## emitRange mechanism

Given a min, max and (increment-)by, will emit the range. At the end of the range, emitRnage will emit *undefined*. If repeat is true, emitRange will start emitting the range from the beginning.

```javascript
m.emitRange(2,6,2);
m.go // 1st time returns 2
m.go // 2nd time returns 4
m.go // 3rd time returns 6
m.go // 4th time returns undefined
// then undefined forever
```

```javascript
m.emitRange(8,5,-1);
m.go // 1st time returns 8
m.go // 2nd time returns 7
m.go // 3rd time returns 6
m.go // 4th time returns 5
m.go // 5th time returns undefined
// then undefined forever
```

And, you can emit through a HUGE range:

```javascript
m.emitRange(0,Infinity,1000)
m.go // 1st time return 0
m.go // 2nd time returns 1000
m.go // 3rd time returns 2000
// then foreverish
```

## Infinite Sized Maps!

Let's say you want to apply an algorithm to a range of data that has no bounds.

Using mechanisms, this is **frackin** easy:


```javascript
m.add(2, m.emitRange(0,Infinity,1000));

m.go // 1st time return 2
m.go // 2nd time returns 1002
m.go // 3rd time returns 2002
// then foreverish
```

Passing this into a mapping mechanism would be bad:

```javascript
m.map(
  m.add(2, m.emitRange(0, Infinity, 1000))
);

m.go // will never return
```

This will freeze because we will try to create an infinite map.

But really, who needs a map when you can turn any algorithm into a "mapping" algorithm by simply adding emitters to the algorithm.

Add can simply make add a "mapping" algorithm by adding an emitter.

## Interface Change Warning

TODO: We may change the interface of emit's optional repeat parameter. We may make it:

'repeat' - will cause the emitter to repeat when it reaches the end of the items to emit
'reverse' - will cause the emitter to reverse what it emits starting at the end of the array
'repeat-reverse' - will cause the emitter to flip flop between emitting forward and then reverse.

# Setup

## Using In Your Projects

Change directory to your node project.

    $ npm install --save mech-emit

## Development

### Setup

    $ npm install
    
### Continuous Rebuild and Testing

See ./dist for files we build.

    $ gulp

#### Test

    $ gulp webtests

OR

Right mouse click on /testsweb/index.html and open in browser.