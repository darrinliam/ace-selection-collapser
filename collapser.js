'use strict';

/** Class that implements the Ace selection collapser.
 *
 * If selections are still active, the collapse button will toggle between collapsed and 
 * uncollapsed selections.
 */
class Collapser {

  // The constructor requires one parameter, editor, the Ace editor instance created 
  // in the editor container via ace.edit().
  constructor(editor) {
    if (!editor || (typeof (editor) !== 'object'))
      throw new Error("Collapser constructor requires an editor instance.");
    this.searchFolds = [];
    this.editor = editor;
  }


  /** When multiselections are active, toggleFoldSelections() toggles between 
    folding all selections down to just the first line of each selection, 
    and unfolding all selections.
	@returns {boolean}  - true if selections are still active; false if none are active
  */
  toggleSelectionCollapse() {

    let ed_sess = this.editor.session;
    let i;
    let nrange, prevrange;
    let Range = ace.require('ace/range').Range;
    let fold;

    let addFiltFold = (title, range) => {
      ed_sess.addFold(title, range);
      let nfold = ed_sess.getFoldAt(range.start.row,
        range.start.column, 1);
      this.searchFolds.push(nfold);
    }

    if (this.searchFolds.length) {
      // button clicked 2nd time: remove all find folds to uncollapse
      this.searchFolds.forEach((item) => {
        fold = ed_sess.getFoldAt(item.start.row, item.start.column, 1);
        if (fold)
          ed_sess.removeFold(fold);
      });
      this.searchFolds = [];
      return true;
    }

    let allranges = ed_sess.selection.getAllRanges();
    if (allranges &&
      (allranges[0].start.row === allranges[0].end.row) &&
      (allranges[0].start.column === allranges[0].end.column)) {
      return false; // The search results/selections have already been un-highlighted. Nothing to fold.
    }

    for (i = 0; i < allranges.length; i++) {
      nrange = new Range(allranges[i].start.row,
        allranges[i].start.column,
        allranges[i].start.row,
        allranges[i].start.column + 1);
      nrange.start.column = ed_sess.getLine(nrange.start.row).length;
      if (typeof prevrange === "undefined") {
        // First hit. If not on the 1st line, fold up lines up to the first hit.
        if (nrange.start.row > 0) {
          let firstrange = new Range(
            0, 0,
            nrange.start.row - 1,
            ed_sess.getLine(nrange.start.row - 1).length);
          addFiltFold("...", firstrange)
        }
      } else {
        if (nrange.start.row > prevrange.start.row + 1) {
          prevrange.end.row = nrange.start.row - 1;
          prevrange.end.column = ed_sess.getLine(nrange.end.row - 1).length;
          addFiltFold("...", prevrange);
        }
      }
      prevrange = nrange;
    }
    if (typeof nrange !== "undefined") {
      // Add folding button for last search hit
      let totlines = ed_sess.doc.getAllLines();
      nrange.end.row = totlines.length;
      nrange.end.column = ed_sess.getLine(nrange.end.row).length;
      addFiltFold("...", nrange);
    }
    return true;
  }
}

