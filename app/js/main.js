/**
 * Returns x raised to the n-th power.
 *
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
// Factory patern
class BallFactory {
  constructor() {
    this.createBall = function(type) {
      let ball;
      if (type === 'football' || type === 'soccer') ball = new Football();
      else if (type === 'basketball') ball = new BasketBall();

      ball.roll = function() {
        return `The ${this.type} is rolling.`;
      };

      return ball;
    };
  }
}

class Football {
  constructor() {
    this.type = 'football';
    this.kick = function() {
      return 'You kicked the football';
    };
  }
}

class BasketBall {
  constructor() {
    this.type = 'basketball';
    this.bounce = function() {
      return 'You bounced the basketball.';
    };
  }
}

const factory = new BallFactory();
const myFootball = factory.createBall('football');
const myBasketball = factory.createBall('basketball');

// console.log(myFootball.roll());
// console.log(myBasketball.roll());

// console.log(myFootball.kick());
// console.log(myBasketball.bounce());

// Observe pattern
class Subject {
  constructor() {
    this._observers = [];
  }

  subscribe(observer) {
    this._observers.push(observer);
  }

  unsubscribe(observer) {
    this._observers = this._observers.filter(obs => observer !== obs);
  }

  fire(change) {
    this._observers.forEach(observer => {
      observer.update(change);
    });
  }
}

class Observer {
  constructor(state) {
    this.state = state;
    this.initialState = state;
  }

  update(change) {
    let state = this.state;
    switch (change) {
      case 'INC':
        this.state = ++state;
        break;
      case 'DEC':
        this.state = --state;
        break;
      default:
        this.state = this.initialState;
    }
  }
}

// usage
const sub = new Subject();

const obs1 = new Observer(1);
const obs2 = new Observer(19);

sub.subscribe(obs1);
sub.subscribe(obs2);

sub.fire('INC');

// console.log(obs1.state); // 2
// console.log(obs2.state); // 20

/**
 * through the use of the closure we expose an object
 * as a public API which manages the private object
 */

var collection = (function() {
  // Private members
  var objects = [];

  // Public members
  return {
    addObject: function(object) {
      objects.push(object);
    },
    removeObject: function(object) {
      var index = objects.indexOf(object);
      if (index >= 0) {
        objects.splice(index, 1);
      }
    },
    getObjects: function() {
      return JSON.parse(JSON.stringify(objects));
    }
  };
})();

collection.addObject("Bob");
collection.addObject("Alice");
collection.addObject("Franck");
// prints ["Bob", "Alice", "Franck"]
console.log(collection.getObjects());
collection.removeObject("Alice");
// prints ["Bob", "Franck"]
console.log(collection.getObjects());
