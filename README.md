[mech-home-link]: https://github.com/mechanisms/mech "Home repository for mechs"

# mech-emit

An emitter is a design pattern.

An emitter mechanism returns the next element from a source for each invocation of the emitter mechanism.

That source could be an array, hashtable, open socket, list, a range (1..6), etc. Emitter don't care. It just emits the next thing.

## Example Usage

* [Generating Sequences Using Emitters](http://www.erichosick.com/design/design-sequences-with-emitters/)
* [Javascript Map, Filter and Reduce Without Lambdas (Callbacks)](http://www.erichosick.com/design/design-map-filter-reduce-mechanisms/)

# Emitters Library

This library contains a bunch of emitters.

See [Mechanism Home][mech-home-link] for more information and other libraries.

# Supported Mechanisms

* *[emitFromArr](#emitFromArr-mechanism)* - Given an array, emitFromArr emits a single element at a time from the array.
* *[emitFromRange](#emitFromRange-mechanism)* - Given a valid range, emitFromRange emits a single element from that range.

// TODO: Add emitters like

* *emitSin* - Emits a sine wave with range 0 to 1 of a frequencey. Returned value is relative to the last emission.
* *emitCos* - Emits a cosine wave with range 0 to 1 of a frequencey. Returned value is relative to the last emission.
* *emitTriangle* - Emits a triangle wave with range 0 to 1 of a frequencey. Returned value is relative to the last emission.
* *emitFib* - Emit the Fibonacci sequence.

## <a name="emitFromArr-mechanism"></a> emitFromArr Mechanism

Given an array, *emitFromArr* will continue to emit each element in the array. If no more elements are left, *emitFromArr* will emit *undefined*. If repeat is true, *emitFromArr* will start emitting the array from the beginning never emitting *undefined*.

```javascript
var em = m.emitFromArr([3,4,8]);
em.go // 1st time returns 3
em.go // 2nd time returns 3
em.go // 3rd time returns 8
em.go // 4th time returns undefined
// then undefined forever
```

```javascript
var em = m.emitFromArr([7,2],true);
em.go // 1st time returns 7
em.go // 2nd time returns 2
em.go // 3rd time returns 7
em.go // 4th time returns 2
// ... forever
```

When set to true, the emitter will emit forever. Be careful when using with mechanisms like *[loop](https://github.com/mechanismsjs/mech-math#loop)* and *[map](https://github.com/mechanismsjs/mech-math#map-mech)*.

## <a name="emitFromRange-mechanism"></a> emitFromRange Mechanism

Given a *min*, *max* and *(increment-)by*, will emit the range. At the end of the range, *emitFromRange* will emit *undefined*. If repeat is true, *emitFromRange* will start emitting the range from the beginning.

```javascript
var em = m.emitFromRange(2,6,2);
em.go // 1st time returns 2
em.go // 2nd time returns 4
em.go // 3rd time returns 6
em.go // 4th time returns undefined
// then undefined forever
```

```javascript
var em = m.emitFromRange(8,5,-1);
em.go // 1st time returns 8
em.go // 2nd time returns 7
em.go // 3rd time returns 6
em.go // 4th time returns 5
em.go // 5th time returns undefined
// then undefined forever
```

And, you can emit through a HUGE range:

```javascript
var em = m.emitFromRange(0,Infinity,1000)
em.go // 1st time return 0
em.go // 2nd time returns 1000
em.go // 3rd time returns 2000
// then foreverish
```

And let's make our by an emitter:

```javascript
var em = m.emitFromRange(1,300,m.emitFromArr([3, -1, 4],true));
em.go; // returns 1
em.go; // returns 4
em.go; // returns 3
em.go; // returns 7
em.go; // returns 10
// forever repeating when we hit 300
```

## Infinite Sized Maps!

Let's say you want to apply an algorithm to a range of data that has no bounds.

Using mechanisms, this is really easy:

```javascript
var em = m.add(2, m.emitFromRange(0,Infinity,1000));
em.go // 1st time return 2
em.go // 2nd time returns 1002
em.go // 3rd time returns 2002
// then foreverish
```

Passing this into a mapping mechanism:

```javascript
var emap = m.map(
  m.add(2, m.emitFromRange(0, Infinity, 1000))
);

emap.go // limited to 1000 elements
```

This will not loop forever because, internally, *emitFromRange* limits to the number of items the mapping mechanism will attempt to traverse to 1000. This number can be set.

But really, who needs a map when you can turn any algorithm into a "mapping" algorithm by simply adding emitters to the algorithm.

The *add* mechaism can become an *add* mapping algorithm by providing an emitter to *add*.

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
