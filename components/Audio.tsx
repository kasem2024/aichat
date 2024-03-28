// 'use client'

import { useRef, useState } from 'react'
import { PlayIcon, PauseIcon, Volume2, VolumeX } from 'lucide-react'
// { response }: { response: string; value: string }
const AudioPlayer = ({ response }: { response: string; value: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }
  const handleVolumeChange = (event:any) => {
    if (audioRef.current) {
      audioRef.current.volume = event.target.value
    }
  }
  // type = 'audio/mp3'

  return (
    <div className="bg-gray-800 p-3 rounded-md">
      <audio ref={audioRef} controls className="w-full">
        <source src={response} />
        Your browser does not support the audio element.
      </audio>

      <div className="flex items-center justify-between mt-3">
        <button onClick={togglePlay} className="text-white">
          {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
        </button>

        <div className="flex items-center">
          <button onClick={toggleMute} className="text-white mr-2">
            {isMuted ? <VolumeX /> : <Volume2 />}
          </button>
          <input
            type="range"
            className="appearance-none w-24 h-2 bg-gray-600 rounded-md"
            step="0.01"
            min="0"
            max="1"
            defaultValue="1"
            onChange={handleVolumeChange}
            disabled={isMuted}
          />
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
