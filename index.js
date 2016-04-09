'use strict'

const domReady = () => {
  console.log( 'Calibrating at 23ms' )
  timed( () => delayBy( 23 ) )

  requestAnimationFrame( onRaf )
  requestAnimationFrame( frameDelayer( 500 ) )
}

const frameDelayer = ms => () => {
  delayBy( ms )

  requestAnimationFrame( frameDelayer( ms ) )
}

const afterRaf = tic => {
  sayDelay( tic )

  requestAnimationFrame( onRaf )
}

const onRaf = () => {
  const tic = performance.now()

  setTimeout( () => afterRaf( tic ) )
}

const sayDelay = tic => {
  const toc = performance.now()

  console.log( `Δ = ${ toc - tic }` )
}

const timed = fn => {
  const tic = performance.now()
  const val = fn()
  const toc = performance.now()

  console.log( `took ${ toc - tic } ms` )
  return val
}

const delayBy = ms => {
  const tic = performance.now()
  let toc = performance.now()

  while ( ( toc - tic ) < ms ) {
    toc = performance.now()
  }
}

document.addEventListener( 'DOMContentLoaded', domReady )
