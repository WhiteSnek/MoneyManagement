import { ListType } from "../types/ListType";
import { months } from "../constants/months";
export const sortListsByMonth = (lists: ListType[]): ListType[] => {
    return lists.sort((a, b) => {
      const monthAIndex = months.indexOf(a.title);
      const monthBIndex = months.indexOf(b.title);
      return monthAIndex - monthBIndex;
    });
  };