import styles from './waveform.module.css';
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import SiriWave from "siriwave"; //Import this for typechecking and intellisense


/* eslint-disable-next-line */
export interface WaveformProps {
  audioStream: any;
}

export function Waveform(props: WaveformProps) {
  const canvasElm = useRef<HTMLCanvasElement | null>(null);
  //let [wave, setWave] = useState<Wave | null>(null);

  //let wavelib = new Wave();

  // useLayoutEffect(() => {
  //   const wave = new Wave(audioElement, canvasRef);
  //   setWave(wave);
  // },[])
  let x = 50;
  const y = 50;
  useEffect(() => {
    if (!canvasElm.current) return;

    // setWave(new Wave(props.audioStream, canvasElm.current));
    // canvasElm.current.style.width = '100%';
    // canvasElm.current.style.height = '100%';
    // canvasElm.current.width = canvasElm.current.offsetWidth;
    // canvasElm.current.height = canvasElm.current.offsetHeight;
    //
    //
    // wavelib.fromStream

  }, [props.audioStream]);


  return (
    <div className={styles['container']}>
      <h1>Welcome to Waveform!</h1>
      <canvas id="myCanvas" >Your browser does not support the HTML canvas tag. </canvas>

      {/*<div ref={canvasElm} style={{ width: "300px", height: "200px" }} />*/}
    </div>
  );
}

export default Waveform;
