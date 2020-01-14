import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import {
  withGraphQL,
  Query,
  QueryParams,
} from '@focus-reactive/storybook-graphql-kit';

const createGraphCMSEntryEditLink = ({ viewId, projectId, stage, entryId }) =>
  `https://app.graphcms.com/${projectId}/${stage}/content/${viewId}/table/${entryId}`;

const getStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  imageContainer: {
    maxWidth: 200,
    height: 150,
  },
}));

const LinkAction = ({ url, classes, id }) => (
  <Tooltip title={`Edit entry ${id} in GraphCMS`}>
    <IconButton
      href={url}
      target="_blank"
      variant="extended"
      aria-label="delete"
      className={classes.fab}
      size="small"
    >
      <EditIcon className={classes.extendedIcon} />
    </IconButton>
  </Tooltip>
);

export const renderLinkAction = ({ viewId, projectId, stage, entryId }) => {
  const classes = getStyles();
  const url = createGraphCMSEntryEditLink({
    viewId,
    projectId,
    stage,
    entryId,
  });
  return () => <LinkAction url={url} classes={classes} id={entryId} />;
};

const simpleValue = ({ key, value, ind }) => {
  if (Array.isArray(value)) return null;
  if (typeof value === 'object' && value !== null) return null;
  return {
    id: key,
    getLabel: () => `${key}`,
    getValue: () => value,
    align: ind === 1 ? 'left' : 'right',
    render: null,
  };
};

const idValue = ({ key, value, ind, options }) => {
  const simple = simpleValue({ key, value, ind });
  if (!simple) return null;
  if (simple.id !== 'id') return null;

  return {
    ...simple,
    getLabel: () => 'ID',
    render: renderLinkAction({ entryId: value, ...options.viewCredentials }),
  };
};

export const withGraphCMS = withGraphQL.addRender(idValue);

export { Query, QueryParams };
