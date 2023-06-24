import React from 'react'
import "./loadingscreen.css"
import { MoonLoader } from 'react-spinners'

const LoadingScreen = () => {
  return (
    <div className="loadingscreen">
        <MoonLoader color='#ffffff'></MoonLoader>
    </div>
  )
}

export default LoadingScreen