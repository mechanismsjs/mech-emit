[mech-home-link]: https://github.com/mechs/mech "Home repository for mechs"

# mech-emit

An emitter is a design pattern.

An emitter mech works by returning the next element from "something" for each invocation of the emitter mech.

That "something" could be an array, hashtable, open socket, list, a range (1..6), etc. Emitter don't care. It just emits the next thing.

## Example Usage

A post on [Generating Sequences Using Emitters](http://www.erichosick.com/design/design-sequences-with-emitters/) shows a lot of examples of how the emitter can be used.

# Emitters Library

This library contains a bunch of emitters. Please add some more!

See [Mechs Home][mech-home-link] for more information and other libraries.

# Supported Mechs

* *emitFromArr* - Given an array, emitFromArr emits a single element at a time from the array.
* *emitFromRange* - Given a valid range, emitFromRange emits a single element from that range.

## emitFromArr mech

Given an array, emitFromArr will continue to emit each element in the array. If no more elements are left, emitFromArr will emit *undefined*. If repeat is true, emitFromArr will start emitting the array from the beginning.

```javascript
m.emitFromArr([3,4,8]);
m.go // 1st time returns 3
m.go // 2nd time returns 3
m.go // 3rd time returns 8
m.go // 4th time returns undefined
// then undefined forever
```

```javascript
m.emitFromArr([7,2],true);
m.go // 1st time returns 7
m.go // 2nd time returns 2
m.go // 3rd time returns 7
m.go // 4th time returns 2
// ... forever
```

When set to true, the emitter will emit forever. Be careful when using with mechs like *[loop](https://github.com/mechanismsjs/mech-math#loop)* and *[map](https://github.com/mechanismsjs/mech-math#map-mech)*.

## emitFromRange mech

Given a min, max and (increment-)by, will emit the range. At the end of the range, emitFromRange will emit *undefined*. If repeat is true, emitFromRange will start emitting the range from the beginning.

```javascript
m.emitFromRange(2,6,2);
m.go // 1st time returns 2
m.go // 2nd time returns 4
m.go // 3rd time returns 6
m.go // 4th time returns undefined
// then undefined forever
```

```javascript
m.emitFromRange(8,5,-1);
m.go // 1st time returns 8
m.go // 2nd time returns 7
m.go // 3rd time returns 6
m.go // 4th time returns 5
m.go // 5th time returns undefined
// then undefined forever
```

And, you can emit through a HUGE range:

```javascript
m.emitFromRange(0,Infinity,1000)
m.go // 1st time return 0
m.go // 2nd time returns 1000
m.go // 3rd time returns 2000
// then foreverish
```

And let's make our by an emitter:


```javascript
m.emitFromRange(1,300,m.emitFromArr([3, -1, 4],true));
m.go // 1st time return 0
m.go // 2nd time returns 1000
m.go // 3rd time returns 2000
// then foreverish
```


## Infinite Sized Maps!

Let's say you want to apply an algorithm to a range of data that has no bounds.

Using mechs, this is really easy:

```javascript
m.add(2, m.emitFromRange(0,Infinity,1000));

m.go // 1st time return 2
m.go // 2nd time returns 1002
m.go // 3rd time returns 2002
// then foreverish
```

Passing this into a mapping mech would be bad:

```javascript
m.map(
  m.add(2, m.emitFromRange(0, Infinity, 1000))
);

m.go // theoretically, should never return
```

This should theoretically freeze because we will try to create an infinite map. However, we've implemented a default limit to the number of items the mapping function will attempt to traverse to 1000. You can, of course, increase that number to any number you like.

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