# requestAnimationFrame Timing

This code exists to explore the accuracy and precision of JavaScript timing around `requestAnimationFrame`. More succinctly, it attempts to answer the question, "how reliably can I know the exact moment _before_ and the exact moment _after_ a browser repaint?"

Run in your browser locally or via your favorite local web server.

```bash
http-server . -p 4001
```

The script hooks into the `requestAnimationFrame` and reports the delay between the initial call and the subsequent call after a repaint. It also inserts a delay function in the `requestAnimationFrame` queue _after_ the instrumentation, simulating a greedy process that _could_ occur and interrupt our timing.

By default this inserts a 500ms delay. Observations in Chrome revealed that occasionally the delaying function ran twice, yielding a 1000ms delay instead of the expected 500ms delay.

## Operational Notes

`requestAnimationFrame` can be used to build a function queue that will be executed before a browser starts its reflow/repaint cycle. Consecutive calls to `requestAnimationFrame` add more functions to the queue.

`setTimeout` has a special behavior inside of a function called by `requestAnimationFrame`. Normally there is a minimum delay for `setTimeout` (approximately 4ms), but in this case it gets called immediately _after_ a repaint finishes, which in other exploratory testing has been found to yield a delay shorter than a few milliseconds.
