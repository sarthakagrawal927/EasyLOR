import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type Department = {
  __typename?: 'Department';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Faculty = {
  __typename?: 'Faculty';
  id: Scalars['Int'];
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  department: Scalars['String'];
  institution: Scalars['String'];
  contact: Scalars['String'];
  profilePhoto: Scalars['String'];
  lorApplications?: Maybe<Array<Maybe<LorApplication>>>;
  lorDraftTemplates?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type LorApplication = {
  __typename?: 'LORApplication';
  id: Scalars['Int'];
  dueDate: Scalars['DateTime'];
  statementOfPurpose: Scalars['String'];
  course: Scalars['String'];
  university: Scalars['String'];
  draftURL?: Maybe<Scalars['String']>;
  studentID: Scalars['Int'];
  facultyID: Scalars['Int'];
  status: Status;
};

export type Query = {
  __typename?: 'Query';
  getDepartments?: Maybe<Array<Maybe<Department>>>;
};

export type Reminder = {
  __typename?: 'Reminder';
  id: Scalars['Int'];
  message: Scalars['String'];
  facultyID: Scalars['Int'];
  studentID: Scalars['Int'];
  viewed: Scalars['Boolean'];
};

export enum Status {
  Pending = 'PENDING',
  Granted = 'GRANTED',
  Rejected = 'REJECTED'
}

export type Student = {
  __typename?: 'Student';
  id: Scalars['Int'];
  regNo: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  department: Scalars['String'];
  institution: Scalars['String'];
  contact: Scalars['String'];
  profilePhoto: Scalars['String'];
  appliedUniversities?: Maybe<Array<Maybe<Scalars['String']>>>;
  acceptedUniversity?: Maybe<Scalars['String']>;
  testScores?: Maybe<Array<Maybe<TestScore>>>;
  lorApplications?: Maybe<Array<Maybe<LorApplication>>>;
  reminders?: Maybe<Array<Maybe<Reminder>>>;
};

export type TestScore = {
  __typename?: 'TestScore';
  id: Scalars['Int'];
  exam: Scalars['String'];
  score: Scalars['String'];
};




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  CacheControlScope: CacheControlScope;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Department: ResolverTypeWrapper<Department>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Faculty: ResolverTypeWrapper<Faculty>;
  LORApplication: ResolverTypeWrapper<LorApplication>;
  Query: ResolverTypeWrapper<{}>;
  Reminder: ResolverTypeWrapper<Reminder>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Status: Status;
  Student: ResolverTypeWrapper<Student>;
  TestScore: ResolverTypeWrapper<TestScore>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  DateTime: Scalars['DateTime'];
  Department: Department;
  Int: Scalars['Int'];
  String: Scalars['String'];
  Faculty: Faculty;
  LORApplication: LorApplication;
  Query: {};
  Reminder: Reminder;
  Boolean: Scalars['Boolean'];
  Student: Student;
  TestScore: TestScore;
  Upload: Scalars['Upload'];
};

export type CacheControlDirectiveArgs = {   maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DepartmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Department'] = ResolversParentTypes['Department']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FacultyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Faculty'] = ResolversParentTypes['Faculty']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  institution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contact?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profilePhoto?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lorApplications?: Resolver<Maybe<Array<Maybe<ResolversTypes['LORApplication']>>>, ParentType, ContextType>;
  lorDraftTemplates?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LorApplicationResolvers<ContextType = any, ParentType extends ResolversParentTypes['LORApplication'] = ResolversParentTypes['LORApplication']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  dueDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  statementOfPurpose?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  course?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  university?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  draftURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studentID?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  facultyID?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getDepartments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Department']>>>, ParentType, ContextType>;
};

export type ReminderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reminder'] = ResolversParentTypes['Reminder']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  facultyID?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  studentID?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  viewed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Student'] = ResolversParentTypes['Student']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  regNo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  institution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contact?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profilePhoto?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  appliedUniversities?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  acceptedUniversity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testScores?: Resolver<Maybe<Array<Maybe<ResolversTypes['TestScore']>>>, ParentType, ContextType>;
  lorApplications?: Resolver<Maybe<Array<Maybe<ResolversTypes['LORApplication']>>>, ParentType, ContextType>;
  reminders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reminder']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestScoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['TestScore'] = ResolversParentTypes['TestScore']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  exam?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  Department?: DepartmentResolvers<ContextType>;
  Faculty?: FacultyResolvers<ContextType>;
  LORApplication?: LorApplicationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reminder?: ReminderResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
  TestScore?: TestScoreResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;