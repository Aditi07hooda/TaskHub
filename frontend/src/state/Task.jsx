import axios from "axios";
import { atom, atomFamily, selector } from "recoil";

export const taskList = atom({
  key: "taskList",
  default: selector({
    key: "defaultTaskListSelector",
    get: async ({ get }) => {
      try {
        const response = await axios.get("http://localhost:5001/todos", {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
      }
    },
  }),
});

export const taskIndividual = atomFamily({
  key: "taskIndividual",
  default: (taskId) => selector({
    key: `taskIndividualSelector-${taskId}`,
    get: async ({ get }) => {
      try {
        const response = await axios.get(`http://localhost:5001/todos/${taskId}`, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        console.error(`Error fetching task with id ${taskId}:`, error);
        throw error;
      }
    },
  }),
});
