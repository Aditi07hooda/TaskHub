import axios from "axios";
import { atom, selector } from "recoil";

export const projectCount = atom({
  key: "projectCount",
  default: selector({
    key: "projectCountSelector",
    get: async ({ get }) => {
      try {
        const response = await axios.get("http://localhost:5001/ProjectCount", {
          withCredentials: true,
        });
        return response.data || [];
      } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }
    },
  }),
});

export const eventCount = atom({
  key: "eventCount",
  default: selector({
    key: "eventCountSelector",
    get: async ({ get }) => {
      try {
        const response = await axios.get("http://localhost:5001/EventCount", {
          withCredentials: true,
        });
        return response.data || [];
      } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }
    },
  }),
});

export const taskCount = atom({
  key: "taskCount",
  default: selector({
    key: "taskCountSelector",
    get: async ({ get }) => {
      try {
        const response = await axios.get("http://localhost:5001/TaskCount", {
          withCredentials: true,
        });
        return response.data || [];
      } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }
    },
  }),
});

