let 
    titles = [],
    bodies = [],
    IDs = [],
    userIDs = [];


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
                userIDs.push(e.userId);
            });
            for (let i = titles.length - 1; i >= 0; i--) {
                let article = document.createElement('article');
                article.className = "col-5 post";
                article.setAttribute("id", `${IDs[i]}`)
                article.innerHTML = `
                <div class="row title-container">
                <div class="col-2"></div>
                <h4 id="tit${i}" class="col-8 post-title">${titles[i]}</h4>
                <button onclick="editPost('tit${i}', 'cont${i}', '${IDs[i]}')" class="col-1 edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="deletePost('${IDs[i]}')" class="col-1 delete-btn"><i class="fa-solid fa-trash-can"></i></button>
                </div>
                <p id="cont${i}" class="post-content">${bodies[i]}</p>
                `
                document.getElementById('postsContainer').appendChild(article);
            };
    });
}


function editPost(titleID, contentID, id) {
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
                <button onclick="updatePost('${id}')" type="submit" class="col-3 btn btn-success">Save</button>
            </div>
        </form>
    `
    if (document.getElementById('main').firstChild.className !== "pop-up") {
        document.getElementById('main').insertAdjacentElement("afterbegin", popUp);
    }
}

function updatePost(i) {
    
    if (document.getElementById("form").checkValidity()) {
        const
            titleInfo = document.getElementById('updatedTitle').value,
            contentInfo = document.getElementById('updatedContent').value;
    
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: i,
                id: i,
                title: titleInfo,
                body: contentInfo
            })
        };
        fetch(`http://localhost:3000/posts/${(i)}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                document.querySelector(`@${i} .post.title`).textContent = newTitle;
                document.querySelector(`@${i} .post.content`).textContent = newContent;
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
    if (document.getElementById('main').firstChild.className !== "pop-up") {
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

function deletePost(id) {
    const element = document.querySelector('#delete-request .status');
    fetch(`http://localhost:3000/posts/${id}`, { method: 'DELETE' })
        .then(() => displayPosts());
}
