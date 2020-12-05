
//login and signup form validations
function validations()
{
    //getting form inputs
    let username=document.getElementById('username');
    let password=document.getElementById('password');
    //regular expressions
             // example123@ghhd.abc.ilk
    let regexpUsername=/^([\w\.\-]+)@([\w\-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
            //atleast 8 chars, atleast-1 lower case, 1 upper case, 1 number, 1 among[!@#$%&*] and no blank spaces
    let regexpPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*])(?=.*[0-9])(?!.*\s).{8,}$/;
    //validateFlag will betrue if inputs are valid; else false
    let validateFlag = true;
    //checking for valid inputs
            //username check
    if(regexpUsername.test(username.value))
    {       //if valid
        document.getElementById("username-error").textContent = "looks good!";
        document.getElementById("username-error").classList.remove('wrong');
        document.getElementById("username-error").classList.add('good');
    }
    else
    {       //if invalid
        document.getElementById("username-error").textContent = "invalid!";
        document.getElementById("username-error").classList.remove('good');
        document.getElementById("username-error").classList.add('wrong');
        validateFlag=false; // changing flag
        return validateFlag;
    }

            //password check
    if(regexpPassword.test(password.value))
    {
        document.getElementById("password-error").textContent = "looks good!";
        document.getElementById("password-error").classList.remove('wrong');
        document.getElementById("password-error").classList.add('good');
    }
    else
    {
        document.getElementById("password-error").textContent = "invalid!";
        document.getElementById("password-error").classList.remove('good');
        document.getElementById("password-error").classList.add('wrong');
        validateFlag=false;
        return validateFlag;
    }

    //returning true 
    return validateFlag;
}
