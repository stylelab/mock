/*
    YouTube動画を独自サムネイルと連動させる
*/

let tag = document.createElement('script')
tag.src = 'https://www.youtube.com/iframe_api'
let firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

let player
let players = []
let movieThumbs = null
function onYouTubePlayerAPIReady() {
  $('.yt_mv').each(function (index) {
    var id = this.id
    player = new YT.Player(id, {
      events: {
        //onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    })
    players.push(player)
  })

  //thumb参照取得＋イベント設定
  movieThumbs = $('.yt_mv_thumb')
  movieThumbs.each(function (index) {
    $(this).on('click', function () {
      onThmClick(index)
    })
  })
}

//再生
onThmClick = function (index) {
  players[index].playVideo()
}

//再生状態変化
onPlayerStateChange = function (e) {
  let movieID = e.target.g.id
  //movieIDと同じdata-link-idを持つボタンのプロパティを制御
  movieThumbs.each(function () {
    var btnID = $(this).data('mv-id')
    if (btnID == movieID) {
      if (e.data == 0 || e.data == 2) {
        //0:停止,２:一時停止
        $(this).show()
      } else {
        $(this).hide()
      }
    }
  })
}
