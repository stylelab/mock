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

  ////////

  $('.modal-open').click(function () {
    modal.open($(this))
  })

  /*
   *  モーダル設定
   */
  function Modal(el) {
    this.option = {
      modalOverlayClass: 'modal-overlay',
      modalContentClass: 'modal-content',
    }
  }
  Modal.prototype = {
    open: function (el) {
      modalObj = this
      targetID = el.attr('href')
      $target = $(targetID).clone()

      //モーダル表示
      $('body').append(
        '<div class="' + this.option.modalOverlayClass + '"></div>'
      )
      $('.' + this.option.modalOverlayClass)
        .append('<div class="' + this.option.modalContentClass + '"></div>')
        .fadeIn(300)
      $('.' + this.option.modalContentClass)
        .append($target)
        .fadeIn(300)
      $target.fadeIn()

      //閉じるイベント追加
      $('.modal-overlay').click(function (e) {
        modalObj.close()
      })
    },
    close: function () {
      $('.modal-overlay').remove()
      $('.modal-content').remove()
    },
  }
  var modal = new Modal()

  /*
   *  Youtube設定
   */
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
    $('.youtube').each(function (index) {
      var videoId = $(this).data('video-id')
      var playerId = $(this).attr('id')

      player = new YT.Player(playerId, {
        height: videoHeight,
        width: videoWidth,
        videoId: videoId,
      })
    })
  }
})
