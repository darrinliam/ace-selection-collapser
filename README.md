# ace-selection-collapser

ace-selection-collapser is a utility for the Ace editor that folds multiple selections down to the first line of each selection. The selections can either be hits from the Ace searchbox or hand-selected, disjoint sections of text.


After a block of text is collapsed using the utility, a button appears to the right of the line that, if clicked, will expand that block of folded text. If all blocks are still collapsed and the text is still selected, then calling the same utility again will toggle the folds off and restore the complete, unfolded view of the text.


More information on the Ace Editor can be found [here.](https://github.com/ajaxorg/ace/)

## Installation

Clone the repository or download the zip and expand in an empty directory. 


## Usage

The file `collapser.js` contains the class Collapser. In your editor container, instantiate with
```
let mycollapser = new Collapser(editor);
```
where `editor` is the Ace editor you created via `ace.edit()`.

Then call the method `toggleSelectionCollapse()` from your `Ace` editor container when you want to collapse selections. Calling the method when no text is selected has no effect on the appearance of the edit session.

Note: to load `collapser.js` as an es6 module, uncomment the export statement (the last line) in said file and add the following import to your editor container (assuming `collapser.js` is in the same directory as the container):
```
import { Collapser } from './collapser.js';
```

## Example

To see the utility in action, open `examples/collapser.html` in your favorite browser. This example, complete with a `JSON` tester file, provides two buttons: one to open the search box, and another to collapse selections. Virst, search for some text, preferably a string that appears multiple times, like "donkey". Then click on the "Collapse search hits/multiselections" button.
