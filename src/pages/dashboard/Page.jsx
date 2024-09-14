import React from "react";
import Checkbox from "../../components/utils/Checkbox";
import axios from "axios";
import Spinner from "../../components/utils/Spinner";

const DashboardPage = () => {
  const [users, setUsers] = React.useState([]);
  const [selectedIds, setSelectedIds] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getUsers = async () => {
    try {
      const res = await axios.get(`/users`);
      if (res.data) {
        setUsers(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const onPressSelect = (event) => {
    const id = event.target.getAttribute("data-id");
    if (event.target.checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((prevId) => prevId !== id));
    }
  };

  const onPressSpecialSelect = () => {
    if (selectedIds.length < users.length) {
      setSelectedIds(users.map((user) => user.id + ""));
    } else {
      setSelectedIds([]);
    }
  };

  const onPressUpdate = async (type = "update", status = "active") => {
    // type: update/delete
    try {
      setLoading(true);
      if (type === "update") {
        const res = await axios.put("/users", {
          status,
          userIds: selectedIds,
        });
        if (res.status === 200) {
          getUsers();
        }
      } else if (type === "delete") {
        const res = await axios.delete(
          `/users?userIds=${selectedIds.join(",")}`
        );
        if (res.status === 200) {
          getUsers();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const allChecked = selectedIds.length === users.length;
  const partialChecked =
    selectedIds.length > 0 && selectedIds.length < users.length;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">
      <div className="p-2 flex justify-between">
        <div>
          <button
            disabled={loading}
            onClick={() => onPressUpdate("update", "blocked")}
            className="button"
            style={{ backgroundColor: "red" }}
          >
            {lockIcon} Block
          </button>
          <button
            disabled={loading}
            onClick={() => onPressUpdate("update", "active")}
            className="button"
          >
            {unlockIcon}
          </button>
          <button
            disabled={loading}
            onClick={() => onPressUpdate("delete")}
            className="button"
          >
            {deleteIcon}
          </button>
        </div>
        <button onClick={getUsers} className="button">
          Refresh
        </button>
      </div>
      <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <button onClick={onPressSpecialSelect}>
                <Checkbox
                  fill={allChecked ? "fill" : partialChecked ? "half" : ""}
                />
              </button>
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Last Login
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="relative">
          {loading && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <Spinner size="40" />
            </div>
          )}
          {users.map((user) => (
            <tr key={user.id} className="odd:bg-white even:bg-gray-50 border-b">
              <th
                scope="row"
                className="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="flex h-full items-center">
                  <input
                    onChange={onPressSelect}
                    checked={!!selectedIds.find((id) => id == user.id)}
                    type="checkbox"
                    data-id={user.id}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800"
                  />
                </div>
              </th>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                {new Date(user.last_login_time).toLocaleString()}
              </td>
              <td
                className={`px-6 py-4 capitalize ${
                  user.status === "blocked" ? "text-red-600" : "text-green-600"
                }`}
              >
                {user.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const lockIcon = (
  <svg viewBox="0 0 448 512" width="16px" height="16px" fill="currentcolor">
    <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
  </svg>
);

const unlockIcon = (
  <svg viewBox="0 0 576 512" width="16px" height="16px" fill="currentcolor">
    <path d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80l0 48c0 17.7 14.3 32 32 32s32-14.3 32-32l0-48C576 64.5 511.5 0 432 0S288 64.5 288 144l0 48L64 192c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-32 0 0-48z" />
  </svg>
);

const deleteIcon = (
  <svg viewBox="0 0 448 512" width="16px" height="16px" fill="currentcolor">
    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
  </svg>
);

export default DashboardPage;
