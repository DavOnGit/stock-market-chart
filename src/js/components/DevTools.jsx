import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import SliderMonitor from 'redux-slider-monitor'

export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-d"
    changePositionKey="ctrl-q"
    defaultPosition="left"
    // defaultSize={0.12}
    defaultIsVisible={false}
    changeMonitorKey="ctrl-m">
    <LogMonitor theme="nicinabox" />
    <SliderMonitor keyboardEnabled />
  </DockMonitor>
)
