
describe("Testing ACE Selection Collapser", function() {
  beforeEach(done => setTimeout(done, 100));

  it("Check editor container elements", () => {
    expect($('#search').text()).to.be.equal("Open ACE search box");
    expect($('#collapse').text()).to.be.equal("Collapse search hits/multiselections");
    expect($('#editor')).to.exist;
  });

  it("Check editor content", () => {

    expect($('.ace_content')).to.exist;
    console.log($('.ace_text-layer')[0]);
    expect($('.ace_content .ace_text-layer .ace_line')).to.exist;
    console.log($('.ace_content .ace_text-layer'));
    let line1 = $('.ace_content > .ace_text-layer  > .ace_line > span');
    expect(line1[0].innerText).to.be.equal("[");
    expect(line1[1].innerText).to.be.equal("{");
    expect(line1[2].innerText).to.be.equal("\"animal_name\"");
  });

  it("Open searchbox via container button", () => {
    $('#search').click(); 
    let searchbox_field = $('input.ace_search_field');
    expect(searchbox_field).to.exist;
  });

  it("Enter text in searchbox, then collapse searches via container button", () => {
    let searchbox_field = $('input.ace_search_field');
    expect(searchbox_field).to.exist;
    $('input.ace_search_field').val("donkey");
    $('.ace_searchbtn[action="findAll"]').click(); // clicking findAll closes searchbox
    $('#collapse').click(); // collapse selections
  });

  it("Count collapsed lines in editor and toggle back to uncollapsed state", () => {
    expect($('.ace_line').length).to.be.equal(8);
    expect($('.ace_line')[2].children[2]).to.exist;
    expect(document.querySelectorAll('.ace_line')[2].children[2].className).to.be.equal('ace_fold')
	expect($('.ace_fold').length).to.be.equal(8);
	$('#collapse').click(); // toggle selections from collapsed to fully expanded
  });

  it("Check for folds (should be 0).", () => {
    expect($('.ace_fold').length).to.be.equal(0);
     $('#container').hide();  // hide container on last test so test results can be viewed.
  });

});
