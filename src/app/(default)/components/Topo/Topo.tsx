'use client'
import { useCallback, useEffect } from 'react'
import { RouteInfo, clearProject, drawTopo, initPaper, zoomViaWheel } from './paperFunctions'
import clx from 'classnames'

interface TopoProps {
  activeRoute: RouteInfo | undefined
  image: any
  data: string | undefined
  isEditor: boolean
}

export const Topo: React.FC<TopoProps> = ({ activeRoute, image, data, isEditor }) => {
  const canvasCallback = useCallback((node: HTMLCanvasElement) => {
    if (node !== null) {
      console.log('callback')
      node.addEventListener('wheel', (e: WheelEvent) => { zoomViaWheel(e) }, { passive: false })
      initPaper(node, isEditor)
      //drawTopo(image, data)
    }
  }, [])

  useEffect(() => {
    console.log('use effect')
    clearProject()
    drawTopo(image, data)
  }, [image, data])

  return (
    <canvas className={clx('w-full border-solid border-2 border-gray-300 rounded', isEditor ? 'h-screen-80' : 'h-screen-[40]')} ref={canvasCallback} />
  )
}
