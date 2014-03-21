(function () {
  $('.collage').removeWhitespace().collagePlus({
    targetHeight: 150,
    allowPartialLastRow: true
  });

  $('body').on('click', 'img.preview', function (evt) {
    var url = $(this).attr('url');
    showGallery(url);
  });

  function showGallery(url) {
    var $dropdown = dropdown();
    var $gallery = $('<div class="gallery">' +
                     '  <img class="img-large" src="' + url + '" />' +
                     '</div>');
    $gallery.height($(window).height() * 0.85);
    $gallery.css({
      left: '5%',
      top: '5%'
    });

    $dropdown
      .html($gallery);
  }

  function dropdown() {
    var $dropdown = $('<div class="dropdown"></div>');
    $dropdown.click(function (evt) {
      if (evt.target === $dropdown.get(0)) {
        $dropdown.remove();
      }
    });
    $('body').append($dropdown);

    return $dropdown;
  }
}());
