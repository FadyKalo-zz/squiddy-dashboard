function collapseToggle($target) {
  var gridBody = $target.parents(".grid").children(".grid-body");
  var gridFooter = $target.parents(".grid").children(".tiles");
  if ($target.hasClass("collapse")) {
    $target.removeClass("collapse").addClass("expand");
    gridBody.slideUp(200);
    gridFooter.slideUp(200);
  } else {
    $target.removeClass("expand").addClass("collapse");
    gridBody.slideDown(200);
    gridFooter.slideDown(200);
  }
}

function removeToggle($target) {
  var removable = $target.parents(".grid");
  if (removable.next().hasClass('grid') || removable.prev().hasClass('grid')) {
    $target.parents(".grid").remove();
  } else {
    $target.parents(".grid").parent().remove();
  }
}

function refreshToggle($target) {
  var grid = $target.parents(".grid");
  var $grid = $(grid);
  blockUI($grid);
  window.setTimeout(function () {
    unblockUI($grid);
  }, 1000);
}


////  $('.grid .tools .collapse, .grid .tools .expand').on('click', function () {
//function settingsToggle($target){
//    var el = $target.parents(".grid").children(".grid-body");
//    if $target.hasClass("collapse")) {
//      $target.removeClass("collapse").addClass("expand");
//      el.slideUp(200);
//    } else {
//      $target.removeClass("expand").addClass("collapse");
//      el.slideDown(200);
//    }
//  }

function blockUI($element) {
  $element.block({
    message: '<div class="loading-animator"></div>',
    css: {
      border: 'none',
      padding: '2px',
      backgroundColor: 'none'
    },
    overlayCSS: {
      backgroundColor: '#fff',
      opacity: 0.3,
      cursor: 'wait'
    }
  });
}

// wrapper function to  un-block element(finish loading)
function unblockUI($element) {
  $element.unblock();
}
