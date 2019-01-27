// prioruty queue is only different in the way it implements the
// enqueue method, which takes the value and priority and
// inserts it according to the priority in the queu
// note: priority 1 comes before priority 3 (3 is last)

function PriorityQueue () {
  var collection = [];

  this.printCollection = function() {
    (console.log(collection));
  };

  this.enqueue = function(element) {
      if (this.isEmpty()){ 
          collection.push(element);
      } else {
          var added = false;
          for (var i=0; i<collection.length; i++) {
               if (element[1] < collection[i][1]){ //checking priorities
                  collection.splice(i,0,element);
                  added = true;
                  break;
              }
          }
          if (!added){
              collection.push(element);
          }
      }
  };

  this.dequeue = function() {
      var value = collection.shift();
      return value[0];
  };
  
  this.front = function() {
      return collection[0];
  };
  
  this.size = function() {
      return collection.length; 
  };
  
  this.isEmpty = function() {
      return (collection.length === 0); 
  };
}

var pq = new PriorityQueue(); 
pq.enqueue(['Beau Carnes', 2]); 
pq.enqueue(['Quincy Larson', 3]);
pq.enqueue(['Ewa Mitulska-Wójcik', 1]);
pq.enqueue(['Briana Swift', 2]);
pq.printCollection(); // this one might be the same as the last do use our debugger :)
pq.dequeue();
console.log(pq.front());
pq.printCollection();