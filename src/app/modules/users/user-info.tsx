import { UserId } from "./users.slice";
import { useNavigate, useParams } from "react-router-dom";
import { usersApi } from "./api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAppDispatch, useAppSelector } from "@/common/shared/redux";
import { deleteUser } from "./model/delete-user";

export function UserInfo() {
  const { id = "" } = useParams<{ id: UserId }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: user, isLoading: isLoadingUser } = usersApi.useGetUserQuery(
    id ?? skipToken
  );

  // const [deleteUser, { isLoading: isLoadingDelete }] =
  //   usersApi.useDeleteUserMutation();

  const isLoadingDelete = useAppSelector(
    (state) =>
      usersApi.endpoints.deleteUser.select(id ?? skipToken)(state).isLoading
  );

  const handleBackButtonClick = () => {
    navigate("..", { relative: "path" });
  };

  const handleDeleteButtonClick = async () => {
    if (!id) return;

    // navigate("..", { relative: "path" });
    // await deleteUser(id);
    await dispatch(deleteUser(id));
  };

  if (isLoadingUser || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleBackButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
      >
        Back
      </button>
      <h2 className="text-3xl">{user.name}</h2>
      <p className="text-xl">{user.description}</p>
      <button
        onClick={handleDeleteButtonClick}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        disabled={isLoadingDelete}
      >
        Delete
      </button>
    </div>
  );
}
