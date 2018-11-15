describe('Authentication screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  it('should have a sign in button', async () => {
    await expect(element(by.text('SIGN IN'))).toBeVisible();
    await element(by.text('SIGN IN')).tap();
    await element(by.id('userName')).typeText('saef.taher\n');
    await element(by.id('password')).typeText('A123456789.\n');

    await new Promise(resolve => setTimeout(resolve, 1000));
    await element(by.text('SIGN IN')).tap();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await new Promise(resolve => setTimeout(resolve, 1000));
  });
})