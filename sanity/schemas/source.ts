export default {
  name: 'source',
  title: 'News Source',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Source Name',
      type: 'string',
      description: 'Display name of the news source (e.g., "BBC News")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'identifier',
      title: 'Source Identifier',
      type: 'string',
      description:
        'API identifier for the source (e.g., "bbc-news"). Must match News API source ID.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isEnabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Only enabled sources will be shown in the application',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'identifier',
      enabled: 'isEnabled',
    },
    prepare(selection: any) {
      const { title, subtitle, enabled } = selection
      return {
        title: `${title} ${enabled ? '✓' : '✗'}`,
        subtitle: subtitle,
      }
    },
  },
}
