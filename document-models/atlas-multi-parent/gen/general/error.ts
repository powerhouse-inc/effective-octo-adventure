export type ErrorCode =
  | "ValidateThatNameIsNotNullOrAnEmptyString"
  | "ValidateThatContentIsNotNullOrEmpty"
  | "ValidateThatAtlasTypeMatchesAnAllowedEnum"
  | "OnlyAllowRemovalOfPhiDsThatCurrentlyExistInTheArray";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class ValidateThatNameIsNotNullOrAnEmptyString
  extends Error
  implements ReducerError
{
  errorCode = "ValidateThatNameIsNotNullOrAnEmptyString" as ErrorCode;
  constructor(message = "ValidateThatNameIsNotNullOrAnEmptyString") {
    super(message);
  }
}

export class ValidateThatContentIsNotNullOrEmpty
  extends Error
  implements ReducerError
{
  errorCode = "ValidateThatContentIsNotNullOrEmpty" as ErrorCode;
  constructor(message = "ValidateThatContentIsNotNullOrEmpty") {
    super(message);
  }
}

export class ValidateThatAtlasTypeMatchesAnAllowedEnum
  extends Error
  implements ReducerError
{
  errorCode = "ValidateThatAtlasTypeMatchesAnAllowedEnum" as ErrorCode;
  constructor(message = "ValidateThatAtlasTypeMatchesAnAllowedEnum") {
    super(message);
  }
}

export class OnlyAllowRemovalOfPhiDsThatCurrentlyExistInTheArray
  extends Error
  implements ReducerError
{
  errorCode =
    "OnlyAllowRemovalOfPhiDsThatCurrentlyExistInTheArray" as ErrorCode;
  constructor(message = "OnlyAllowRemovalOfPhiDsThatCurrentlyExistInTheArray") {
    super(message);
  }
}

export const errors = {
  SetName: {
    ValidateThatNameIsNotNullOrAnEmptyString,
  },
  SetContent: {
    ValidateThatContentIsNotNullOrEmpty,
  },
  SetAtlasType: {
    ValidateThatAtlasTypeMatchesAnAllowedEnum,
  },
  RemoveParent: {
    OnlyAllowRemovalOfPhiDsThatCurrentlyExistInTheArray,
  },
};
