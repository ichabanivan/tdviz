import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type FindUserInput = {
  email: Scalars['String'];
  id: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser: Scalars['Boolean'];
  signIn: TokenDto;
  signUp: TokenDto;
  updateUser: User;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  input: Array<Scalars['Int']>;
};


export type MutationSignInArgs = {
  input: SignInInputDto;
};


export type MutationSignUpArgs = {
  input: SignUpInputDto;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  filterUsers: Array<User>;
  getUserById: User;
  test: Scalars['String'];
};


export type QueryFilterUsersArgs = {
  input: FindUserInput;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Float'];
};

export type SignInInputDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpInputDto = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type TokenDto = {
  __typename?: 'TokenDto';
  accessToken: Scalars['String'];
  accessTokenValiditySeconds: Scalars['Int'];
  refreshToken: Scalars['String'];
  refreshTokenValiditySeconds: Scalars['Int'];
};

export type UpdateUserInput = {
  email: Scalars['String'];
  id: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  enabled: Scalars['Boolean'];
  id: Scalars['Int'];
};

export type TokenFragment = { __typename?: 'TokenDto', accessToken: string, refreshToken: string, accessTokenValiditySeconds: number, refreshTokenValiditySeconds: number };

export type SignInMutationVariables = Exact<{
  input: SignInInputDto;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'TokenDto', accessToken: string, refreshToken: string, accessTokenValiditySeconds: number, refreshTokenValiditySeconds: number } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInputDto;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'TokenDto', accessToken: string, refreshToken: string, accessTokenValiditySeconds: number, refreshTokenValiditySeconds: number } };

export const TokenFragmentDoc = gql`
    fragment Token on TokenDto {
  accessToken
  refreshToken
  accessTokenValiditySeconds
  refreshTokenValiditySeconds
}
    `;
export const SignInDocument = gql`
    mutation SignIn($input: SignInInputDto!) {
  signIn(input: $input) {
    ...Token
  }
}
    ${TokenFragmentDoc}`;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInputDto!) {
  signUp(input: $input) {
    ...Token
  }
}
    ${TokenFragmentDoc}`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;