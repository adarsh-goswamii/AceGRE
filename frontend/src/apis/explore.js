import * as apiConst from "../constants/api.consts";
import api from "./index";

export const getWordList = async (payload) => {
  try {
    const { pagination, filter } = payload;
    let page = "";
    if (pagination) {
      page = `page=${pagination.page_no}&size=${pagination.size}`;
    }

    if (filter) {
    }

    const result = await api.get(`${apiConst.GET_WORD_LIST}?${page}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const updateWordStatus = async (payload) => {
  try {
    const results = await api.postData(
      `${apiConst.UPDATE_WORD_STATUS}`,
      payload
    );
    return results.data;
  } catch (error) {
    throw error;
  }
};
