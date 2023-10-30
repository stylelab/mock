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
function onYouTubePlayerAPIReady() {
  player = new YT.Player('player', {
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  })
}

function onPlayerReady(event) {
  let playButton = document.getElementById('play')
  let el = document.getElementsByClassName('videoWrapper')
  playButton.addEventListener('click', function () {
    player.playVideo()
    playButton.style.display = 'none'
    el[0].classList.add('pv')
  })
}

function onPlayerStateChange(e) {
  let playButton = document.getElementById('play')
  console.log(e)
  console.log(e.data)
  if (e.data == 0 || e.data == 2) {
    //0:停止 ,2:一時停止
    playButton.style.display = 'block'
  } else {
    playButton.style.display = 'none'
  }
}
