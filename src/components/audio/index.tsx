import { IconVolumeOff, IconVolumeOn } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface Prop {
  play: boolean
}

const Audio = ({play}:Prop) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = async () => {
    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error reproduciendo el audio:", error);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
   if(play) playAudio()
  }, [play])

  return (
    <Box
      display="flex"
      position="absolute"
      zIndex={99}
      bottom={0}
      right={0}
      padding={10}
    >
      <audio
        ref={audioRef}
        src="/assets/audio.mp3"
        preload="auto"
        autoPlay
        loop
      />

      <Box display="flex" alignItems="center" gap={2}>
        {!isPlaying ? (
          <button onClick={playAudio}>
            <IconVolumeOff size="30" />
          </button>
        ) : (
          <button onClick={pauseAudio}>
            <IconVolumeOn size="30"  />
          </button>
        )}
        
      </Box>
    </Box>
  );
};

export default Audio;
