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

  //
  var videoId = 'eW1T1-MHCFw' //動画ID
  var videoWidth = '640' //動画横サイズ
  var videoHeight = '360' //動画縦サイズ

  // iframe Player APIを非同期で読み込み
  var tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  var firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

  // #player にiframeplayerを作成
  var player
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: videoHeight,
      width: videoWidth,
      videoId: videoId,
      playerVars: {
        autoplay: 1, //自動再生する
      },
    })
  }
})
