function toggleStar(btn, id) {
    fetch(`/${id}/star/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": document.querySelector('meta[name="csrf-token"]').content
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data['is_starred'])
            btn.classList.add('starred');
        else
            btn.classList.remove('starred');
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function interestUp(id) {
    fetch(`/${id}/interestup/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": document.querySelector('meta[name="csrf-token"]').content
        },
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector(`.interest-value-${id}`).textContent = data['interest'];
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function interestDown(id) {
    fetch(`/${id}/interestdown/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": document.querySelector('meta[name="csrf-token"]').content
        },
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector(`.interest-value-${id}`).textContent = data['interest'];
    })
    .catch(error => {
        console.error("Error:", error);
    });
}