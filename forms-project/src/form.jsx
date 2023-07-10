import { useState } from "react"

function Form (){
    const[user,setUser] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        phoneType: "",
        staff: "",
        bio: "",
        notifs: ""
    })

    const [errors,setErrors] = useState([]);

    const handleChange = (field) => {
        return (e) => {
        const newObj = Object.assign({},user, {[field]: e.target.value})
            setUser(newObj);
        }
    }
    

    function isValidEmail(email){
        let validEmail = false 

        email.split("").forEach((char,idx) => {
            if(char === "@"){
                email.slice(idx + 1)
            } else if( char === "."){
                validEmail = true 
            }
        })

        return validEmail
    }

    function isValidPhoneNumber(phoneNumber){
       

        if(phoneNumber.length < 12){
            return false 
        }

        for(let i = 0 ; i < phoneNumber.length; i++){
            let digit = phoneNumber[i]

            if((i === 3 && digit !== "-") || (i === 7 && digit !== "-")){
                return false
            } else if(typeof(digit) !== "number"){
                return false
            }

        }

        return true 
    }

    const validate = () => {
        let errors = []
    
        if(user.name.length === 0 ){
        errors.push("name cannot be blank")
        }

        if(user.email.length === 0 && !isValidEmail(user.email)){
            errors.push("Email is not valid")
        }

        if(user.phoneNumber.length !== 0 && !isValidPhoneNumber(user.phoneNumber)){
            errors.push("Phone number is not valid")
        }

        if(user.phoneNumber.length !== 0 && !user.phoneType){
            errors.push("Please select phone type")
        }

        if(user.bio.length > 280){
            errors.push("Bio is too long nobody cares")
        }
    
        return errors;
    }
    
    const showErrors = () => {
     
         if(!errors.length){
             return null
         }
 
         return(
             <ul>
                 {errors.map(error => <li> {error}</li>)}
             </ul>
         )
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let errors = validate();
        setErrors(errors);

        if (!errors.length){
            setUser({
                name: "",
                email: "",
                phoneNumber: "",
                phoneType: "",
                staff: "",
                bio: "",
                notifs: ""
            })
        } 
    }


    

        

    return(
        <>
            

            <form className = "form" onSubmit = {handleSubmit} >
                <input type="text" placeholder="Name" value={user.name} onChange={handleChange("name")}/>
                <br />
                <input type="text" placeholder="Email" value={user.email} onChange={handleChange("email")}/>
                <br />
                <input type="text" placeholder="000-000-0000" value={user.phoneNumber}  onChange={handleChange("phoneNumber")}/>
                <br />

                <label for = "Phone-Type" > Select Phone Type: </label>
                    <select name="Phone-Type" id="Phone-Type">
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="mobile">Mobile</option>
                    </select>

                    <br />

                    Staff:

                    <br />

                    <label> Instructor:
                        <input type="radio" name="staff" id="" /> 
                    </label>

                    <label> Student:
                        <input type="radio" name="staff" id="" /> 
                    </label>

                    <br />


                    Bio:<textarea name="bio" id="" cols="30" rows="10" onChange={handleChange("bio")}></textarea>

                    <br />

                    Sign Up for email notifications:<input type="checkbox" name="notifs" id="" />

                    <br />

                    <input type="submit" />


            </form>

            <ul>
                 {errors.map(error => <li> {error}</li>)}
            </ul>
        </>
    )
}

export default Form 