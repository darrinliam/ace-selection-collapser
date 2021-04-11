'use strict';

(function() {
  const testJson = `[
  { 
    "animal_name": "elephant502", 
    "age": 2,  
	"haircolor": "orange"
  },
  {
    "animal_name": "donkey1202",
    "age": 5,
    "haircolor": "brown"
  },
  {
    "animal_name": "turtle9831",
    "age": 3,
    "haircolor": "none"
  },
  {
    "animal_name": "elephant4935",
    "age": 2,
    "haircolor": "yellow"
  },
  {
    "animal_name": "ostrich9403",
    "age": 12,
    "haircolor": "mauve"
  },
  {
    "animal_name": "donkey431",
    "age": 2,
    "haircolor": "teal"
  },
  {
    "animal_name": "badger902",
    "age": 1,
    "haircolor": "light green"
  },
  {
    "animal_name": "donkey1239",
    "age": 4,
    "haircolor": "blue"
  },
  {
    "animal_name": "ostrich9934",
    "age": 11,
    "haircolor": "mauve"
  },
  {
    "animal_name": "donkey9314",
    "age": 12,
    "haircolor": "lavender"
  },
  {
    "animal_name": "racoon8641",
    "age": 12,
    "haircolor": "donkey-colored"
  },
  {
    "animal_name": "ostrich5949",
    "age": 10,
    "haircolor": "lime green"
  },
  {
    "animal_name": "anteater5236",
    "age": 3,
    "haircolor": "deep sea green"
  },
  {
    "animal_name": "donkey3925",
    "age": 14,
    "haircolor": "pink"
  },
    {
    "animal_name": "donkey6027",
    "age": 2,
    "haircolor": "cream"
  },
  {
    "animal_name": "mole1106",
    "age": 1,
    "haircolor": "off white"
  }
]
`;


  //  Create the editor container and render two buttons: one for open the Ace searchbox
  //  and another for collapsing/uncollapsing selections.
  //
  //  Elements are injected here instead of specifying elements in collapser.html to 
  //  facilitate mocha testing.
  let container = document.createElement('div');
  container.id = "container";
  document.querySelector('body').appendChild(container);

  let buttonRow = document.createElement('div');
  buttonRow.classList.add('buttonRow');
  let selButton = document.createElement('button');
  selButton.id = "search";
  selButton.classList.add('btn');
  selButton.innerText = "Open ACE search box";
  buttonRow.appendChild(selButton);
  let colButton = document.createElement('button');
  colButton.id = "collapse";
  colButton.classList.add('btn');
  colButton.innerText = "Collapse search hits/multiselections";
  buttonRow.appendChild(colButton);
  container.appendChild(buttonRow);

  let msg = document.createElement('div');
  msg.id = "msg";
  msg.classList.add('msgBar');
  container.appendChild(msg);

  let ed = document.createElement("div");
  ed.id = "editor";
  container.appendChild(ed);

  let editor = ace.edit("editor"); // create editor instance
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/json");
  editor.setValue(testJson);
  editor.focus();
  editor.moveCursorTo(0, 0);

  const setMsg = (newmsg) => {
    if (newmsg === undefined)
      msg.innerText = "";
    else
      msg.innerText = newmsg;
  }

  editor.container.addEventListener('click', () => {
    setMsg();
  });

  let col = new Collapser(editor); // instantiate collapser.

  let collapseBtn = document.getElementById("collapse");
  collapseBtn.addEventListener('click', () => {
    setMsg();
    let stillHighlighted = col.toggleSelectionCollapse();
    if (!stillHighlighted)
      setMsg("No selections are active. Please select text or search for something.");
  });

  let searchBtn = document.getElementById("search");
  searchBtn.addEventListener('click', () => {
    setMsg();
    editor.execCommand("find");
  });
})()
