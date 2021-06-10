import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreateLorApplicationInput = {
  dueDate: Scalars['DateTime'];
  statementOfPurpose: Scalars['String'];
  course: Scalars['String'];
  university: Scalars['String'];
  draftURL?: Maybe<Scalars['String']>;
  studentID: Scalars['String'];
  facultyID: Scalars['String'];
};

export type CreateReminderInput = {
  message: Scalars['String'];
  facultyID: Scalars['String'];
  studentID: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  departmentID: Scalars['String'];
  institution: Scalars['String'];
  contact: Scalars['String'];
  profilePhoto: Scalars['String'];
  regNo?: Maybe<Scalars['String']>;
  userType: UserType;
};


export type Department = {
  __typename?: 'Department';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Faculty = {
  __typename?: 'Faculty';
  user: User;
  lorApplications: Array<Maybe<LorApplication>>;
  lorDraftTemplates: Array<Maybe<Scalars['String']>>;
  reminders: Array<Maybe<Reminder>>;
};

export type LorApplication = {
  __typename?: 'LORApplication';
  id: Scalars['String'];
  dueDate: Scalars['DateTime'];
  statementOfPurpose: Scalars['String'];
  course: Scalars['String'];
  university: Scalars['String'];
  draftURL?: Maybe<Scalars['String']>;
  studentID: Scalars['String'];
  facultyID: Scalars['String'];
  status: Status;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  loginUser: UserReturn;
  createUser: UserReturn;
  createLORApplication: LorApplication;
  createReminder: Reminder;
  updateLORApplication: LorApplication;
  updateReminder: Reminder;
  updateStudent: Student;
  deleteLORApplication: LorApplication;
  deleteReminder: Reminder;
};


export type MutationLoginUserArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationCreateLorApplicationArgs = {
  createLORApplicationInput: CreateLorApplicationInput;
};


export type MutationCreateReminderArgs = {
  createReminderInput: CreateReminderInput;
};


export type MutationUpdateLorApplicationArgs = {
  updateLORApplicationInput: UpdateLorApplicationInput;
};


export type MutationUpdateReminderArgs = {
  updateReminderInput: UpdateReminderInput;
};


export type MutationUpdateStudentArgs = {
  updateStudentInput: UpdateStudentInput;
};


export type MutationDeleteLorApplicationArgs = {
  id: Scalars['String'];
};


export type MutationDeleteReminderArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getDepartments: Array<Maybe<Department>>;
  getFaculties: Array<Maybe<Faculty>>;
  getApplicationsByFacultyID: Array<Maybe<LorApplication>>;
  getStudentByUserID?: Maybe<Student>;
  getFacultyByUserID?: Maybe<Faculty>;
  getPastApplicationsByFacultyID: Array<Maybe<Student>>;
};


export type QueryGetStudentByUserIdArgs = {
  id: Scalars['String'];
};


export type QueryGetFacultyByUserIdArgs = {
  id: Scalars['String'];
};


export type QueryGetPastApplicationsByFacultyIdArgs = {
  id: Scalars['String'];
};

export type Reminder = {
  __typename?: 'Reminder';
  id: Scalars['String'];
  message: Scalars['String'];
  facultyID: Scalars['String'];
  studentID: Scalars['String'];
  viewed: Scalars['Boolean'];
};

export type Status =
  | 'PENDING'
  | 'GRANTED'
  | 'REJECTED';

export type Student = {
  __typename?: 'Student';
  user: User;
  regNo: Scalars['String'];
  appliedUniversities: Array<Maybe<Scalars['String']>>;
  acceptedUniversity?: Maybe<Scalars['String']>;
  testScores: Array<Maybe<TestScore>>;
  lorApplications: Array<Maybe<LorApplication>>;
  reminders: Array<Maybe<Reminder>>;
};

export type TestScore = {
  __typename?: 'TestScore';
  id: Scalars['String'];
  exam: Scalars['String'];
  score: Scalars['String'];
};

export type TestScoreInput = {
  exam: Scalars['String'];
  score: Scalars['String'];
};

export type UpdateLorApplicationInput = {
  id: Scalars['String'];
  dueDate?: Maybe<Scalars['DateTime']>;
  statementOfPurpose?: Maybe<Scalars['String']>;
  course?: Maybe<Scalars['String']>;
  university?: Maybe<Scalars['String']>;
  draftURL?: Maybe<Scalars['String']>;
  status?: Maybe<Status>;
};

export type UpdateReminderInput = {
  id: Scalars['String'];
  message?: Maybe<Scalars['String']>;
  viewed?: Maybe<Scalars['Boolean']>;
};

export type UpdateStudentInput = {
  id: Scalars['String'];
  appliedUniversities?: Maybe<Array<Scalars['String']>>;
  acceptedUniversity?: Maybe<Scalars['String']>;
  testScores?: Maybe<Array<TestScoreInput>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  department: Department;
  institution: Scalars['String'];
  contact: Scalars['String'];
  profilePhoto: Scalars['String'];
  userType: UserType;
};

export type UserReturn = {
  __typename?: 'UserReturn';
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  department: Department;
  institution: Scalars['String'];
  contact: Scalars['String'];
  profilePhoto: Scalars['String'];
  userType: UserType;
  token: Scalars['String'];
};

export type UserType =
  | 'STUDENT'
  | 'FACULTY';



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
  CreateLORApplicationInput: CreateLorApplicationInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  CreateReminderInput: CreateReminderInput;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Department: ResolverTypeWrapper<Department>;
  Faculty: ResolverTypeWrapper<Faculty>;
  LORApplication: ResolverTypeWrapper<LorApplication>;
  LoginUserInput: LoginUserInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Reminder: ResolverTypeWrapper<Reminder>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Status: Status;
  Student: ResolverTypeWrapper<Student>;
  TestScore: ResolverTypeWrapper<TestScore>;
  TestScoreInput: TestScoreInput;
  UpdateLORApplicationInput: UpdateLorApplicationInput;
  UpdateReminderInput: UpdateReminderInput;
  UpdateStudentInput: UpdateStudentInput;
  User: ResolverTypeWrapper<User>;
  UserReturn: ResolverTypeWrapper<UserReturn>;
  UserType: UserType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  CreateLORApplicationInput: CreateLorApplicationInput;
  String: Scalars['String'];
  CreateReminderInput: CreateReminderInput;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime'];
  Department: Department;
  Faculty: Faculty;
  LORApplication: LorApplication;
  LoginUserInput: LoginUserInput;
  Mutation: {};
  Query: {};
  Reminder: Reminder;
  Boolean: Scalars['Boolean'];
  Student: Student;
  TestScore: TestScore;
  TestScoreInput: TestScoreInput;
  UpdateLORApplicationInput: UpdateLorApplicationInput;
  UpdateReminderInput: UpdateReminderInput;
  UpdateStudentInput: UpdateStudentInput;
  User: User;
  UserReturn: UserReturn;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DepartmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Department'] = ResolversParentTypes['Department']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FacultyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Faculty'] = ResolversParentTypes['Faculty']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  lorApplications?: Resolver<Array<Maybe<ResolversTypes['LORApplication']>>, ParentType, ContextType>;
  lorDraftTemplates?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  reminders?: Resolver<Array<Maybe<ResolversTypes['Reminder']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LorApplicationResolvers<ContextType = any, ParentType extends ResolversParentTypes['LORApplication'] = ResolversParentTypes['LORApplication']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dueDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  statementOfPurpose?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  course?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  university?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  draftURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  studentID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  facultyID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  loginUser?: Resolver<ResolversTypes['UserReturn'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'loginUserInput'>>;
  createUser?: Resolver<ResolversTypes['UserReturn'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'createUserInput'>>;
  createLORApplication?: Resolver<ResolversTypes['LORApplication'], ParentType, ContextType, RequireFields<MutationCreateLorApplicationArgs, 'createLORApplicationInput'>>;
  createReminder?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType, RequireFields<MutationCreateReminderArgs, 'createReminderInput'>>;
  updateLORApplication?: Resolver<ResolversTypes['LORApplication'], ParentType, ContextType, RequireFields<MutationUpdateLorApplicationArgs, 'updateLORApplicationInput'>>;
  updateReminder?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType, RequireFields<MutationUpdateReminderArgs, 'updateReminderInput'>>;
  updateStudent?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<MutationUpdateStudentArgs, 'updateStudentInput'>>;
  deleteLORApplication?: Resolver<ResolversTypes['LORApplication'], ParentType, ContextType, RequireFields<MutationDeleteLorApplicationArgs, 'id'>>;
  deleteReminder?: Resolver<ResolversTypes['Reminder'], ParentType, ContextType, RequireFields<MutationDeleteReminderArgs, 'id'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getDepartments?: Resolver<Array<Maybe<ResolversTypes['Department']>>, ParentType, ContextType>;
  getFaculties?: Resolver<Array<Maybe<ResolversTypes['Faculty']>>, ParentType, ContextType>;
  getApplicationsByFacultyID?: Resolver<Array<Maybe<ResolversTypes['LORApplication']>>, ParentType, ContextType>;
  getStudentByUserID?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryGetStudentByUserIdArgs, 'id'>>;
  getFacultyByUserID?: Resolver<Maybe<ResolversTypes['Faculty']>, ParentType, ContextType, RequireFields<QueryGetFacultyByUserIdArgs, 'id'>>;
  getPastApplicationsByFacultyID?: Resolver<Array<Maybe<ResolversTypes['Student']>>, ParentType, ContextType, RequireFields<QueryGetPastApplicationsByFacultyIdArgs, 'id'>>;
};

export type ReminderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reminder'] = ResolversParentTypes['Reminder']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  facultyID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  studentID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  viewed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Student'] = ResolversParentTypes['Student']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  regNo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  appliedUniversities?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  acceptedUniversity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  testScores?: Resolver<Array<Maybe<ResolversTypes['TestScore']>>, ParentType, ContextType>;
  lorApplications?: Resolver<Array<Maybe<ResolversTypes['LORApplication']>>, ParentType, ContextType>;
  reminders?: Resolver<Array<Maybe<ResolversTypes['Reminder']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestScoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['TestScore'] = ResolversParentTypes['TestScore']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exam?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<ResolversTypes['Department'], ParentType, ContextType>;
  institution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contact?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profilePhoto?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userType?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserReturn'] = ResolversParentTypes['UserReturn']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<ResolversTypes['Department'], ParentType, ContextType>;
  institution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contact?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profilePhoto?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userType?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  Department?: DepartmentResolvers<ContextType>;
  Faculty?: FacultyResolvers<ContextType>;
  LORApplication?: LorApplicationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reminder?: ReminderResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
  TestScore?: TestScoreResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserReturn?: UserReturnResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
