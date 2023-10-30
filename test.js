$(function () {
  //   $('.movie-thumb').on('click', function () {
  //     if ($('.sp-spacer').is(':visible')) {
  //       window.open(
  //         'https://www.youtube.com/embed/ZRCdORJiUgU?rel=0&autoplay=1',
  //         '_blank'
  //       )
  //     } else {
  //       videoControl('playVideo', $(this).prev('iframe'))
  //       $(this).hide()
  //     }
  //   })
  //   function videoControl(action, tgt) {
  //     var $playerWindow = $(tgt)[0].contentWindow
  //     $playerWindow.postMessage(
  //       '{"event":"command","func":"' + action + '","args":""}',
  //       '*'
  //     )
  //   }
  ////////
})

let tag = document.createElement('script')
tag.src = 'https://www.youtube.com/iframe_api'
let firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
let player

let players = []
let movieThumbs = null
function onYouTubePlayerAPIReady() {
  $('.youtube').each(function (index) {
    var id = this.id
    player = new YT.Player(id, {
      events: {
        //onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    })
    players.push(player)
  })

  //THM参照取得＋イベント設定
  movieThumbs = $('.movie-thumb')
  movieThumbs.each(function (index) {
    $(this).on('click', function () {
      onThmClick(index)
    })
  })
  //   var mp = new MyPlayer('player_01')
}

//再生
onThmClick = function (index) {
  console.log(index)
  players[index].playVideo()
}

//再生状態変化
onPlayerStateChange = function (e) {
  let targetMovieID = e.target.g.id

  //movieIdと同じdata-idを持つボタンを制御する
  movieThumbs.each(function () {
    var btnID = $(this).data('link-id')
    if (btnID == targetMovieID) {
      if (e.data == 0 || e.data == 2) {
        $(this).show()
      } else {
        $(this).hide()
      }
    }
  })
}

// let players = []
// function onYouTubePlayerAPIReady() {
//   player = new YT.Player('player_01', {
//     events: {
//       onReady: (function () {
//         onPlayerReady('play')
//       })(),
//       onStateChange: onPlayerStateChange,
//     },
//   })
//   //players.push(player)
// }

// //
// var MyPlayer = function (playerID) {
//   this.init(playerID)
// }
// MyPlayer.prototype = {
//   playButton: null,
//   player: null,
//   init: function (playerID) {
//     var self = this
//     this.player = new YT.Player(playerID, {
//       events: {
//         //onReady: this.onPlayerReady,
//         onReady: (function () {
//           self.onPlayerReady()
//         })(),
//         onStateChange: this.onPlayerStateChange,
//       },
//     })
//     this.playButton = $('#play')
//     this.playButton.on('click', function (self) {
//       //self.player.playVideo()
//     })
//   },
//   test: function (self) {
//     console.log(self)
//   },
//   onPlayerReady: function () {
//     var self = this
//     setTimeout(function () {
//       console.log(self.player)
//       self.player.playVideo()
//     }, 10)
//     //self.player.playVideo()
//     // this.player.playVideo()
//     // this.playButton.style.display = 'none'
//     // $(this.playButton).click = function () {
//     //   _this.player.playVideo()
//     //   //_this.playButton.style.display = 'none'
//     // }
//   },
//   onPlayerStateChange: function () {
//     console.log('BB')
//   },
// }

// function onPlayerReady(btnID) {
//   let playButton = document.getElementById(btnID)
//   playButton.addEventListener('click', function () {
//     players[0].playVideo()
//     playButton.style.display = 'none'
//   })
// }

function onPlayerStateChange(e) {
  //   let playButton = document.getElementById('play')
  //   console.log(e)
  //   console.log(e.data)
  //   if (e.data == 0 || e.data == 2) {
  //     //0:停止 ,2:一時停止
  //     playButton.style.display = 'block'
  //   } else {
  //     playButton.style.display = 'none'
  //   }
}
