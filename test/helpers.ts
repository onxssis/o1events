export const eventDto = {
  title: 'Exchanges Dev Summit',
  description: 'sdmh sfjd',
  location: 'doewb4r9o23',
  lng: '4.322',
  lat: '-1.23433',
  categories: [1, 2],
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
};

export const mockDbConnectionWithQueryBuilder = () => ({
  getRepository: () => ({
    createQueryBuilder: () => ({
      leftJoinAndSelect: () => ({
        loadRelationCountAndMap: () => ({
          skip: () => ({
            take: () => ({
              getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
            }),
          }),
        }),
      }),
    }),
    delete: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(true),
    save: jest.fn().mockResolvedValue(true),
    findOneOrFail: jest.fn().mockResolvedValue({}),
    find: jest.fn().mockResolvedValue([{ title: 'test event' }]),
  }),
});
