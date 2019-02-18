// There’s a trick to split CPU-hungry tasks using setTimeout.
// For instance, a syntax-highlighting script (used to colorize code examples on this page)
// is quite CPU-heavy. To highlight the code, it performs the analysis, creates many
// colored elements, adds them to the document – for a big text that takes a lot.
// It may even cause the browser to “hang”, which is unacceptable.

// So we can split the long text into pieces. First 100 lines,
// then plan another 100 lines using setTimeout(...,0), and so on.
// For clarity, let’s take a simpler example for consideration.

// We have a function to count from 1 to 1000000000.
// If you run it, the CPU will hang. For server-side JS that’s clearly noticeable,
// and if you are running it in-browser, then try to click other buttons on the
// page – you’ll see that whole JavaScript actually is paused, no other actions
// work until it finishes.

const countCrash = function() {
  let i = 0;

  let start = Date.now();

  // do a heavy job
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  alert("Done in " + (Date.now() - start) + 'ms');
};

// The browser may even show “the script takes too long” warning
// (but hopefully it won’t, because the number is not very big).

// Let’s split the job using the nested setTimeout:

const countV1 = function() {
  let i = 0;
  let start = Date.now();
  const count = function() {
    // do a piece of the heavy job (*)
    do {
      i++;
    } while (i % 1e6 != 0);

    if (i == 1e9) {
      alert("Done in " + (Date.now() - start) + 'ms');
    } else {
      setTimeout(count, 0); // schedule the new call (**)
    }
  };

  count();
};

// Now the browser UI is fully functional during the “counting” process.
// Pauses between count executions provide just enough “breath” for the JavaScript
// engine to do something else, to react to other user actions.

// The notable thing is that both variants – with and without splitting
// the job by setTimeout – are comparable in speed.
// There’s no much difference in the overall counting time.
// To make them closer, let’s make an improvement.

// We’ll move the scheduling in the beginning of the count():

const countV2 = function() {
  let i = 0;
  let start = Date.now();
  function count() {
    // move the scheduling at the beginning
    if (i < 1e9 - 1e6) {
      setTimeout(count, 0); // schedule the new call
    }
  
    do {
      i++;
    } while (i % 1e6 != 0);
  
    if (i == 1e9) {
      alert("Done in " + (Date.now() - start) + 'ms');
    }
  
  }
  count();
};

// Now when we start to count() and know that we’ll need to count() more,
// we schedule that immediately, before doing the job.
// If you run it, it’s easy to notice that it takes significantly less time.

// here is another thing countV2 is practically the same as setInterval:

const countV3 = function() {
  let i = 0;
  let start = Date.now();

  const id = setInterval(() => {
    do {
      i++;
    } while (i % 1e6 != 0);
  
    if (i == 1e9) {
      clearInterval(id);
      alert("Done in " + (Date.now() - start) + 'ms');
    }

  }, 0);
};