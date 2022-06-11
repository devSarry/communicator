import styles from './output-text.module.css';
import {Box, Editable, EditableInput, EditablePreview, Text} from "@chakra-ui/react";
import "@fontsource/source-sans-pro";
import {useEffect, useRef} from "react";
import {VoskResultElement, VoskSTTResult} from "../../types/VoskServerTypes";

/* eslint-disable-next-line */
export interface OutputTextProps {
  text: VoskSTTResult[],
  partial?: string
}



const Word = (word: VoskResultElement) => {
  const r = Math.max(255 * (1 - word.conf) - 20, 0);

  const gAndB = Math.max((r^2 + 30), 255)

  const rgb = `rgb(${r},${gAndB},${gAndB})`

  return word.conf > 0.9 ? <span>{word.word}{" "}</span> : <span style={{color: rgb}}>{word.word}{" "}</span>
}

export function OutputText(props: OutputTextProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [props]);

  return (
    <Box textTransform={'uppercase'} fontWeight={900}
         fontSize={{base: '2em', lg: '3em'}}
         fontFamily={'"Source Sans Pro","Helvetica Neue", Arial, sans-serif'}
         minHeight={300} maxHeight={300} overflowY={'auto'}
         color={"white"}
         height={400}
         padding={5}
    >
      {props.text.map((resultUtterance, index) => resultUtterance.result.map(w => <Word key={`${index} ${w.start}`} {...w}/>) )}
      {props.partial}

      <div ref={bottomRef} />
    </Box>
  )

}

export default OutputText;
