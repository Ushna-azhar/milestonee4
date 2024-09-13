function generateResume() {
    // Get form values
    var profilePictureInput = document.getElementById('profilePicture');
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // Handle profile picture
    var profilePictureURL = '';
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        var file = profilePictureInput.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            profilePictureURL = e.target.result; // Get the result as a data URL
            updateResumePreview(); // Update resume preview after loading the image
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    }
    else {
        updateResumePreview(); // Update resume preview without image
    }
    function updateResumePreview() {
        // Generate resume preview HTML
        var resumePreview = "\n            <div class=\"resume-header\">\n                ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\">") : '', "\n                <h3>Name</h3>\n                <p><span id=\"editable-name\" class=\"editable\">").concat(name || 'Name', "</span></p>\n                <h3>Email</h3>\n                <p><span id=\"editable-email\" class=\"editable\">").concat(email || 'Email', "</span></p>\n                <h3>Phone</h3>\n                <p><span id=\"editable-phone\" class=\"editable\">").concat(phone || 'Phone', "</span></p>\n            </div>\n            <div class=\"resume-body\">\n                <h3>Education Level</h3>\n                <p id=\"editable-education\" class=\"editable\">").concat(education || 'Education Level', "</p>\n                <h3>Professional Experience</h3>\n                <p id=\"editable-experience\" class=\"editable\">").concat(experience || 'Professional Experience', "</p>\n                <h3>Skills</h3>\n                <p id=\"editable-skills\" class=\"editable\">").concat(skills || 'Skills', "</p>\n            </div>\n        ");
        // Get username for filename
        var usernameElement = document.getElementById('username');
        var username = usernameElement ? usernameElement.value.trim() : 'resume';
        var uniquePath = "".concat(username.replace(/\s+/g, '_'), "_cv.html");
        // Create download link
        var downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumePreview);
        downloadLink.download = uniquePath;
        downloadLink.textContent = 'Download Resume';
        downloadLink.style.display = 'block'; // Ensure it is visible
        // Display the resume preview
        var resumePreviewElement = document.getElementById('resumePreview');
        resumePreviewElement.innerHTML = resumePreview;
        // Append the download link
        resumePreviewElement.appendChild(downloadLink);
        // Make the fields editable
        makeEditable();
    }
}
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            if (this.querySelector('input'))
                return; // Prevent multiple inputs
            var currentElement = this;
            var currentText = currentElement.textContent || "";
            // Create and insert the input field
            var input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            input.classList.add('editing-input');
            input.addEventListener('blur', function () {
                currentElement.textContent = input.value;
                currentElement.style.display = 'inline';
                input.remove();
            });
            currentElement.style.display = 'none';
            currentElement.parentNode.insertBefore(input, currentElement);
            input.focus();
        });
    });
}
