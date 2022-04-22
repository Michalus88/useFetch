import { useEffect } from "react";
import {
  FetchChildrenRes,
  FetchGiftsRes,
  useFetch,
} from "../../utils/fetchData";
import { Child } from "./Child";

export const ChildrenList = () => {
  const {
    data: childrenList,
    loading: childrenLoading,
    error: childrenErr,
    getAPIData: getChildren,
  } = useFetch({
    restUrl: "/children",
  }) as FetchChildrenRes;
  const {
    data: giftsList,
    loading: giftLoading,
    error: giftErr,
    getAPIData: getGifts,
  } = useFetch({ restUrl: "/gifts" }) as FetchGiftsRes;

  useEffect(() => {
    getChildren();
    getGifts();
  }, []);

  if (childrenLoading && giftLoading) {
    return <div>Loading</div>;
  }
  if (!childrenList || !giftsList) {
    if (childrenErr || giftErr) {
      return <div>Błąd</div>;
    }
    return <div>Loading . . .</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Imię</th>
          <th>Lista prezentów</th>
          <th>Wybierz prezent</th>
        </tr>
      </thead>
      <tbody>
        {childrenList.children.map((child) => (
          <Child key={child.id} child={child} giftsList={giftsList} />
        ))}
      </tbody>
    </table>
  );
};
