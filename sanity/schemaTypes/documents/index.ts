import { StructureChild } from "..";
import { settings } from "./settings";
import { homePage } from "./homePage";
import { contact } from "./contact";
import { terms } from "./terms";
import { policies } from "./policies";

export const singletons = [homePage, settings, contact, terms, policies];
export const multiTypes = [];
export const documents = [...singletons, ...multiTypes];

export const structureList: StructureChild[] = [
  {
    name: "homePage",
    singleton: true,
  },
  {
    name: "settings",
    singleton: true,
  },
  {
    name: "contactPage",
    singleton: true,
  },
  {
    name: "privacyPolicies",
    singleton: true,
  },
  {
    name: "terms",
    singleton: true,
  },
];
