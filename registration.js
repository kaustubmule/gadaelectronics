function validateform() {
    //Without regex
    console.log("validateForm() called");
    var name = document.getElementById('username').value;
    var pwd = document.getElementById('password').value;
    var confirmpwd = document.getElementById('confirmPassword').value;
    var address = document.getElementById('address').value;
    var phoneno = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var dob = document.getElementById('birthdate').value;
    var gender = document.getElementById('gender').value;

    if (name == null || name == "") {
        alert("Empty Name");
        return false;
    }
    else if (pwd == null || pwd == "") {
        alert("Empty Password");
        return false;
    }
    else if (confirmpwd == null || confirmpwd == "") {
        alert("Empty Confirm Password");
        return false;
    }
    else if (pwd != confirmpwd) {
        alert("Passwords do not match");
        return false;
    }
    else if (address == null || address == "") {
        alert("Enter Address");
        return false;
    }
    else if (address.length < 20) {
        alert("Enter full address");
        return false;
    }
    else if (phoneno == null || phoneno == "") {
        alert("Enter Phone Number");
        return false;
    }
    else if (phoneno.length != 10) {
        alert("Phone Number shoould be 10-digit");
        return false;
    }
    else if (email == null || email == "") {
        alert("Empty email");
        return false;
    }
    else if (email.indexOf('@') < 0 || email.lastIndexOf('.') < 0) {
        alert("Invalid Email ID")
        return false;
    }
    else if (dob == null || dob == "") {
        alert("Enter DOB");
        return false;
    }
    else if (gender == null || gender == "") {
        alert("Select Gender");
        return false;
    }
    return true;
}