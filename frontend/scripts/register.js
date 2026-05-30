

const form = document.querySelector("#custom-form")



async function sendData() {
    
    const formData = new FormData(form);

    const formValues = Object.fromEntries(formData);

    const sentForm = JSON.stringify(formValues);
    
    try {
        const response = await fetch("http://127.0.0.1:8000/users/", {
            method: "POST",
            body: sentForm,
            headers: {
                'Content-Type' : 'application/json'
            }

        });
        console.log(await response.json());
    } catch (error) {
        console.log(error);
        alert(`User Registration failed`)
    }
}





form.addEventListener("submit", (event) => {
    event.preventDefault();

    sendData();


});

