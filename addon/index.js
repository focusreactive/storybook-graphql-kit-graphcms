import { withGraphQL, Query, QueryParams } from '@focus-reactive/storybook-graphql-kit';

const idValue = ({ key, value, ind, options }) => {
  if (key !== 'id') return null;
  return {
    id: key,
    getLabel: () => `<${key}>`,
    getValue: () => 'value',
    align: ind === 1 ? 'left' : 'right',
    render: null,
  };
};

const bioValue = ({ key, value, ind, options }) => {
  if (key !== 'bio') return null;
  return {
    id: key,
    getLabel: () => `<${key}>`,
    getValue: () => 'Bio',
    render: null,
  };
};

export const withGraphCMS = withGraphQL
  .addRender(idValue)
  .addRender(bioValue);

export { Query, QueryParams };
