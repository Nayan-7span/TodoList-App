import React, { useState} from "react";
import edit from "../images/edit.svg";
import cancel from "../images/cancel.png";
import update from "../images/update.svg"
import del from "../images/delete.svg";



function Notes(props) {
  const isvisible = props.editinput === props.id 
  const [updatedata, setUpdatedata] = useState();


  //inable and disable the input feild work in AddNote.js
  const edititem = (editid) => {
    setUpdatedata(props.notedata)
    props.setEditInput(editid)
  };
  


  //setting the data for update work in this
  const handleonchange= (e)=>{
    setUpdatedata(e.target.value)
  }
  
  // Deleting the notes work in AddNote.js
  const deleteitem = () => {
    props.handledelete(props.id);
  };

  // updating the notes -- on progress
  const updateitem = (uid, updatedata) =>{
    props.handleupdate(uid, updatedata)
  }
  const canceledit = () =>{
    setUpdatedata((prevalue)=>{
      return prevalue
    })
    updateitem()
  }

  //changing status of note
  const changestatus = (e) =>{
    if(!isvisible){
      props.handlechange(e.target.id)
    }
  }

  return (
    <>
      <div id={props.id}   className="mx-5  relative md:w-[80%] my-3 md:mx-auto" >
        {/* Note input feild  */}

         <span onDoubleClick={changestatus}>      
        <textarea
          rows="2"
          id={props.id}          
          onChange={handleonchange}
          type="text"
          style={props.elstyle}
          
          className={`example text-sm md:text-lg w-[100%] ${isvisible ? "bg-green-200" : "bg-yellow-100"} rounded-lg p-5 text-base $`}
          value={isvisible ? updatedata : props.notedata}
          disabled={isvisible ? false : true}         
        />
        </span> 
        



         {/*Edit and submit edit botton*/}
        <div className="buttons absolute bottom-2 right-3 text-black space-x-2">
         { props.editinput !== props.id  ?  <button
            onClick={() => {
              edititem(props.id);
            }}
            className="edit h-6 w-6 hover:scale-125 duration-200"
            style={props.buttonstyle}
          >
            <img src={edit} alt="edit" />
          </button>
          :
          <button
            onClick={() => {
              updateitem(props.id, updatedata);
            }}
            className="submit h-7 w-7 hover:scale-125 duration-200"
          >
            <img src={update} alt="edit" />
          </button>
          }



          {/* Delete Button  */}
          {props.editinput !== props.id ?
            <button
            onClick={deleteitem}
            className="delete h-6 w-6 hover:scale-125 duration-200"
          >
            <img src={del} alt="delete" />
          </button>
          :
          <button
            onClick={canceledit}
            className="delete h-7 w-7 hover:scale-125 duration-200"
          >
            <img src={cancel} alt="delete" />
          </button>}


        </div>
      </div>
    </>
  );
}

export default Notes;
