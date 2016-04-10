'use strict'

const mutator = {
  delayCount: 0,
  frameCount: 0,
  rafCount: 0,
}

const domReady = () => {
  stReporter()
  requestAnimationFrame( onRaf )
  requestAnimationFrame( frameDelayer( 10 ) )
  requestAnimationFrame( frameCounter( performance.now() ) )
}

const stReporter = () => {
  const tic = performance.now()
  setTimeout( () => {
    console.log( `setTimeout Δ = ${ performance.now() - tic }` )
    setTimeout( stReporter, 0 )
  }, 0 )
}

const fpsChunk = 10
const frameCounter = tic => () => {
  mutator.frameCount += 1
  const count = mutator.frameCount

  if ( count > 0 && ! ( count % fpsChunk ) ) {
    const toc = performance.now()
    console.log( `${ fpsChunk / ( toc - tic ) * 1000 } fps` )
    return requestAnimationFrame( frameCounter( performance.now() ) )
  }

  requestAnimationFrame( frameCounter( tic ) )
}

const frameDelayer = ms => ( phantom = 0 ) => {
  mutator.delayCount += delayBy( ms )

  requestAnimationFrame( frameDelayer( ms ) )
}

const afterRaf = tic => {
  const toc = performance.now()

  console.log( `Δ = ${ toc - tic }` )

  setTimeout( () => {
    console.log( `Δ' = ${ performance.now() - toc }` )
  }, 0 )
}

const onRaf = () => {
  mutator.rafCount += 1
  const tic = performance.now()

  setTimeout( () => afterRaf( tic ), 0 )

  requestAnimationFrame( onRaf )
}

const delayBy = ms => {
  const tic = performance.now()
  let count = 0
  let toc = performance.now()

  while ( ( toc - tic ) < ms ) {
    count += 1
    toc = performance.now()
  }

  return count
}

document.addEventListener( 'DOMContentLoaded', domReady )
