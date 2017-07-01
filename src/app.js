const debug = require('debug')('strikethrough')
const $ = require('jquery')
const K_BACKSPACE = 8
const K_NEWLINE = 13

function run () {
  debug('starting editor.')

  const state = { text: [], stop: 0, backtrack: 20 }
  const editor = $('#editor')

  function update () {
    const content = 
      state.text.slice(0, state.stop).join('') + '<span class="drying">' +
      state.text.slice(state.stop, state.text.length).join('') + '</span>'

    editor.html(
      content +
      '<span id="cursor"><span class="invis">M</span></span>')
  }

  function backspace () {
    if (state.text.length <= state.stop) return
    state.text = state.text.slice(0, state.text.length - 1)
    update()
  }

  function to_string (key) {
    if (key === K_NEWLINE) return '<br />'
    return String.fromCharCode(key)
  }

  $(window).keypress((event) => {
    event.preventDefault()
    const key = event.which

    state.text.push(to_string(key))
    const new_stop = state.text.length - state.backtrack

    state.stop = Math.max(state.stop, new_stop)
    update()
  })

  $(window).keydown((event) => {
    if (event.which === K_BACKSPACE) { // if it's delete
      event.preventDefault()
      backspace()
    }
  })

  let night = false
  $('#night-mode').click(() => {
    night = !night
    
    $('#body').css('background-color', night ? '#111' : '#fff')
    $('#editor').css('color', night ? '#eee' : '#111')
    $('#night-mode').css('background-color', night ? '#fff' : '#111')
    $('.drying').css('color', night ? '#aaa' : '#888')
    $('#cursor').css('border-color', night ? '#fff' : '#111')
  })
}

window.onload = run
