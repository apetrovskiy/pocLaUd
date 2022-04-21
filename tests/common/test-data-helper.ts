import { OpenCaseDto } from '../model/open-case-dto';

export const prepareOpenCaseData = async (
  fileName: string
): Promise<OpenCaseDto> => {
  // TODO:read test data file and fill in data
  const openCaseData: OpenCaseDto = {
    email: '',
    password: '',
    id: '',
    location: '',
    disputeNumber: '',
  };
  return openCaseData;
};
