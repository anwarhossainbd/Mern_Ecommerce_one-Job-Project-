import React, { Fragment,useState,useEffect } from 'react'
import "./UpdatePassword.css"
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData"
import {useSelector,useDispatch} from "react-redux"
import { useAlert } from 'react-alert';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import { updatePassword,clearErrors } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';


const UpdatePassword = ({history}) => {

  const dispatch=useDispatch() ;
  const alert =useAlert() ;

  const {error,loading,isUpdated}=useSelector(state=>state.profile)


  const [oldPassword,setOldPassword]=useState("") ;
  const [newPassword,setNewPassword]=useState("") ;   
  const [confirmPassword,setConfirmPassword]=useState("") ;



  const updatePasswordSubmit=(e)=>{

    e.preventDefault();

    const myForm = new FormData() ;

    myForm.set("oldPassword",oldPassword);
    myForm.set("newPassword",newPassword);
    myForm.set("confirmPassword",confirmPassword);

    dispatch(updatePassword(myForm))

  }

  useEffect(() => {
   
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }

    if(isUpdated){
      alert.success("Password Updated Successfully");

    history.push("/account")

    dispatch({
      type:UPDATE_PASSWORD_RESET
    })

    }

  }, [error,alert,dispatch,isUpdated,history])


  return (
     <Fragment>
     {loading? <Loader />: (<Fragment>
      <MetaData title="Change Password" />



        <div className="updatePasswordContainer">
           <div className='updatePasswordBox'>
              <h2 className="updatePasswordHeading">Update Password</h2>


                <form className='updatePasswordForm'   onSubmit={updatePasswordSubmit}>
           
                  
                    <div className='loginPassword'>
                    <VpnKeyIcon />
        
                    <input type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e)=>setOldPassword(e.target.value)}
                    />
                    </div>

                    <div className='loginPassword'>
                    <LockOpenIcon />
        
                    <input type="password"
                     placeholder="New Password"
                     required
                     value={newPassword}
                     onChange={(e)=>setNewPassword(e.target.value)}
                    />
                  </div>


                  <div className='loginPassword'>
                  <LockIcon />
      
                  <input type="password"
                   placeholder="Confirm Password"
                   required
                   value={confirmPassword}
                   onChange={(e)=>setConfirmPassword(e.target.value)}
                  />
                </div>


       
       
                   <input type="submit" value="Change Password" className="updatePasswordBtn"  />
       
 
 
               </form>




            </div>
        </div>
      
      </Fragment>)}
     </Fragment>
  )
}

export default UpdatePassword