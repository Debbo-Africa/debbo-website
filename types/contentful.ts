import type { Entry, EntryFieldTypes, Asset } from "contentful";
import type { Document } from "@contentful/rich-text-types";

export interface FaqFields {
  category: EntryFieldTypes.Text;
  question: EntryFieldTypes.Text;
  answer: EntryFieldTypes.Text;
}

export interface FaqSkeleton {
  contentTypeId: "faqs";
  fields: FaqFields;
}

export type FaqEntry = Entry<FaqSkeleton, undefined, string>;

export interface PrivacyPolicyFields {
  privacyPolicy: Document;
  termsOfUse: Document;
}

export interface PrivacyPolicySkeleton {
  contentTypeId: "privacyPolicyTermsOfUse";
  fields: PrivacyPolicyFields;
}

export type PrivacyPolicyEntry = Entry<
  PrivacyPolicySkeleton,
  undefined,
  string
>;

export interface GlossaryFields {
  category: EntryFieldTypes.Text;
  title: EntryFieldTypes.Text;
  description: EntryFieldTypes.Text;
  meaning: EntryFieldTypes.Text;
  explanation: Document;
}

export interface GlossarySkeleton {
  contentTypeId: "dbboAfricaGlossary";
  fields: GlossaryFields;
}

export type GlossaryEntry = Entry<GlossarySkeleton, undefined, string>;

export interface NewsEventsFields {
  category: EntryFieldTypes.Text;
  description: EntryFieldTypes.Text;
  event_date: EntryFieldTypes.Date;
  tag: EntryFieldTypes.Text;
  tagImage: Asset;
  link: Document;
  image: Asset;
}

export interface NewsEventsSkeleton {
  contentTypeId: "newsEvents";
  fields: NewsEventsFields;
}

export type NewsEventsEntry = Entry<NewsEventsSkeleton, undefined, string>;

export interface BlogFields {
  featured: EntryFieldTypes.Boolean;
  category: EntryFieldTypes.Text;
  image: Asset;
  title: EntryFieldTypes.Text;
  date: EntryFieldTypes.Date;
  writer: EntryFieldTypes.Text;
  about: Document;
}

export interface BlogSkeleton {
  contentTypeId: "blog";
  fields: BlogFields;
}

export type BlogEntry = Entry<BlogSkeleton, undefined, string>;

export interface TeamFields {
  name: EntryFieldTypes.Text;
  qualifications: EntryFieldTypes.Text;
  position: EntryFieldTypes.Text;
  image: Asset;
  linkedInUrl: Document;
  about: EntryFieldTypes.Text;
}

export interface TeamSkeleton {
  contentTypeId: "teams";
  fields: TeamFields;
}

export type TeamEntry = Entry<TeamSkeleton, undefined, string>;

export interface JobFields {
  role: EntryFieldTypes.Text;
  specialization?: EntryFieldTypes.Text;
  employmentType: EntryFieldTypes.Text;
  workMode: EntryFieldTypes.Text;
  location: EntryFieldTypes.Text;
  department: EntryFieldTypes.Text;
  description: Document;
  url: Document;
}

export interface JobSkeleton {
  contentTypeId: "job";
  fields: JobFields;
}
export interface MedicalTestFields {
  type?: EntryFieldTypes.Text;
  category?: EntryFieldTypes.Text;
  testName: EntryFieldTypes.Text;
  price: EntryFieldTypes.Text;
  testList: Document;
  scan?: EntryFieldTypes.Boolean;
  description:string
}

export interface MedicalTestSkeleton {
  contentTypeId: "medicalTest";
  fields: MedicalTestFields;
}

export type MedicalTestEntry = Entry<MedicalTestSkeleton, undefined, string>;
export type JobEntry = Entry<JobSkeleton, undefined, string>;
