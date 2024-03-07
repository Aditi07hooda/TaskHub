import axios from "axios";
import { atom, selector } from "recoil";

export const projectList = atom({
  key: "projectList",
  default: selector({
    key: "defaultProjectListSelector",
    get: async ({ get }) => {
      try {
        const response = await axios.get("http://localhost:5001/Project", {
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

export const projectListDetailedView = atom({
  key: "projectListDetailedView",
  default: selector({
    key: "defaultprojectListDetailedViewSelector",
    get: async ({ get }) => {
      try {
        const response = await axios.get("http://localhost:5001/ProjectDetailedView", {
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

