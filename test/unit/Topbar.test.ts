import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Topbar from '@/components/layout/Topbar.vue';
import { useRoute, useRouter } from 'vue-router';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(),
}));

describe('Topbar.vue', () => {
  it('navigates to the correct route when goBack is called', async () => {
    const mockPush = vi.fn();
    const mockRoute = {
      path: '/courses/level-1/lesson-1',
      params: {},
    };

    (useRoute as vi.Mock).mockReturnValue(mockRoute);
    (useRouter as vi.Mock).mockReturnValue({ push: mockPush });

    const wrapper = mount(Topbar);

    // Trigger the goBack function
    await wrapper.vm.goBack();

    // Assert that router.push was called with the correct path
    expect(mockPush).toHaveBeenCalledWith('/courses/level-1');
  });

  it('navigates to the root route when on the top-level path', async () => {
    const mockPush = vi.fn();
    const mockRoute = {
      path: '/courses',
      params: {},
    };

    (useRoute as vi.Mock).mockReturnValue(mockRoute);
    (useRouter as vi.Mock).mockReturnValue({ push: mockPush });

    const wrapper = mount(Topbar);

    // Trigger the goBack function
    await wrapper.vm.goBack();

    // Assert that router.push was called with the root path
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('triggers goBack when the Go Back button is clicked', async () => {
    const mockPush = vi.fn();
    const mockRoute = {
      path: '/courses/level-1/lesson-1',
      params: {},
    };

    (useRoute as vi.Mock).mockReturnValue(mockRoute);
    (useRouter as vi.Mock).mockReturnValue({ push: mockPush });

    const wrapper = mount(Topbar);

    // Find and click the Go Back button
    const goBackButton = wrapper.find('button[style*="background: var(--ui-light-gray-2-f-6-f-6-f-6"]');
    await goBackButton.trigger('click');

    // Assert that router.push was called with the correct path
    expect(mockPush).toHaveBeenCalledWith('/courses/level-1');
  });
});
