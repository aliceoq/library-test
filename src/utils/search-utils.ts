import { Hit } from 'react-instantsearch-core'

import APIGuidesIcon from "components/icons/api-guides-icon";
import APIReferenceIcon from "components/icons/api-reference-icon";
import AppDevelopmentIcon from "components/icons/app-development-icon";
import ReleaseNotesIcon from "components/icons/release-notes-icon";
import StorefrontDevelopmentIcon from "components/icons/storefront-development-icon";
import VTEXIOAppsIcon from "components/icons/vtex-io-apps-icon";
import { IconComponent } from "./types";
import AddedIcon from 'components/icons/added-icon';
import DeprecatedIcon from 'components/icons/deprecated-icon';
import FixedIcon from 'components/icons/fixed-icon';
import ImprovedIcon from 'components/icons/improved-icon';
import RemovedIcon from 'components/icons/removed-icon';

export const getBreadcrumbs = (hit: Hit) => {
  const breadcrumbs: string[] = []
  breadcrumbs.push(hit.doctype)
  if (hit.doctype === 'API Reference' && hit.doccategory)
    breadcrumbs.push(hit.doccategory)
  breadcrumbs.push(hit.doctitle)
  return breadcrumbs
}

export const getRelativeURL = (url: string) => {
  const relativeURL = url.replace(/^(?:\/\/|[^/]+)*\//, '')
  return '/' + relativeURL
}

interface IconsI {
  name: string;
  Icon: IconComponent;
}

const iconsMap: IconsI[] = [
  {
    Icon: APIGuidesIcon,
    name: "Guides",
  },
  {
    Icon: APIReferenceIcon,
    name: "API Reference",
  },
  {
    Icon: AppDevelopmentIcon,
    name: "App Development",
  },
  {
    Icon: StorefrontDevelopmentIcon,
    name: "Storefront Development",
  },
  {
    Icon: VTEXIOAppsIcon,
    name: "VTEX IO Apps",
  },
  {
    Icon: ReleaseNotesIcon,
    name: "Release Notes",
  },
];

export const getIcon = (name: string) => {
  return iconsMap.find((icon) => icon.name === name)?.Icon;
};

export type ActionType =
  | 'added'
  | 'deprecated'
  | 'fixed'
  | 'improved'
  | 'removed'
export interface Action {
  type: ActionType
  title: string
  Icon: IconComponent
}

const actions: Action[] = [
  {
    type: 'added',
    title: 'Added',
    Icon: AddedIcon,
  },
  {
    type: 'deprecated',
    title: 'Deprecated',
    Icon: DeprecatedIcon,
  },
  {
    type: 'fixed',
    title: 'Fixed',
    Icon: FixedIcon,
  },
  {
    type: 'improved',
    title: 'Improved',
    Icon: ImprovedIcon,
  },
  {
    type: 'removed',
    title: 'Removed',
    Icon: RemovedIcon,
  },
]

export const getAction = (actionType: ActionType): Action => {
  return actions.find((action) => action.type === actionType) as Action
}
