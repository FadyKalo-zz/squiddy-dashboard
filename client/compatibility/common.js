function collapseToggle($target) {
  var el = $target.parents(".grid").children(".grid-body");
  var el1 = $target.parents(".grid").children(".tiles");
  if ($target.hasClass("collapse")) {
    $target.removeClass("collapse").addClass("expand");
    el.slideUp(200);
    el1.slideUp(200);
  } else {
    $target.removeClass("expand").addClass("collapse");
    el.slideDown(200);
    el1.slideDown(200);
  }
}


