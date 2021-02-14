import { mount } from '@vue/test-utils';
import BaseLoader from '@/components/UI/BaseLoader.vue';

describe('BaseLoader.vue', () => {
  const wrapper = mount(BaseLoader);

  test('Van e tartalma',async () => {
    const todo = await wrapper.findAll('.visually-hidden');

    expect(todo).toHaveLength(1);
  });

  // test('creates a todo', async () => {
  //   await wrapper.get('[data-test="new-todo"]').setValue('New todo');
  //   await wrapper.get('[data-test="form"]').trigger('submit');

  //   expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2);
  // });

  // {
  //   "element": <span class="visually-hidden">Loading...</span>
  // }
});
