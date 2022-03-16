import { MonitorMiddleware } from './monitor.middleware';

describe('MonitorMiddleware', () => {
  it('should be defined', () => {
    expect(new MonitorMiddleware()).toBeDefined();
  });
});
