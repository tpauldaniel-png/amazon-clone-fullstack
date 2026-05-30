
const form = document.querySelector("#custom-login-form")


async function loginUser() {
    const formData = new FormData(form);
   
    
    try{
        const response = await fetch("http://127.0.0.1:8000/login/", {
            method : "POST",
            body: new URLSearchParams(formData),
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            } 
        });

        const result = await response.json();


        if (!response.ok) {
            throw new Error(`HTTP Error: status--${response.status}`);
        }

        

        localStorage.setItem('jwtAccessToken', result.access_token);

        window.location.href = '/frontend/index.html';

    } catch (error) {
        console.log(error);
        alert("Login failed");
    }
}








form.addEventListener("submit", (event) => {
    event.preventDefault();

    loginUser();
})