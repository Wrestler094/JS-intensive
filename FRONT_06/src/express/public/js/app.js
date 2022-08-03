class FetchService {
    constructor() {

    }

    async performGetHttpRequest(fetchLink, headers, query=null) {
        if(!fetchLink || !headers) {
            throw new Error("One or more GET request parameters was not passed.");
        }
        try {
            const rawResponse = await fetch(fetchLink, {
                method: "GET",
                headers: headers,
                query: (query != null) ? query : ""
            });
            const content = await rawResponse.json();
            return content;
        }
        catch(err) {
            console.error(`Error at fetch GET: ${err}`);
            throw err;
        }
    }

    async performPostHttpRequest(fetchLink, headers, body) {
        if(!fetchLink || !headers || !body) {
            throw new Error("One or more POST request parameters was not passed.");
        }
        try {
            const rawResponse = await fetch(fetchLink, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });
            const content = await rawResponse.json();
            return content;
        }
        catch(err) {
            console.error(`Error at fetch POST: ${err}`);
            throw err;
        }
    }

    async performPutHttpRequest(fetchLink, headers, body) {
        if(!fetchLink || !headers || !body) {
            throw new Error("One or more POST request parameters was not passed.");
        }
        try {
            const rawResponse = await fetch(fetchLink, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(body)
            });
            const content = await rawResponse.json();
            return content;
        }
        catch(err) {
            console.error(`Error at fetch PUT: ${err}`);
            throw err;
        }
    }
}

/*-- Objects --*/
const fetchService = new FetchService();
/*-- /Objects --*/

/*--Functions--*/
async function signUpForm(e, form) {
    e.preventDefault();
    const btnSubmit = document.getElementById('btnSubmit');
    const signForm = document.querySelector("#signUpForm");
    const password = document.querySelector("#floatingPassword");
    const repassword = document.querySelector("#floatingRePassword");
    password.style.borderColor = '';
    repassword.style.borderColor = '';
    if (password.value === repassword.value) {
        btnSubmit.disabled = true;
        setTimeout(() => btnSubmit.disabled = false, 2000);
        const jsonFormData = buildJsonFormData(form);
        const headers = buildHeaders();
        const response = await fetchService.performPostHttpRequest(signForm.action, headers, jsonFormData); // Uses JSON Placeholder
        if (response.status === "ok")
            window.location = `/`;
        else
            alert("Error: " + response.error.message);
    } else {
        password.style.borderColor = 'red';
        repassword.style.borderColor = 'red';
    }
}

async function signInForm(e, form) {
    e.preventDefault();
    const btnSubmit = document.getElementById('btnSubmit');
    const signForm = document.querySelector("#signInForm");

    btnSubmit.disabled = true;
    setTimeout(() => btnSubmit.disabled = false, 2000);
    const jsonFormData = buildJsonFormData(form);
    const headers = buildHeaders();
    const response = await fetchService.performPostHttpRequest(signForm.action, headers, jsonFormData); // Uses JSON Placeholder
    if (response.status === "ok") {
        console.log(response.status)
        window.location.href = "/";
    } else {
        alert("Error: " + response.error.message);
    }
}

function buildHeaders(authorization = null) {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": (authorization) ? authorization : "Bearer TOKEN_MISSING"
    };
    return headers;
}

function buildJsonFormData(form) {
    const jsonFormData = { };
    for(const pair of new FormData(form)) {
        jsonFormData[pair[0]] = pair[1];
    }
//    console.log(jsonFormData);
    return jsonFormData;
}
/*--/Functions--*/

/*--Event Listeners--*/
const signupform = document.querySelector("#signUpForm");
if(signupform) {
    signupform.addEventListener("submit", function(e) {
        signUpForm(e, this);
    });
}
const signinform = document.querySelector("#signInForm");
if(signinform) {
    signinform.addEventListener("submit", function(e) {
        signInForm(e, this);
    });
}

/*--/Event Listeners--*/
