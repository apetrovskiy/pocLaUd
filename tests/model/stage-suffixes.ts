export enum StageSuffixes {
  first = 'a',
  second = 'b',
  third = 'c',
}

export const getDisputeFileName = (stage: StageSuffixes): string => {
  // TODO: to test data
  return '29STUD45011' + stage + '.xml';
};
