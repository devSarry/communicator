export interface VoskSTTResult {
  result: VoskResultElement[];
  text:   string;
}

export interface VoskResultElement {
  conf:  number;
  end:   number;
  start: number;
  word:  string;
}


export interface VoskPartialResult {
  partial: string;
}
