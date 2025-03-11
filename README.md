These are my solutions to the internationalization puzzles at [i18n-puzzles.com](https://i18n-puzzles.com/).

Out of the languages I've written production code in, JS been the least reassuring ecosystem in terms of feeling like I've ever gotten these topics "right". So I'm doing these in TypeScript to force as many bugs and fixes as I can!

I'm going to try to do this in as much vanilla JS/TS as I reasonably can. But there are some libraries that I would reach for in _any_ language, and I'll allow myself those here:

- Datetime handling: vanilla JS `Date` where simple, [Luxon] for anything non-trivial, eagerly awaiting [Temporal]

[Luxon]: https://moment.github.io/luxon
[Temporal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal
