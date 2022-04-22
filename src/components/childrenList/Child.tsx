import { FC, useRef } from "react";
import { HttpMethods, useFetch } from "../../utils/fetchData";
import { ChildRes, GiftsRes } from "types";

interface Props {
  child: ChildRes;
  giftsList: GiftsRes | null;
}

export const Child: FC<Props> = ({ child, giftsList }) => {
  const { getAPIData } = useFetch({ method: HttpMethods.POST });
  const selectedGiftId = useRef<HTMLSelectElement | null>(null);

  const handleGiftAdd = async (childId: string) => {
    if (selectedGiftId.current) {
      const giftId = selectedGiftId.current.value;
      await getAPIData(`/children/${childId}/gifts`, {
        giftId,
      });
    }
  };
  return (
    <tr key={child.id}>
      <td>{child.name}</td>
      <td>{JSON.stringify(child.gifts)}</td>
      <td>
        <select ref={selectedGiftId} name="giftId" defaultValue={""}>
          <option value="" hidden>
            Wybierz prezent
          </option>
          {giftsList?.gifts.map((gift) => (
            <option key={gift.id} value={gift.id}>
              {`${gift.name}(${gift.count})`}
            </option>
          ))}
        </select>
      </td>
      <td>
        <button onClick={() => handleGiftAdd(child.id)}>+</button>
      </td>
    </tr>
  );
};
