import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from '@components/auth/LoginForm.vue';
import { useAuth } from '@composables/useAuth';
import { useRouter } from 'vue-router';

vi.mock('@/composables/useAuth', () => ({
  useAuth: vi.fn(() => ({
    login: vi.fn(),
  })),
}));

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));

describe('LoginForm.vue', () => {
  it('renders the login form correctly', () => {
    const wrapper = mount(LoginForm);

    expect(wrapper.find('h2').text()).toBe('Sign in to ArtistWorks');
    expect(wrapper.find('input#username').exists()).toBe(true);
    expect(wrapper.find('input#password').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').text()).toBe('Continue');
  });

  it('calls login and navigates on successful login', async () => {
    const mockLogin = vi.fn(() => true);
    const mockPush = vi.fn();

    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    const wrapper = mount(LoginForm);

    await wrapper.find('input#username').setValue('admin');
    await wrapper.find('input#password').setValue('password');
    await wrapper.find('form').trigger('submit.prevent');

    expect(mockLogin).toHaveBeenCalledWith('admin', 'password');
    expect(mockPush).toHaveBeenCalledWith('/courses/jazz-guitar-lessons-dave-stryker');
  });

  it('shows an alert on failed login', async () => {
    const mockLogin = vi.fn(() => false);
    const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {});

    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });

    const wrapper = mount(LoginForm);

    await wrapper.find('input#username').setValue('wrong');
    await wrapper.find('input#password').setValue('credentials');
    await wrapper.find('form').trigger('submit.prevent');

    expect(mockLogin).toHaveBeenCalledWith('wrong', 'credentials');
    expect(mockAlert).toHaveBeenCalledWith('Invalid credentials');

    mockAlert.mockRestore();
  });
});
