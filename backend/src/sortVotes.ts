import { Submission as SubmissionModel } from '@prisma/client';

export function sortVotes(submissions: SubmissionModel[]) {
  let result = [];
  const length = submissions.length;
  for (let i = 0; i < length; i++) {
    let currentValue = 0;
    let currentPosition = 0;
    for (let j = 0; j < submissions.length; j++) {
      if (submissions[j].rating > currentValue) {
        currentValue = submissions[j].rating;
        currentPosition = j;
      }
    }
    result.push(submissions[currentPosition]);
    submissions.splice(currentPosition, 1);
  }

  return result;
}
