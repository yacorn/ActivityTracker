// Import the function to be tested
const { getCurrentTab } = require('./functions.js');

// Mock chrome API
const mockTabsQuery = jest.fn().mockImplementation((queryOptions, callback) => {
  const tab = {
    url: 'https://example.com',
  };
  callback([tab]);
});

global.chrome = {
  tabs: {
    query: mockTabsQuery,
  },
};

describe('getCurrentTab', () => {
  it('should return the current tab information', async () => {
    // Call the function
    const result = await getCurrentTab();

    // Expectations
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('url');
    expect(result).toHaveProperty('time');
    expect(result.name).toBe('example.com');
    expect(result.url).toBe('https://example.com');
    expect(typeof result.time).toBe('string'); // Check if the time is a string
    expect(new Date(result.time)).toEqual(expect.any(Date)); // Check if the time is a valid date string
  });
});