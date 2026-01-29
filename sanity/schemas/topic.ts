export default {
  name: 'topic',
  title: 'Topic',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Topic Name',
      type: 'string',
      description: 'Name of the topic (e.g., "Technology", "Sports")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'List of keywords to match in article titles. Articles containing any of these keywords will be classified under this topic.',
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Optional color for the topic badge (hex code)',
    },
  ],
  preview: {
    select: {
      title: 'name',
      keywords: 'keywords',
    },
    prepare(selection: any) {
      const { title, keywords } = selection
      return {
        title: title,
        subtitle: keywords ? `${keywords.length} keywords` : 'No keywords',
      }
    },
  },
}
