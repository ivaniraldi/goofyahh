import { useEffect } from 'react';
import jesus from "../assets/jesus.gif";
import useSound from 'use-sound';
import gimme from "../assets/ABBA_Gimme.mp3";
import GuitarHero from './GuitarHero';

export default function Home() {
  const [play, { stop }] = useSound(gimme, { loop: true });

  useEffect(() => {
    play();

    return () => {
      stop();
    };
  }, [play, stop]);

  return (
    <div className="home_container h-screen flex justify-center">
      <div className=''>
        <div className='flex justify-center'>
        <img className=" w-1/2" src={jesus} alt="Jesus" />

        </div>
        <GuitarHero></GuitarHero>
      </div>
    </div>
  );
}
