function validateform() {
    var name = document.getElementById('username').value.trim();
    var pwd = document.getElementById('password').value;
    var confirmpwd = document.getElementById('confirmPassword').value;
    var address = document.getElementById('address').value;
    var phoneno = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var dob = document.getElementById('birthdate').value;
    var gender = document.getElementById('gender').value;

    if (name === "") {
        alert("Empty Name");
        return false;
    }
    else if (pwd === "") {
        alert("Empty Password");
        return false;
    }
    else if (confirmpwd === "") {
        alert("Empty Confirm Password");
        return false;
    }
    else if (pwd !== confirmpwd) {
        alert("Passwords do not match");
        return false;
    }
    else if (address === "") {
        alert("Enter Address");
        return false;
    }
    else if (address.length < 20) {
        alert("Enter full address");
        return false;
    }
    else if (!/^\d{10}$/.test(phoneno)) {
        alert("Phone Number should be 10-digit");
        return false;
    }
    else if (email === "") {
        alert("Empty email");
        return false;
    }
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        alert("Invalid Email ID");
        return false;
    }
    else if (dob === "") {
        alert("Enter DOB");
        return false;
    }
    else if (gender === "") {
        alert("Select Gender");
        return false;
    }
    return true;
}
