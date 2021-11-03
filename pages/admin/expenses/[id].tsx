import { HourglassBottom, PermIdentity } from "@mui/icons-material";
import { useRouter } from "next/router";
import styles from "../../../styles/Users.module.css";
import Link from "next/link";
import { NextPage } from "next";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Details: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  // if (loading) {
  //   return (
  //     <div>
  //       <p>Initialising User...</p>
  //     </div>
  //   );
  // }
  // if (error) {
  //   return (
  //     <div>
  //       <p>Error: {error}</p>
  //     </div>
  //   );
  // }
  // if (user) {
  //   router.push("/admin/dashboard");
  // }
  const { id, name, amount, date, approved } = router.query;
  const [newName, setName] = useState(name);
  const [newAmount, setAmount] = useState(amount);
  const [newDate, setDate] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  let name1: string = name as string;
  let name2: string = amount as string;
  const updateUser = async (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    if (newName && newAmount && id && newDate) {
      try {
        const documentRef = doc(db, "expenses", id.toString());
        await updateDoc(documentRef, {
          name: newName,
          amount: newAmount,
          approved: isApproved,
          date: newDate,
        });
        console.log("Document written with ID: ", documentRef.id);
        alert("Expense updated");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("Please check your entries");
    }
  };
  return (
    <>
      <div className="user">
        <div className="userTitleContainer flex items-center justify-between">
          <h1 className="userTitle text-2xl font-bold">Edit Expense</h1>
          <Link href="/admin/expenses/new">
            <button className="userAddButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create
            </button>
          </Link>
        </div>
        <div className="userContainer flex mt-5">
          <div className={styles.userShow + " shadow-2xl p-5"}>
            <div className="userShowTop flex items-center">
              <div className="userShowTopTitle flex flex-col ml-5">
                <span className="userShowSurname font-semibold text-xl">
                  {amount}
                </span>
                <span className="userShowFirstName font-light">{name}</span>
              </div>
            </div>
            <div className="userShowBottom mt-5">
              <span className="userShowTitle text-base font-semibold text-gray-400">
                Statistics
              </span>
              <div className="userShowInfo flex items-center mt-5 mb-0 text-gray-600">
                <HourglassBottom className=" text-base" />
                <span className="userShowInfoTitle ml-3">56345</span>
              </div>
            </div>
          </div>
          <div className={styles.userUpdate + " shadow-2xl p-5 ml-5"}>
            <span className="userUpdateTitle text-2xl font-semibold">Edit</span>
            <form
              className="userUpdateForm flex justify-between mt-5"
              onSubmit={updateUser}
            >
              <div className="userUpdateLeft">
                <div className="userUpdateItem flex flex-col mt-2">
                  <label className="mb-1 text-sm">Expense</label>
                  <input
                    type="text"
                    className="userUpdateInput text-base shadow-sm w-60 border-none border-b-2 border-gray-600 h-7"
                    placeholder={name1}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem flex flex-col mt-2">
                  <label className="mb-1 text-sm">Amount</label>
                  <input
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                    className="userUpdateInput shadow-sm w-60 text-base"
                    placeholder={name2}
                  />
                </div>
                <div className="userUpdateItem flex flex-col mt-2">
                  <label className="mb-1 text-sm">Is Active</label>
                  <div className="flex flex-row items-center">
                    <input
                      type="radio"
                      id="yes"
                      name="active"
                      value="Yes"
                      onClick={(e) => setIsApproved(true)}
                    />
                    <label htmlFor="yes">Yes</label>
                  </div>
                  <div className="flex flex-row items-center">
                    <input
                      type="radio"
                      id="no"
                      name="active"
                      value="No"
                      onClick={(e) => setIsApproved(false)}
                    />
                    <label htmlFor="no">No</label>
                  </div>
                </div>
                <div className="userUpdateItem flex flex-col mt-2">
                  <label className="mb-1 text-sm">End Date</label>
                  <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    className="userUpdateInput shadow-sm w-60 text-base"
                  />
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
