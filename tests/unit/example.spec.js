/*import { mount } from '@vue/test-utils';
import { createRouter } from 'vue-router';
import App from '@/App.vue';

const router = require('../../src/router/index');

describe('App.vue', () => {
  const wrapper = mount(App, {
    global: {
      plugins: [router],
    },
  });

  test('Van header', () => {
    expect(wrapper.findAll('.container-fluid')).toHaveLength(1);
  });
});
*/

/*
import { mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("Test App.vue", () => {
  const wrapper = mount(App);

  test("renders a todo", () => {
    const todo = wrapper.get('[data-test="todo"]');

    expect(todo.text()).toBe("Learn Vue.js 3");
  });

  test("creates a todo", async () => {
    await wrapper.get('[data-test="new-todo"]').setValue("New todo");
    await wrapper.get('[data-test="form"]').trigger("submit");

    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2);
  });

  test("completes a todo", async () => {
    await wrapper.get('[data-test="todo-checkbox"]').setValue(true);

    expect(wrapper.get('[data-test="todo"]').classes()).toContain("completed");
  });

  test("V-if látszik e", () => {
    expect(wrapper.find(".vif").exists()).toBe(false);
  });

  test("Tartalom ellenőrzése", () => {
    expect(wrapper.get("#sh").text()).toEqual("VSHOW");
  });

  test("Látjható e", () => {
    expect(wrapper.get("#sh").isVisible()).toBe(true);
  });
});

 */

describe('Teszt', () => {
  test('1+2=3?', () => {
    expect(1 + 2).toBe(3);
  });
});
