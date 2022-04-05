import {useForm} from 'react-hook-form'
import contactAPI from '../API/contactAPI.js'

export default function useContactForm(){
 const { register, handleSubmit, formState: { errors } }= useForm({
  mode: "onBlur",
});
 function onSubmit(data,e) {
    e.preventDefault()
    
const info = {
userName: data.userName,
userEmail: data.userEmail,
userMessage: data.userMessage,
subject: data.subject,
}

    contactAPI(info)
     
}

  return {register,handleSubmit,errors,onSubmit}
}