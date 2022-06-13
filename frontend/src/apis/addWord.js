import * as apiConst from "../constants/api.consts";
import api from "./index";

export const addWord = async (payload) => {
  try {
    const result = await api.postData(apiConst.GET_WORD_LIST, payload);
    return result.data;
  } catch (error) {
    throw error;
  }
};