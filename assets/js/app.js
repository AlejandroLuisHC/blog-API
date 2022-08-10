const //Posts data
    titles = [],
    bodies = [],
    IDs = [],
    userIDsPost = [];

const //Users data
    userId = [],
    userName = [],
    userUsername = [],
    userEmail = [],
    userAddress = [],
    userPhone = [],
    userWebsite = [],
    userCompany = [];

// Comments Data
const comments = []
    
window.onload = storeUsers();

function storeUsers() {
    fetch("http://localhost:3000/users")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.forEach(e => {
                userId.push(e.id)
                userName.push(e.name)
                userUsername.push(e.username)
                userEmail.push(e.email)
                userAddress.push(e.address)
                userPhone.push(e.phone)
                userWebsite.push(e.website)
                userCompany.push(e.company)
            });
        });
}

window.onload = storeComments();

function storeComments() {
    fetch("http://localhost:3000/users")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.forEach(e => {
                comments.push(e)
            });
        });
}

window.onload = displayPosts();

function displayPosts() {
    while (document.getElementById('postsContainer').firstChild) {
        document.getElementById('postsContainer').removeChild(document.getElementById('postsContainer').firstChild)
    }
    fetch("http://localhost:3000/posts")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.forEach(e => {
                titles.push(e.title);
                bodies.push(e.body);
                IDs.push(e.id);
                userIDsPost.push(e.userId);
            });
            for (let i = titles.length - 1; i >= 0; i--) {
                let article = document.createElement('article');
                article.className = "col-5 post";
                article.setAttribute("id", `${IDs[i]}`)
                article.innerHTML = `
                <div class="row title-container">
                <div class="col-2"></div>
                <h4 onclick="moreInfo('${IDs[i]}', '${userIDsPost[i]}')" id="tit${i}" class="col-8 post-title">${titles[i]}</h4>
                <button onclick="editPost('tit${i}', 'cont${i}', '${IDs[i]}', '${userIDsPost[i]}')" class="col-1 edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="deletePost('${IDs[i]}')" class="col-1 delete-btn"><i class="fa-solid fa-trash-can"></i></button>
                </div>
                <p id="cont${i}" class="post-content">${bodies[i]}</p>
                `
                document.getElementById('postsContainer').appendChild(article);
            };
    });
}

function moreInfo(id, userID) {
    let userIndex = userId.indexOf(parseInt(userID));

    const infoContainer = document.createElement('section');
    infoContainer.className = "more-info-container";
    infoContainer.setAttribute("id", "infoContainer");
    infoContainer.innerHTML = `
        <div class="row justify-content-center">
            <h2 class="col-8 title-more-info">Post information</h2>
        </div>
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <span>Author information: <b>${userUsername[userIndex]}</b></span>
                </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <p>
                        ${userUsername[userIndex]}'s name is: <b>${userName[userIndex]}</b>. 
                    </p>
                    <p>
                        ${userName[userIndex]} works at <b>${userCompany[userIndex].name}</b>, a company located in <b>${userAddress[userIndex].city}.</b> 
                    </p>
                    <p>
                        Having any questions, you may contact ${userName[userIndex]} via email: <u>${userEmail[userIndex]}</u>
                    </p>
                </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Post information:
                </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <p>
                    </p>
                </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-evenly">
            <button onclick="closeMoreInfo();" type="button" class="col-6 btn btn-secondary">Exit</button>
        </div>
    `
    if ((document.getElementById('main').firstChild.className !== "more-info-container") && 
        (document.getElementById('main').firstChild.className !== "pop-up")) {
        document.getElementById('main').insertAdjacentElement("afterbegin", infoContainer);
    };
}


function editPost(titleID, contentID, id, userID) {
    const
    titleEle = document.getElementById(titleID),
    contentEle = document.getElementById(contentID),
    title = titleEle.textContent,
    content = contentEle.textContent,
    popUp = document.createElement('section');

    popUp.className = "pop-up";
    popUp.setAttribute("id", "popUp");
    popUp.innerHTML = `
        <div class="row justify-content-center">
            <h2 class="col-8 title-edit">Edit post</h2>
        </div>
        <form id="form">
            <div class="input-group mb-3">
                <span class="input-group-text">Title</span>
                <textarea required id="updatedTitle" class="form-control edit-input-title" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">${title}</textarea>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" >Content</span>
                <textarea required id="updatedContent" class="form-control edit-input-content" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">${content}</textarea>
            </div>
            <div class="row justify-content-evenly">
                <button onclick="closePopUp();" type="button" class="col-3 btn btn-secondary">Cancel</button>
                <button onclick="updatePost('${id}', '${userID}')" type="submit" class="col-3 btn btn-success">Save</button>
            </div>
        </form>
    `
    if ((document.getElementById('main').firstChild.className !== "more-info-container") && 
        (document.getElementById('main').firstChild.className !== "pop-up")) {
        document.getElementById('main').insertAdjacentElement("afterbegin", popUp);
    }
}

function updatePost(i, userID) {
    
    if (document.getElementById("form").checkValidity()) {
        const
            titleInfo = document.getElementById('updatedTitle').value,
            contentInfo = document.getElementById('updatedContent').value;
    
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userID,
                id: i,
                title: titleInfo,
                body: contentInfo
            })
        };
        fetch(`http://localhost:3000/posts/${(i)}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                displayPosts()
            });
    }
}

function createPost() {
    const popUp = document.createElement('section');
    popUp.className = "pop-up";
    popUp.setAttribute("id", "popUp");
    popUp.innerHTML = `
        <div class="row justify-content-center">
            <h2 class="col-8 title-edit">Create post</h2>
        </div>
        <form id="form"> 
            <div class="input-group mb-3">
                <span class="input-group-text">Author Id</span>
                <textarea required placeholder="Write your author ID" id="author" class="form-control edit-input-author" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></textarea>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Post Title</span>
                <textarea required placeholder="Write your post title here" id="updatedTitle" class="form-control edit-input-title" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></textarea>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Content</span>
                <textarea required placeholder="Write your post here" id="updatedContent" class="form-control edit-input-content" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></textarea>
            </div>
            <div class="row justify-content-evenly">
                <button onclick="closePopUp();" type="button" class="col-3 btn btn-secondary">Cancel</button>
                <button onclick="uploadPost()" type="submit" class="col-3 btn btn-success">Post it!</button>
            </div>
        </form>
    `
    if ((document.getElementById('main').firstChild.className !== "more-info-container") && 
        (document.getElementById('main').firstChild.className !== "pop-up")) {
        document.getElementById('main').insertAdjacentElement("afterbegin", popUp);
    }
}


function uploadPost() {
    if (document.getElementById("form").checkValidity()) {
        const
            titleInfo = document.getElementById('updatedTitle').value,
            contentInfo = document.getElementById('updatedContent').value,
            author = document.getElementById('author').value,
            newId = 0;

        fetch("http://localhost:3000/posts")
            .then(res => res.json())
            .then(data => newId = data[data.length - 1].id + 1)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: author,
                id: newId,
                title: `${titleInfo}`,
                body: `${contentInfo}`
            })
        };

        fetch('http://localhost:3000/posts', requestOptions)
            .then(response => response.json())
            .then(data => {
                let article = document.createElement('article');
                article.className = "col-5 post";
                article.setAttribute("id", `${i}`)
                article.innerHTML = `
                    <div class="row title-container">
                        <div class="col-2"></div>
                        <h4 id="tit${i}" class="col-8 post-title">${titleInfo}</h4>
                        <button onclick="editPost('${i}')" class="col-1 edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button onclick="deletePost('tit${i}', 'cont${i}')" class="col-1 delete-btn"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                    <p id="cont${i}" class="post-content">${contentInfo}</p>
                `
                document.getElementById('postsContainer').insertAdjacentElement("afterbegin", article);
            });
    }
    displayPosts()
}

function closePopUp() {
    document.getElementById('main').removeChild(document.getElementById('popUp'));
}
function closeMoreInfo() {
    document.getElementById('main').removeChild(document.getElementById('infoContainer'));
}

function deletePost(id) {
    const element = document.querySelector('#delete-request .status');
    fetch(`http://localhost:3000/posts/${id}`, { method: 'DELETE' })
        .then(() => displayPosts());
}
