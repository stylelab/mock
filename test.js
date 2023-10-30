$(function () {
  $('.movie-thumb').on('click', function () {
    if ($('.sp-spacer').is(':visible')) {
      window.open(
        'https://www.youtube.com/embed/ZRCdORJiUgU?rel=0&autoplay=1',
        '_blank'
      )
    } else {
      videoControl('playVideo', $(this).prev('iframe'))
      $(this).hide()
    }
  })
  function videoControl(action, tgt) {
    var $playerWindow = $(tgt)[0].contentWindow
    $playerWindow.postMessage(
      '{"event":"command","func":"' + action + '","args":""}',
      '*'
    )
  }
})
