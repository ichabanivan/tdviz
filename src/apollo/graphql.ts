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

export type CreatePermissionInputDto = {
  name: Scalars['String'];
};

export type CreateRoleInputDto = {
  name: Scalars['String'];
};

export type CreateUserInputDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type FilterPermissionsInputDto = {
  excludeIds?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['Int']>;
  includeIds?: InputMaybe<Array<Scalars['Int']>>;
};

export type FilterRolesInputDto = {
  excludeIds?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['Int']>;
  includeIds?: InputMaybe<Array<Scalars['Int']>>;
};

export type FilterUsersInputDto = {
  email?: InputMaybe<Scalars['String']>;
  excludeIds?: InputMaybe<Array<Scalars['Int']>>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  includeIds?: InputMaybe<Array<Scalars['Int']>>;
  lastName?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

export type HealthOutputDto = {
  __typename?: 'HealthOutputDto';
  appConnection: ServiceStatus;
  databaseConnection: ServiceStatus;
  internetConnection: ServiceStatus;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPermissionToRole: RoleEntity;
  createPermission: PermissionEntity;
  createRole: RoleEntity;
  createUser: UserEntity;
  deletePermissions: Scalars['Boolean'];
  deleteRoles: Scalars['Boolean'];
  deleteUsers: Scalars['Boolean'];
  removePermissionFromRole: RoleEntity;
  signIn: TokenOutputDto;
  signUp: TokenOutputDto;
  updatePermission: PermissionEntity;
  updateRole: RoleEntity;
  updateUser: UserEntity;
};


export type MutationAddPermissionToRoleArgs = {
  input: RolePermissionInputDto;
};


export type MutationCreatePermissionArgs = {
  input: CreatePermissionInputDto;
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInputDto;
};


export type MutationCreateUserArgs = {
  input: CreateUserInputDto;
};


export type MutationDeletePermissionsArgs = {
  input: Array<Scalars['Int']>;
};


export type MutationDeleteRolesArgs = {
  input: Array<Scalars['Int']>;
};


export type MutationDeleteUsersArgs = {
  input: Array<Scalars['Int']>;
};


export type MutationRemovePermissionFromRoleArgs = {
  input: RolePermissionInputDto;
};


export type MutationSignInArgs = {
  input: SignInInputDto;
};


export type MutationSignUpArgs = {
  input: SignUpInputDto;
};


export type MutationUpdatePermissionArgs = {
  input: UpdatePermissionInputDto;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInputDto;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInputDto;
};

export type PaginationInputDto = {
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<SortInputDto>>;
};

export type PaginationPermissionsOutputDto = {
  __typename?: 'PaginationPermissionsOutputDto';
  content: Array<PermissionEntity>;
  offset: Scalars['Int'];
  page: Scalars['Int'];
  size: Scalars['Int'];
  totalElements: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type PaginationRolesOutputDto = {
  __typename?: 'PaginationRolesOutputDto';
  content: Array<RoleEntity>;
  offset: Scalars['Int'];
  page: Scalars['Int'];
  size: Scalars['Int'];
  totalElements: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type PaginationUsersOutputDto = {
  __typename?: 'PaginationUsersOutputDto';
  content: Array<UserEntity>;
  offset: Scalars['Int'];
  page: Scalars['Int'];
  size: Scalars['Int'];
  totalElements: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type PermissionEntity = {
  __typename?: 'PermissionEntity';
  category: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  filterPermissions: PaginationPermissionsOutputDto;
  filterRoles: PaginationRolesOutputDto;
  filterUsers: PaginationUsersOutputDto;
  getPermission: PermissionEntity;
  getRole: RoleEntity;
  getUser: UserEntity;
  health: HealthOutputDto;
  me: UserEntity;
};


export type QueryFilterPermissionsArgs = {
  filter: FilterPermissionsInputDto;
  pagination: PaginationInputDto;
};


export type QueryFilterRolesArgs = {
  filter: FilterRolesInputDto;
  pagination: PaginationInputDto;
};


export type QueryFilterUsersArgs = {
  filter: FilterUsersInputDto;
  pagination: PaginationInputDto;
};


export type QueryGetPermissionArgs = {
  id: Scalars['Int'];
};


export type QueryGetRoleArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export type RoleEntity = {
  __typename?: 'RoleEntity';
  id: Scalars['Int'];
  name: Scalars['String'];
  permissions?: Maybe<Array<PermissionEntity>>;
};

export type RolePermissionInputDto = {
  permissionId: Scalars['Int'];
  roleId: Scalars['Int'];
};

export enum ServiceStatus {
  Down = 'DOWN',
  Up = 'UP'
}

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

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SortInputDto = {
  direction: SortDirection;
  field: Scalars['String'];
};

export type TokenOutputDto = {
  __typename?: 'TokenOutputDto';
  accessToken: Scalars['String'];
  accessTokenValiditySeconds: Scalars['Int'];
};

export type UpdatePermissionInputDto = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UpdateRoleInputDto = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UpdateUserInputDto = {
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lastName?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<RoleEntity>>;
  status?: Maybe<UserStatus>;
};

export enum UserStatus {
  Disabled = 'DISABLED',
  Enabled = 'ENABLED'
}

export type TokenFragment = { __typename?: 'TokenOutputDto', accessToken: string, accessTokenValiditySeconds: number };

export type SignInMutationVariables = Exact<{
  input: SignInInputDto;
}>;


export type SignInMutation = { __typename?: 'Mutation', data: { __typename?: 'TokenOutputDto', accessToken: string, accessTokenValiditySeconds: number } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInputDto;
}>;


export type SignUpMutation = { __typename?: 'Mutation', data: { __typename?: 'TokenOutputDto', accessToken: string, accessTokenValiditySeconds: number } };

export type FullPermissionEntityFragment = { __typename?: 'PermissionEntity', id: number, name: string, category: string };

export type FullPaginationPermissionsOutputDtoFragment = { __typename?: 'PaginationPermissionsOutputDto', offset: number, page: number, size: number, totalElements: number, totalPages: number, content: Array<{ __typename?: 'PermissionEntity', id: number, name: string, category: string }> };

export type DeletePermissionsMutationVariables = Exact<{
  input: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeletePermissionsMutation = { __typename?: 'Mutation', deletePermissions: boolean };

export type FilterPermissionsQueryVariables = Exact<{
  filter: FilterPermissionsInputDto;
  pagination: PaginationInputDto;
}>;


export type FilterPermissionsQuery = { __typename?: 'Query', permissions: { __typename?: 'PaginationPermissionsOutputDto', offset: number, page: number, size: number, totalElements: number, totalPages: number, content: Array<{ __typename?: 'PermissionEntity', id: number, name: string, category: string }> } };

export type FullRoleEntityFragment = { __typename?: 'RoleEntity', id: number, name: string, permissions?: Array<{ __typename?: 'PermissionEntity', id: number, name: string, category: string }> | null };

export type FullPaginationRolesOutputDtoFragment = { __typename?: 'PaginationRolesOutputDto', offset: number, page: number, size: number, totalElements: number, totalPages: number, content: Array<{ __typename?: 'RoleEntity', id: number, name: string, permissions?: Array<{ __typename?: 'PermissionEntity', id: number, name: string, category: string }> | null }> };

export type DeleteRolesMutationVariables = Exact<{
  input: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeleteRolesMutation = { __typename?: 'Mutation', deleteRoles: boolean };

export type CreateRoleMutationVariables = Exact<{
  input: CreateRoleInputDto;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', role: { __typename?: 'RoleEntity', id: number, name: string, permissions?: Array<{ __typename?: 'PermissionEntity', id: number, name: string, category: string }> | null } };

export type UpdateRoleMutationVariables = Exact<{
  input: UpdateRoleInputDto;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', role: { __typename?: 'RoleEntity', id: number, name: string, permissions?: Array<{ __typename?: 'PermissionEntity', id: number, name: string, category: string }> | null } };

export type AddPermissionToRoleMutationVariables = Exact<{
  input: RolePermissionInputDto;
}>;


export type AddPermissionToRoleMutation = { __typename?: 'Mutation', role: { __typename?: 'RoleEntity', id: number, name: string, permissions?: Array<{ __typename?: 'PermissionEntity', id: number, name: string, category: string }> | null } };

export type RemovePermissionFromRoleMutationVariables = Exact<{
  input: RolePermissionInputDto;
}>;


export type RemovePermissionFromRoleMutation = { __typename?: 'Mutation', role: { __typename?: 'RoleEntity', id: number, name: string, permissions?: Array<{ __typename?: 'PermissionEntity', id: number, name: string, category: string }> | null } };

export type FilterRolesQueryVariables = Exact<{
  filter: FilterRolesInputDto;
  pagination: PaginationInputDto;
}>;


export type FilterRolesQuery = { __typename?: 'Query', roles: { __typename?: 'PaginationRolesOutputDto', offset: number, page: number, size: number, totalElements: number, totalPages: number, content: Array<{ __typename?: 'RoleEntity', id: number, name: string, permissions?: Array<{ __typename?: 'PermissionEntity', id: number, name: string, category: string }> | null }> } };

export type GetRoleQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetRoleQuery = { __typename?: 'Query', role: { __typename?: 'RoleEntity', id: number, name: string, permissions?: Array<{ __typename?: 'PermissionEntity', id: number, name: string, category: string }> | null } };

export type FilterRolesPermissionsQueryVariables = Exact<{
  filterRoles: FilterRolesInputDto;
  pagination: PaginationInputDto;
  filterPermissions: FilterPermissionsInputDto;
}>;


export type FilterRolesPermissionsQuery = { __typename?: 'Query', roles: { __typename?: 'PaginationRolesOutputDto', offset: number, page: number, size: number, totalElements: number, totalPages: number, content: Array<{ __typename?: 'RoleEntity', id: number, name: string, permissions?: Array<{ __typename?: 'PermissionEntity', id: number, name: string, category: string }> | null }> }, permissions: { __typename?: 'PaginationPermissionsOutputDto', offset: number, page: number, size: number, totalElements: number, totalPages: number, content: Array<{ __typename?: 'PermissionEntity', id: number, name: string, category: string }> } };

export type FullHealthOutputDtoFragment = { __typename?: 'HealthOutputDto', appConnection: ServiceStatus, databaseConnection: ServiceStatus, internetConnection: ServiceStatus };

export type HealthQueryVariables = Exact<{ [key: string]: never; }>;


export type HealthQuery = { __typename?: 'Query', health: { __typename?: 'HealthOutputDto', appConnection: ServiceStatus, databaseConnection: ServiceStatus, internetConnection: ServiceStatus } };

export type FullUserEntityFragment = { __typename?: 'UserEntity', id: number, email: string, status?: UserStatus | null, firstName?: string | null, lastName?: string | null, roles?: Array<{ __typename?: 'RoleEntity', id: number, name: string, permissions?: Array<{ __typename?: 'PermissionEntity', id: number, name: string, category: string }> | null }> | null };

export type FullPaginationUsersOutputDtoFragment = { __typename?: 'PaginationUsersOutputDto', offset: number, page: number, size: number, totalElements: number, totalPages: number, content: Array<{ __typename?: 'UserEntity', id: number, email: string, status?: UserStatus | null, firstName?: string | null, lastName?: string | null, roles?: Array<{ __typename?: 'RoleEntity', id: number, name: string, permissions?: Array<{ __typename?: 'PermissionEntity', id: number, name: string, category: string }> | null }> | null }> };

export type DeleteUsersMutationVariables = Exact<{
  input: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeleteUsersMutation = { __typename?: 'Mutation', deleteUsers: boolean };

export type FilterUsersQueryVariables = Exact<{
  filter: FilterUsersInputDto;
  pagination: PaginationInputDto;
}>;


export type FilterUsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginationUsersOutputDto', offset: number, page: number, size: number, totalElements: number, totalPages: number, content: Array<{ __typename?: 'UserEntity', id: number, email: string, status?: UserStatus | null, firstName?: string | null, lastName?: string | null, roles?: Array<{ __typename?: 'RoleEntity', id: number, name: string, permissions?: Array<{ __typename?: 'PermissionEntity', id: number, name: string, category: string }> | null }> | null }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserEntity', id: number, email: string, status?: UserStatus | null, firstName?: string | null, lastName?: string | null, roles?: Array<{ __typename?: 'RoleEntity', id: number, name: string, permissions?: Array<{ __typename?: 'PermissionEntity', id: number, name: string, category: string }> | null }> | null } };

export const TokenFragmentDoc = gql`
    fragment Token on TokenOutputDto {
  accessToken
  accessTokenValiditySeconds
}
    `;
export const FullPermissionEntityFragmentDoc = gql`
    fragment FullPermissionEntity on PermissionEntity {
  id
  name
  category
}
    `;
export const FullPaginationPermissionsOutputDtoFragmentDoc = gql`
    fragment FullPaginationPermissionsOutputDto on PaginationPermissionsOutputDto {
  content {
    ...FullPermissionEntity
  }
  offset
  page
  size
  totalElements
  totalPages
}
    ${FullPermissionEntityFragmentDoc}`;
export const FullRoleEntityFragmentDoc = gql`
    fragment FullRoleEntity on RoleEntity {
  id
  name
  permissions {
    ...FullPermissionEntity
  }
}
    ${FullPermissionEntityFragmentDoc}`;
export const FullPaginationRolesOutputDtoFragmentDoc = gql`
    fragment FullPaginationRolesOutputDto on PaginationRolesOutputDto {
  content {
    ...FullRoleEntity
  }
  offset
  page
  size
  totalElements
  totalPages
}
    ${FullRoleEntityFragmentDoc}`;
export const FullHealthOutputDtoFragmentDoc = gql`
    fragment FullHealthOutputDto on HealthOutputDto {
  appConnection
  databaseConnection
  internetConnection
}
    `;
export const FullUserEntityFragmentDoc = gql`
    fragment FullUserEntity on UserEntity {
  id
  email
  status
  firstName
  lastName
  roles {
    ...FullRoleEntity
  }
}
    ${FullRoleEntityFragmentDoc}`;
export const FullPaginationUsersOutputDtoFragmentDoc = gql`
    fragment FullPaginationUsersOutputDto on PaginationUsersOutputDto {
  content {
    ...FullUserEntity
  }
  offset
  page
  size
  totalElements
  totalPages
}
    ${FullUserEntityFragmentDoc}`;
export const SignInDocument = gql`
    mutation SignIn($input: SignInInputDto!) {
  data: signIn(input: $input) {
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
  data: signUp(input: $input) {
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
export const DeletePermissionsDocument = gql`
    mutation DeletePermissions($input: [Int!]!) {
  deletePermissions(input: $input)
}
    `;
export type DeletePermissionsMutationFn = Apollo.MutationFunction<DeletePermissionsMutation, DeletePermissionsMutationVariables>;

/**
 * __useDeletePermissionsMutation__
 *
 * To run a mutation, you first call `useDeletePermissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePermissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePermissionsMutation, { data, loading, error }] = useDeletePermissionsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePermissionsMutation(baseOptions?: Apollo.MutationHookOptions<DeletePermissionsMutation, DeletePermissionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePermissionsMutation, DeletePermissionsMutationVariables>(DeletePermissionsDocument, options);
      }
export type DeletePermissionsMutationHookResult = ReturnType<typeof useDeletePermissionsMutation>;
export type DeletePermissionsMutationResult = Apollo.MutationResult<DeletePermissionsMutation>;
export type DeletePermissionsMutationOptions = Apollo.BaseMutationOptions<DeletePermissionsMutation, DeletePermissionsMutationVariables>;
export const FilterPermissionsDocument = gql`
    query FilterPermissions($filter: FilterPermissionsInputDto!, $pagination: PaginationInputDto!) {
  permissions: filterPermissions(filter: $filter, pagination: $pagination) {
    ...FullPaginationPermissionsOutputDto
  }
}
    ${FullPaginationPermissionsOutputDtoFragmentDoc}`;

/**
 * __useFilterPermissionsQuery__
 *
 * To run a query within a React component, call `useFilterPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterPermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterPermissionsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFilterPermissionsQuery(baseOptions: Apollo.QueryHookOptions<FilterPermissionsQuery, FilterPermissionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilterPermissionsQuery, FilterPermissionsQueryVariables>(FilterPermissionsDocument, options);
      }
export function useFilterPermissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilterPermissionsQuery, FilterPermissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilterPermissionsQuery, FilterPermissionsQueryVariables>(FilterPermissionsDocument, options);
        }
export type FilterPermissionsQueryHookResult = ReturnType<typeof useFilterPermissionsQuery>;
export type FilterPermissionsLazyQueryHookResult = ReturnType<typeof useFilterPermissionsLazyQuery>;
export type FilterPermissionsQueryResult = Apollo.QueryResult<FilterPermissionsQuery, FilterPermissionsQueryVariables>;
export const DeleteRolesDocument = gql`
    mutation DeleteRoles($input: [Int!]!) {
  deleteRoles(input: $input)
}
    `;
export type DeleteRolesMutationFn = Apollo.MutationFunction<DeleteRolesMutation, DeleteRolesMutationVariables>;

/**
 * __useDeleteRolesMutation__
 *
 * To run a mutation, you first call `useDeleteRolesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRolesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRolesMutation, { data, loading, error }] = useDeleteRolesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteRolesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRolesMutation, DeleteRolesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRolesMutation, DeleteRolesMutationVariables>(DeleteRolesDocument, options);
      }
export type DeleteRolesMutationHookResult = ReturnType<typeof useDeleteRolesMutation>;
export type DeleteRolesMutationResult = Apollo.MutationResult<DeleteRolesMutation>;
export type DeleteRolesMutationOptions = Apollo.BaseMutationOptions<DeleteRolesMutation, DeleteRolesMutationVariables>;
export const CreateRoleDocument = gql`
    mutation CreateRole($input: CreateRoleInputDto!) {
  role: createRole(input: $input) {
    ...FullRoleEntity
  }
}
    ${FullRoleEntityFragmentDoc}`;
export type CreateRoleMutationFn = Apollo.MutationFunction<CreateRoleMutation, CreateRoleMutationVariables>;

/**
 * __useCreateRoleMutation__
 *
 * To run a mutation, you first call `useCreateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoleMutation, { data, loading, error }] = useCreateRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoleMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoleMutation, CreateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoleMutation, CreateRoleMutationVariables>(CreateRoleDocument, options);
      }
export type CreateRoleMutationHookResult = ReturnType<typeof useCreateRoleMutation>;
export type CreateRoleMutationResult = Apollo.MutationResult<CreateRoleMutation>;
export type CreateRoleMutationOptions = Apollo.BaseMutationOptions<CreateRoleMutation, CreateRoleMutationVariables>;
export const UpdateRoleDocument = gql`
    mutation UpdateRole($input: UpdateRoleInputDto!) {
  role: updateRole(input: $input) {
    ...FullRoleEntity
  }
}
    ${FullRoleEntityFragmentDoc}`;
export type UpdateRoleMutationFn = Apollo.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, options);
      }
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>;
export type UpdateRoleMutationResult = Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const AddPermissionToRoleDocument = gql`
    mutation addPermissionToRole($input: RolePermissionInputDto!) {
  role: addPermissionToRole(input: $input) {
    ...FullRoleEntity
  }
}
    ${FullRoleEntityFragmentDoc}`;
export type AddPermissionToRoleMutationFn = Apollo.MutationFunction<AddPermissionToRoleMutation, AddPermissionToRoleMutationVariables>;

/**
 * __useAddPermissionToRoleMutation__
 *
 * To run a mutation, you first call `useAddPermissionToRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPermissionToRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPermissionToRoleMutation, { data, loading, error }] = useAddPermissionToRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddPermissionToRoleMutation(baseOptions?: Apollo.MutationHookOptions<AddPermissionToRoleMutation, AddPermissionToRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPermissionToRoleMutation, AddPermissionToRoleMutationVariables>(AddPermissionToRoleDocument, options);
      }
export type AddPermissionToRoleMutationHookResult = ReturnType<typeof useAddPermissionToRoleMutation>;
export type AddPermissionToRoleMutationResult = Apollo.MutationResult<AddPermissionToRoleMutation>;
export type AddPermissionToRoleMutationOptions = Apollo.BaseMutationOptions<AddPermissionToRoleMutation, AddPermissionToRoleMutationVariables>;
export const RemovePermissionFromRoleDocument = gql`
    mutation RemovePermissionFromRole($input: RolePermissionInputDto!) {
  role: removePermissionFromRole(input: $input) {
    ...FullRoleEntity
  }
}
    ${FullRoleEntityFragmentDoc}`;
export type RemovePermissionFromRoleMutationFn = Apollo.MutationFunction<RemovePermissionFromRoleMutation, RemovePermissionFromRoleMutationVariables>;

/**
 * __useRemovePermissionFromRoleMutation__
 *
 * To run a mutation, you first call `useRemovePermissionFromRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePermissionFromRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePermissionFromRoleMutation, { data, loading, error }] = useRemovePermissionFromRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemovePermissionFromRoleMutation(baseOptions?: Apollo.MutationHookOptions<RemovePermissionFromRoleMutation, RemovePermissionFromRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePermissionFromRoleMutation, RemovePermissionFromRoleMutationVariables>(RemovePermissionFromRoleDocument, options);
      }
export type RemovePermissionFromRoleMutationHookResult = ReturnType<typeof useRemovePermissionFromRoleMutation>;
export type RemovePermissionFromRoleMutationResult = Apollo.MutationResult<RemovePermissionFromRoleMutation>;
export type RemovePermissionFromRoleMutationOptions = Apollo.BaseMutationOptions<RemovePermissionFromRoleMutation, RemovePermissionFromRoleMutationVariables>;
export const FilterRolesDocument = gql`
    query FilterRoles($filter: FilterRolesInputDto!, $pagination: PaginationInputDto!) {
  roles: filterRoles(filter: $filter, pagination: $pagination) {
    ...FullPaginationRolesOutputDto
  }
}
    ${FullPaginationRolesOutputDtoFragmentDoc}`;

/**
 * __useFilterRolesQuery__
 *
 * To run a query within a React component, call `useFilterRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterRolesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFilterRolesQuery(baseOptions: Apollo.QueryHookOptions<FilterRolesQuery, FilterRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilterRolesQuery, FilterRolesQueryVariables>(FilterRolesDocument, options);
      }
export function useFilterRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilterRolesQuery, FilterRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilterRolesQuery, FilterRolesQueryVariables>(FilterRolesDocument, options);
        }
export type FilterRolesQueryHookResult = ReturnType<typeof useFilterRolesQuery>;
export type FilterRolesLazyQueryHookResult = ReturnType<typeof useFilterRolesLazyQuery>;
export type FilterRolesQueryResult = Apollo.QueryResult<FilterRolesQuery, FilterRolesQueryVariables>;
export const GetRoleDocument = gql`
    query GetRole($id: Int!) {
  role: getRole(id: $id) {
    ...FullRoleEntity
  }
}
    ${FullRoleEntityFragmentDoc}`;

/**
 * __useGetRoleQuery__
 *
 * To run a query within a React component, call `useGetRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRoleQuery(baseOptions: Apollo.QueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
      }
export function useGetRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
        }
export type GetRoleQueryHookResult = ReturnType<typeof useGetRoleQuery>;
export type GetRoleLazyQueryHookResult = ReturnType<typeof useGetRoleLazyQuery>;
export type GetRoleQueryResult = Apollo.QueryResult<GetRoleQuery, GetRoleQueryVariables>;
export const FilterRolesPermissionsDocument = gql`
    query FilterRolesPermissions($filterRoles: FilterRolesInputDto!, $pagination: PaginationInputDto!, $filterPermissions: FilterPermissionsInputDto!) {
  roles: filterRoles(filter: $filterRoles, pagination: $pagination) {
    ...FullPaginationRolesOutputDto
  }
  permissions: filterPermissions(
    filter: $filterPermissions
    pagination: $pagination
  ) {
    ...FullPaginationPermissionsOutputDto
  }
}
    ${FullPaginationRolesOutputDtoFragmentDoc}
${FullPaginationPermissionsOutputDtoFragmentDoc}`;

/**
 * __useFilterRolesPermissionsQuery__
 *
 * To run a query within a React component, call `useFilterRolesPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterRolesPermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterRolesPermissionsQuery({
 *   variables: {
 *      filterRoles: // value for 'filterRoles'
 *      pagination: // value for 'pagination'
 *      filterPermissions: // value for 'filterPermissions'
 *   },
 * });
 */
export function useFilterRolesPermissionsQuery(baseOptions: Apollo.QueryHookOptions<FilterRolesPermissionsQuery, FilterRolesPermissionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilterRolesPermissionsQuery, FilterRolesPermissionsQueryVariables>(FilterRolesPermissionsDocument, options);
      }
export function useFilterRolesPermissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilterRolesPermissionsQuery, FilterRolesPermissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilterRolesPermissionsQuery, FilterRolesPermissionsQueryVariables>(FilterRolesPermissionsDocument, options);
        }
export type FilterRolesPermissionsQueryHookResult = ReturnType<typeof useFilterRolesPermissionsQuery>;
export type FilterRolesPermissionsLazyQueryHookResult = ReturnType<typeof useFilterRolesPermissionsLazyQuery>;
export type FilterRolesPermissionsQueryResult = Apollo.QueryResult<FilterRolesPermissionsQuery, FilterRolesPermissionsQueryVariables>;
export const HealthDocument = gql`
    query Health {
  health {
    ...FullHealthOutputDto
  }
}
    ${FullHealthOutputDtoFragmentDoc}`;

/**
 * __useHealthQuery__
 *
 * To run a query within a React component, call `useHealthQuery` and pass it any options that fit your needs.
 * When your component renders, `useHealthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHealthQuery({
 *   variables: {
 *   },
 * });
 */
export function useHealthQuery(baseOptions?: Apollo.QueryHookOptions<HealthQuery, HealthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HealthQuery, HealthQueryVariables>(HealthDocument, options);
      }
export function useHealthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HealthQuery, HealthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HealthQuery, HealthQueryVariables>(HealthDocument, options);
        }
export type HealthQueryHookResult = ReturnType<typeof useHealthQuery>;
export type HealthLazyQueryHookResult = ReturnType<typeof useHealthLazyQuery>;
export type HealthQueryResult = Apollo.QueryResult<HealthQuery, HealthQueryVariables>;
export const DeleteUsersDocument = gql`
    mutation DeleteUsers($input: [Int!]!) {
  deleteUsers(input: $input)
}
    `;
export type DeleteUsersMutationFn = Apollo.MutationFunction<DeleteUsersMutation, DeleteUsersMutationVariables>;

/**
 * __useDeleteUsersMutation__
 *
 * To run a mutation, you first call `useDeleteUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUsersMutation, { data, loading, error }] = useDeleteUsersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUsersMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUsersMutation, DeleteUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUsersMutation, DeleteUsersMutationVariables>(DeleteUsersDocument, options);
      }
export type DeleteUsersMutationHookResult = ReturnType<typeof useDeleteUsersMutation>;
export type DeleteUsersMutationResult = Apollo.MutationResult<DeleteUsersMutation>;
export type DeleteUsersMutationOptions = Apollo.BaseMutationOptions<DeleteUsersMutation, DeleteUsersMutationVariables>;
export const FilterUsersDocument = gql`
    query FilterUsers($filter: FilterUsersInputDto!, $pagination: PaginationInputDto!) {
  users: filterUsers(filter: $filter, pagination: $pagination) {
    ...FullPaginationUsersOutputDto
  }
}
    ${FullPaginationUsersOutputDtoFragmentDoc}`;

/**
 * __useFilterUsersQuery__
 *
 * To run a query within a React component, call `useFilterUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterUsersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFilterUsersQuery(baseOptions: Apollo.QueryHookOptions<FilterUsersQuery, FilterUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilterUsersQuery, FilterUsersQueryVariables>(FilterUsersDocument, options);
      }
export function useFilterUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilterUsersQuery, FilterUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilterUsersQuery, FilterUsersQueryVariables>(FilterUsersDocument, options);
        }
export type FilterUsersQueryHookResult = ReturnType<typeof useFilterUsersQuery>;
export type FilterUsersLazyQueryHookResult = ReturnType<typeof useFilterUsersLazyQuery>;
export type FilterUsersQueryResult = Apollo.QueryResult<FilterUsersQuery, FilterUsersQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...FullUserEntity
  }
}
    ${FullUserEntityFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;