import axios from "axios";
import { atom, atomFamily, selector } from "recoil";

export const eventList = atom({
  key: "eventList",
  default: selector({
    key: "defaultEventListSelector",
    get: async ({ get }) => {
      try {
        const response = await axios.get("http://localhost:5001/event", {
          withCredentials: true,
        });
        return response.data || [];
      } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
      }
    },
  }),
});

export const eventIndividual = atomFamily({
  key: "eventIndividual",
  default: (eventId) => selector({
    key: `eventIndividualSelector`,
    get: async ({ get }) => {
      try {
        const response = await axios.get(`http://localhost:5001/event/${eventId}`, {
          withCredentials: true,
        });
        console.log(response.data)
        return response.data || [];
      } catch (error) {
        console.error(`Error fetching task with id ${eventId}:`, error);
        throw error;
      }
    },
  }),
});
