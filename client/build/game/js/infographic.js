var infoGraphic = document.getElementById('infoGraphic');
var info = document.getElementById('info')

info.addEventListener('click', function () {
  console.log('clicked')
  if (infoGraphic.style.display === 'none') {
    infoGraphic.style.display = 'block'
  } else if (infoGraphic.style.display === 'block') {
    infoGraphic.style.display = 'none'
  }
})
