test('makeMetadata returns correct fields', async () => {
  const { makeMetadata } = await import('../lib/makeMetadata.js');
  const result = makeMetadata({
    meta: {
      title: 'Mon article',
      description: 'Desc',
      image: 'image.png'
    },
    slug: 'slug',
    section: 'blog'
  });
  expect(result.title).toBe('Mon article');
  expect(result.description).toBe('Desc');
  expect(result.alternates.canonical).toBe('https://www.alforis.fr/blog/slug');
  expect(result.openGraph.images).toEqual(['image.png']);
});
