import React, { useEffect, useState } from "react";
import nullimg from "../images/empty.png";
import plus from "../images/add.svg";
import Notes from "./Notes";
import { nanoid } from "nanoid";

const getdata = () => {
  const data = localStorage.getItem("notesdata");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function AddNote() {
  //Setting states and managing states
  let noteid = nanoid(); //generating unique id
  let status = true; //note status
  let [search, setSearch] = useState(""); //Searching the data
  let [edititem, setEditItem] = useState(""); //enable disable
  let [notedata, setnotedata] = useState(""); //input note data
  let [alldata, setalldata] = useState(getdata); // All notes data

  const handleinput = (e) => {
    setnotedata(e.target.value);
  };

  //Setting data in local storage
  useEffect(() => {
    localStorage.setItem("notesdata", JSON.stringify(alldata));
  }, [alldata]);

  //Form handling
  const handlesubmit = (e) => {
    e.preventDefault();
    setalldata((prevalue) => [...prevalue, { noteid, notedata, status }]);

    setnotedata("");
  };

  //Search Funstion
  const handlesearch = (e) => {
    setSearch(e.target.value);
  };

  // enable disable input feild
  const edititemfun = (eid) => {
    setEditItem(eid);
  };

  // Deleting data from local storage
  const deletenote = (id) => {
    const deleteddata = alldata.filter((element) => {
      return element.noteid !== id;
    });
    setalldata(deleteddata);
  };

  // Updating the data in local storage
  const updateitem = (uid, udata) => {
    const updateddata = alldata.map((element) => {
      if (element.noteid === uid) {
        return { noteid: uid, notedata: udata, status: true };
      } else {
        return element;
      }
    });
    setalldata(updateddata);
    setEditItem("");
  };

  //changing the note status -- date : 27-07-2021 -- not working
  const changestatus = (uid) => {
    const updateddata = alldata.map((element) => {
      if (element.noteid === uid) {
        return {
          noteid: element.noteid,
          notedata: element.notedata,
          status: !element.status,
        };
      } else {
        return element;
      }
    });
    setalldata(updateddata);
  };

  return (
    <>
      {/* form Data submitting  start------------------------------------------------------------------------ */}
      <form onSubmit={handlesubmit}>
        <div className="my-4 flex mx-5 relative">
          <input
            value={notedata}
            onChange={handleinput}
            className="text-lg  bg-white border shadow-xl w-[100%] h-20 rounded-md p-4 focus:outline-8 focus:outline-yellow-400"
            type="text"
            placeholder="Enter Your Text"
            required
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-3 bottom-2 m-2 hover:scale-105 duration-200"
          >
            <img src={plus} className="h-11 w-11" alt="plus" />
          </button>
        </div>
      </form>
      {/* form Data submitting  End------------------------------------------------------------------------ */}

      <h3 className="mt-8 text-3xl my-2 font-bold">Your Tasks</h3>

      {/* this is search bar start--------------------------------------------------------------------------*/}
      {alldata.length > 0 && (
        <div>
          <input
            className="p-3 w-[90%] md:w-[40%] my-2 bg-slate-200 rounded-md outline-2 outline-yellow-400"
            type="text"
            placeholder="Search here"
            value={search}
            onChange={handlesearch}
          />
        </div>
      )}
      {/* this is search bar End--------------------------------------------------------------------------*/}

      {/* note data returning start--------------------------------------------------------------------  */}
      {alldata.length > 0 ? (
        alldata.map((element) => {
          if (search.length > 0) {
            if (element.notedata.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
              return (
                <Notes
                  key={element.noteid}
                  id={element.noteid}
                  notedata={element.notedata}
                  handledelete={deletenote}
                  handleupdate={updateitem}
                  setEditInput={edititemfun}
                  handlechange={changestatus}
                  editinput={edititem}
                  elstyle={{
                    textDecorationLine: element.status ? "" : "line-through",
                  }}
                  buttonstyle={{ display: element.status ? "" : "none" }}
                />
              );
            }
          } else {
            return (
              <Notes
                key={element.noteid}
                id={element.noteid}
                notedata={element.notedata}
                handledelete={deletenote}
                handleupdate={updateitem}
                setEditInput={edititemfun}
                handlechange={changestatus}
                editinput={edititem}
                elstyle={{
                  textDecorationLine: element.status ? "" : "line-through",
                }}
                buttonstyle={{ display: element.status ? "" : "none" }}
              />
            );
          }
          //returning '' beacuase of rule
          return '';
        })
      ) : (
        <div className="flex flex-col justify-center items-center my-10">
          <img className="w-16 md:w-24" src={nullimg} alt="null" />
          <h3 className="text-red-500 text-base  font-bold">
            Task box is empty
          </h3>
        </div>
      )}
      {/* note data returning start--------------------------------------------------------------------  */}
    </>
  );
}

export default AddNote;
