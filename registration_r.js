function validateForm() {
    var isValid = true;

    var usernameInput = document.getElementById("username");
    if (usernameInput.value.length < 3) {
        alert("Username must be at least 3 characters long");
        isValid = false;
    }

    var emailInput = document.getElementById("email");
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        alert("Please enter a valid email address");
        isValid = false;
    }

    var passwordInput = document.getElementById("password");
    if (passwordInput.value.length < 6) {
        alert("Password must be at least 6 characters long");
        isValid = false;
    }

    var confirmPasswordInput = document.getElementById("confirmPassword");
    if (confirmPasswordInput.value !== passwordInput.value) {
        alert("Passwords do not match");
        isValid = false;
    }


    var addressInput = document.getElementById("address");
    if (addressInput.value.length === 0) {
        alert("Address is required");
        isValid = false;
    }

    var phoneInput = document.getElementById("phone");
    var phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneInput.value)) {
        alert("Please enter a valid 10-digit phone number");
        isValid = false;
    }

    var birthdateInput = document.getElementById("birthdate");
    var currentDate = new Date();
    var selectedDate = new Date(birthdateInput.value);
    if (selectedDate >= currentDate) {
        alert("Invalid date of birth");
        isValid = false;
    }

    var genderInput = document.getElementById("gender");
    if (genderInput.value === "") {
        alert("Please select a gender");
        isValid = false;
    }

    return isValid;
}