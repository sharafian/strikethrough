const debug = require('debug')('strikethrough')
const $ = require('jquery')
const K_BACKSPACE = 8

function run () {
  debug('starting editor.')

  const state = { text: '', stop: 0, backtrack: 20 }
  const editor = $('#editor')

  function update () {
    const content = 
      state.text.slice(0, state.stop) + '<span class="drying">' +
      state.text.slice(state.stop, state.text.length) + '</span>'

    console.log(content)

    editor.html(
      content +
      '<span class="cursor"><span class="invis">M</span></span>')
  }

  function backspace () {
    if (state.text.length <= state.stop) return
    state.text = state.text.slice(0, state.text.length - 1)
    update()
  }

  $(window).keypress(function (event) {
    event.preventDefault()
    const key = event.which

    state.text += String.fromCharCode(key)
    state.stop = Math.max(
      state.stop,
      state.text.length - state.backtrack)
    update()
  })

  $(window).keydown(function (event) {
    if (event.which === K_BACKSPACE) { // if it's delete
      event.preventDefault()

      /*
      const selection = document.getSelection()
      console.log(selection)
      */

      backspace()
      /*
      if (!selection.anchorNode) {
        backspace()
        return
      }

      const range = selection.getRangeAt(0)
      debug('range is', range)

      if (range.startOffset === range.endOffset) {
        backspace()
        return
      }

      debug('striking through')
      state.text =
        state.text.slice(0, range.startOffset) + '<s>' +
        state.text.slice(range.startOffset, range.endOffset) + '</s>' +
        state.text.slice(range.endOffset, state.text.length)
      update()
      */
    }
  })
}

window.onload = run
