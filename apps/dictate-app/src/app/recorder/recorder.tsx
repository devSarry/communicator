import {Flex, IconButton} from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMicrophone, faMicrophoneSlash} from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from "react";
import Siriwave from "react-siriwave";
import OutputText from "../output-text/output-text";
import {VoskSTTResult} from "../../types/VoskServerTypes";
import {RecordRTCPromisesHandler, StereoAudioRecorder} from "recordrtc";

/* eslint-disable-next-line */
export interface RecorderProps {}

export function Recorder(props: RecorderProps) {
  const ws = new WebSocket('ws://localhost:2700');

  const [recorder, setRecorder] = useState<RecordRTCPromisesHandler>();
  const [stream, setSteam] = useState<MediaStream | null>();

  const [texResults, setTextResults] = useState<VoskSTTResult[]>([]);

  const [textResponse, setTextResponse] = useState<VoskSTTResult>();

  const [partialText, setPartialText] = useState('');

  ws.onmessage = e => {
    const res = JSON.parse(e.data);
    if(res.partial){
      setPartialText(res.partial);
    }

    if(res.result) {
      setTextResponse(res);
      setPartialText('')
    }
  }

  useEffect(() => {
    if (textResponse?.text) {
      setTextResults([...texResults, textResponse]);
    }

    console.log(textResponse)
  },[textResponse])

  const startRecording = async () => {
    const s = await navigator.mediaDevices.getUserMedia({audio: true});
    setSteam(s);

    const r = await new RecordRTCPromisesHandler(s, {
      type: 'audio',
      recorderType: StereoAudioRecorder,
      desiredSampRate: 8000,
      numberOfAudioChannels: 1,
      timeSlice: 500,
      // @ts-ignore
      ondataavailable: function(blob) {

        ws.send(blob)

      }
    })

    await r.startRecording();

    setRecorder(r);
  }

  const stopRecording = () => {

    if(recorder && stream) {

      console.log('stop')
      // @ts-ignore
      recorder.stopRecording( cb => {
        console.log(typeof cb);
        ws.send('{"eof" : 1}');
      })

      stream.getAudioTracks().map(t => t.stop())

      setSteam(null);
    }
  }

  const toggleRecord = async () => {
    if (stream) {
      return stopRecording()
    }

    await startRecording()
  }


  return (
    <Flex height="100vh" backgroundColor={'#264653'} alignItems={'center'} justifyContent={'space-around'} direction={'column'} >
      <OutputText text={texResults} partial={partialText}/>
      <Siriwave width={300}  speed={stream ? 0.09 : 0}  amplitude={stream ? 1.09 : 0}/>
      <IconButton onClick={toggleRecord} borderRadius={80} width={'140px'} height={'60px'} colorScheme={'red'} aria-label="Record button to start dicatation." icon={<FontAwesomeIcon fontSize={40} icon={stream ? faMicrophoneSlash : faMicrophone} />} />
    </Flex>
  );
}

export default Recorder;
