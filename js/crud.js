import { changeLocalDaa, localData } from "./localData.js";

export function deleteElementLocal(data, id) {
  const result = data.filter((el) => el.id != id);
  changeLocalDaa(result);
}
export function addElementLocal(newData) {
  const result = [newData, ...localData];
  changeLocalDaa(result);
}
export function editElementLocal(editedData) {
  const result = localData.map((el) => {
    if (el.id === editedData.id) {
      return editedData;
    } else {
      return el;
    }
  });
  changeLocalDaa(result);
}
