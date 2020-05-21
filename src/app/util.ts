export function saveSelection(containerEl) {
  if (window.getSelection && document.createRange) {
    var range = window.getSelection().getRangeAt(0);
    var preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(containerEl);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    var start = preSelectionRange.toString().length;

    return {
      start: start,
      end: start + range.toString().length
    }
  } else if (document.selection && document.body.createTextRange) {
    var selectedTextRange = document.selection.createRange();
    var preSelectionTextRange = document.body.createTextRange();
    preSelectionTextRange.moveToElementText(containerEl);
    preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
    var start = preSelectionTextRange.text.length;

    return {
      start: start,
      end: start + selectedTextRange.text.length
    }
  }
}

export function restoreSelection(containerEl, savedSel) {
  if (window.getSelection && document.createRange) {
    var charIndex = 0, range = document.createRange();
    range.setStart(containerEl, 0);
    range.collapse(true);
    var nodeStack = [containerEl], node, foundStart = false, stop = false;

    while (!stop && (node = nodeStack.pop())) {
      if (node.nodeType == 3) {
        var nextCharIndex = charIndex + node.length;
        if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
          range.setStart(node, savedSel.start - charIndex);
          foundStart = true;
        }
        if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
          range.setEnd(node, savedSel.end - charIndex);
          stop = true;
        }
        charIndex = nextCharIndex;
      } else {
        var i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (document.selection && document.body.createTextRange) {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(containerEl);
    textRange.collapse(true);
    textRange.moveEnd("character", savedSel.end);
    textRange.moveStart("character", savedSel.start);
    textRange.select();
  }
}

/*

var util = (function () {

  http://stackoverflow.com/questions/13949059/persisting-the-changes-of-range-objects-after-selection-in-html/13950376#13950376
  var saveSelection, restoreSelection;
  var savedSelection;

  if (window.getSelection && document.createRange) {
    saveSelection = function(containerEl) {
      var range = window.getSelection().getRangeAt(0);
      var preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(containerEl);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      var start = preSelectionRange.toString().length;

      return {
        start: start,
        end: start + range.toString().length
      }
    };

    restoreSelection = function(containerEl, savedSel) {
      var charIndex = 0, range = document.createRange();
      range.setStart(containerEl, 0);
      range.collapse(true);
      var nodeStack = [containerEl], node, foundStart = false, stop = false;

      while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType == 3) {
          var nextCharIndex = charIndex + node.length;
          if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
            range.setStart(node, savedSel.start - charIndex);
            foundStart = true;
          }
          if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
            range.setEnd(node, savedSel.end - charIndex);
            stop = true;
          }
          charIndex = nextCharIndex;
        } else {
          var i = node.childNodes.length;
          while (i--) {
            nodeStack.push(node.childNodes[i]);
          }
        }
      }

      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  } else if (document.selection && document.body.createTextRange) {
    saveSelection = function(containerEl) {
      var selectedTextRange = document.selection.createRange();
      var preSelectionTextRange = document.body.createTextRange();
      preSelectionTextRange.moveToElementText(containerEl);
      preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
      var start = preSelectionTextRange.text.length;

      return {
        start: start,
        end: start + selectedTextRange.text.length
      }
    };

    restoreSelection = function(containerEl, savedSel) {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(containerEl);
      textRange.collapse(true);
      textRange.moveEnd("character", savedSel.end);
      textRange.moveStart("character", savedSel.start);
      textRange.select();
    };
  }



  function doSave(element) {
    savedSelection = saveSelection(element);
  }

  function doRestore(element) {
    if (savedSelection) {
      restoreSelection(element, savedSelection);
    }
  }

  return {
    doSave: doSave,
    doRestore: doRestore
  };


}());

*/