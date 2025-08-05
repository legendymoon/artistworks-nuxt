import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import VideoPlayer from '@components/lesson/VideoPlayer.vue';

describe('VideoPlayer.vue', () => {
  it('renders the video player correctly', () => {
    const wrapper = mount(VideoPlayer, {
      props: {
        videoUrl: 'https://d2f7m0x7fzg0mg.cloudfront.net/lesson-1/part-1.mp4',
        src: 'https://d2f7m0x7fzg0mg.cloudfront.net/lesson-1/part-1.mp4',
        isPlaying: false,
      },
    });

    const videoElement = wrapper.find('video');
    expect(videoElement.exists()).toBe(true);
    expect(videoElement.attributes('src')).toBe('https://d2f7m0x7fzg0mg.cloudfront.net/lesson-1/part-1.mp4');
  });

  it('emits update:isPlaying with true when the video starts playing', async () => {
    const wrapper = mount(VideoPlayer, {
      props: {
        videoUrl: 'https://d2f7m0x7fzg0mg.cloudfront.net/lesson-1/part-1.mp4',
        src: 'https://d2f7m0x7fzg0mg.cloudfront.net/lesson-1/part-1.mp4',
        isPlaying: false,
      },
    });

    const videoElement = wrapper.find('video');
    await videoElement.trigger('play');

    expect(wrapper.emitted('update:isPlaying')).toBeTruthy();
    expect(wrapper.emitted('update:isPlaying')?.[0]).toEqual([true]);
  });

  it('emits update:isPlaying with false when the video is paused', async () => {
    const wrapper = mount(VideoPlayer, {
      props: {
        videoUrl: 'https://d2f7m0x7fzg0mg.cloudfront.net/lesson-1/part-1.mp4',
        src: 'https://d2f7m0x7fzg0mg.cloudfront.net/lesson-1/part-1.mp4',
        isPlaying: true,
      },
    });

    const videoElement = wrapper.find('video');
    await videoElement.trigger('pause');

    expect(wrapper.emitted('update:isPlaying')).toBeTruthy();
    expect(wrapper.emitted('update:isPlaying')?.[0]).toEqual([false]);
  });

});
